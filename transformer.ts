/*
 * Copyright 2023 Marek Kobida
 */

import ts from 'typescript';
import allowedHtmlElements from './allowedHtmlElements';
import availableJsxAttributes from './availableJsxAttributes';
import dictionary from './dictionary';

function createRequireStatement(f: ts.NodeFactory, name: ts.Identifier, path: string): ts.VariableStatement {
  const variableDeclaration: ts.VariableDeclaration = f.createVariableDeclaration(
    name,
    undefined,
    undefined,
    f.createPropertyAccessExpression(
      f.createCallExpression(f.createIdentifier('require'), undefined, [f.createStringLiteral(path)]),
      f.createIdentifier('default')
    )
  );

  return f.createVariableStatement(
    undefined,
    f.createVariableDeclarationList([variableDeclaration], ts.NodeFlags.Const)
  );
}

const transformer: ts.TransformerFactory<ts.SourceFile> = context => {
  const { factory: f } = context;

  return sourceFile => {
    const visitor: ts.Visitor = node => {
      // console.log(node.kind, `\t# ts.SyntaxKind.${ts.SyntaxKind[node.kind]}`);

      const decodeClassName = f.createIdentifier('decodeClassName');
      const decodeJsxSpreadAttributes = f.createIdentifier('decodeJsxSpreadAttributes');
      const decodeResponsiveClassName = f.createIdentifier('decodeResponsiveClassName');
      const filterJsxSpreadAttributes = f.createIdentifier('filterJsxSpreadAttributes');

      if (ts.isSourceFile(node)) {
        const test = (
          [
            [decodeClassName, '@warden-sk/compiler/helpers/decodeClassName'],
            [decodeJsxSpreadAttributes, '@warden-sk/compiler/helpers/decodeJsxSpreadAttributes'],
            [decodeResponsiveClassName, '@warden-sk/compiler/helpers/decodeResponsiveClassName'],
            [filterJsxSpreadAttributes, '@warden-sk/compiler/helpers/filterJsxSpreadAttributes'],
          ] as const
        ).map(([l, r]) => createRequireStatement(f, l, r));

        const updatedNode = f.updateSourceFile(node, [...test, ...node.statements]);

        return ts.visitEachChild(updatedNode, visitor, context);
      }

      if (ts.isJsxOpeningElement(node)) {
        if (ts.isIdentifier(node.tagName) && node.tagName.text in allowedHtmlElements) {
          const attributes: (ts.JsxAttribute | ts.JsxSpreadAttribute)[] = [];
          const className: ts.Expression[] = [];

          node.attributes.properties.forEach(attribute => {
            if (ts.isJsxAttribute(attribute)) {
              // <Component test /> – "$" would be "undefined" for the "test" attribute
              const $: ts.JsxAttributeValue | undefined = attribute.initializer;

              if ($) {
                /* (1) */
                if (attribute.name.text === 'className') {
                  /* (1.1) */
                  if (ts.isJsxExpression($) || ts.isStringLiteral($)) {
                    return className.push($);
                  }
                }
                /* (2) */
                if (attribute.name.text in availableJsxAttributes) {
                  /* (2.1) */
                  if (ts.isJsxExpression($) || ts.isStringLiteral($)) {
                    return className.push(
                      f.createCallExpression(decodeResponsiveClassName, undefined, [
                        f.createStringLiteral(dictionary.getKey(attribute.name.text)),
                        $,
                      ])
                    );
                  }
                }
              }
            }
            /* (2) */
            if (ts.isJsxSpreadAttribute(attribute)) {
              attributes.push(
                f.createJsxSpreadAttribute(
                  f.createCallExpression(filterJsxSpreadAttributes, undefined, [attribute.expression])
                )
              );

              return className.push(
                f.createCallExpression(decodeJsxSpreadAttributes, undefined, [attribute.expression])
              );
            }

            attributes.push(attribute);
          });

          /* (3) */
          if (className.length) {
            attributes.push(
              f.createJsxAttribute(
                f.createIdentifier('className'),
                f.createJsxExpression(undefined, f.createCallExpression(decodeClassName, undefined, className))
              )
            );
          }

          const updatedNode = f.updateJsxOpeningElement(
            node,
            node.tagName,
            node.typeArguments,
            f.updateJsxAttributes(node.attributes, attributes)
          );

          return ts.visitEachChild(updatedNode, visitor, context);
        }
      }

      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
  };
};

export default transformer;
