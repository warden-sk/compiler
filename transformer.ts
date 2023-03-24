/*
 * Copyright 2023 Marek Kobida
 */

import ts from 'typescript';
import allowedHtmlElements from './allowedHtmlElements';
import allowedJsxAttributes from './allowedJsxAttributes';
import dictionary from './helpers/dictionary';

function createTest(factory: ts.NodeFactory, name: ts.Identifier, path: string): ts.VariableStatement {
  const variableDeclaration: ts.VariableDeclaration = factory.createVariableDeclaration(
    name,
    undefined,
    undefined,
    factory.createPropertyAccessExpression(
      factory.createCallExpression(factory.createIdentifier('require'), undefined, [factory.createStringLiteral(path)]),
      factory.createIdentifier('default')
    )
  );

  return factory.createVariableStatement(
    undefined,
    factory.createVariableDeclarationList([variableDeclaration], ts.NodeFlags.Const)
  );
}

const transformer: ts.TransformerFactory<ts.SourceFile> = context => {
  const { factory } = context;

  return sourceFile => {
    const visitor: ts.Visitor = node => {
      // console.log(node.kind, `\t# ts.SyntaxKind.${ts.SyntaxKind[node.kind]}`);

      const decodeClassName = factory.createIdentifier('decodeClassName');
      const decodeJSXSpreadAttributes = factory.createIdentifier('decodeJSXSpreadAttributes');
      const decodeResponsiveClassName = factory.createIdentifier('decodeResponsiveClassName');
      const filterJSXSpreadAttributes = factory.createIdentifier('filterJSXSpreadAttributes');

      if (ts.isSourceFile(node)) {
        const test = (
          [
            [decodeClassName, '@warden-sk/compiler/helpers/decodeClassName'],
            [decodeJSXSpreadAttributes, '@warden-sk/compiler/helpers/decodeJSXSpreadAttributes'],
            [decodeResponsiveClassName, '@warden-sk/compiler/helpers/decodeResponsiveClassName'],
            [filterJSXSpreadAttributes, '@warden-sk/compiler/helpers/filterJSXSpreadAttributes'],
          ] as const
        ).map(([l, r]) => createTest(factory, l, r));

        const updatedNode = factory.updateSourceFile(node, [...test, ...node.statements]);

        return ts.visitEachChild(updatedNode, visitor, context);
      }

      if (ts.isJsxOpeningElement(node)) {
        if (ts.isIdentifier(node.tagName) && node.tagName.text in allowedHtmlElements) {
          const attributes: (ts.JsxAttribute | ts.JsxSpreadAttribute)[] = [];
          const className: ts.Expression[] = [];

          node.attributes.properties.forEach(attribute => {
            if (ts.isJsxAttribute(attribute)) {
              if (attribute.initializer) {
                /* (1) */
                if (attribute.name.text === 'className') {
                  /* (1.1) */
                  if (ts.isJsxExpression(attribute.initializer) || ts.isStringLiteral(attribute.initializer)) {
                    return className.push(attribute.initializer);
                  }
                }
                /* (2) */
                if (attribute.name.text in allowedJsxAttributes) {
                  /* (2.1) */
                  if (ts.isJsxExpression(attribute.initializer) || ts.isStringLiteral(attribute.initializer)) {
                    return className.push(
                      factory.createCallExpression(decodeResponsiveClassName, undefined, [
                        factory.createStringLiteral(dictionary.getKey(attribute.name.text)),
                        attribute.initializer,
                      ])
                    );
                  }
                }
              }
            }
            /* (2) */
            if (ts.isJsxSpreadAttribute(attribute)) {
              attributes.push(
                factory.createJsxSpreadAttribute(
                  factory.createCallExpression(filterJSXSpreadAttributes, undefined, [attribute.expression])
                )
              );

              return className.push(
                factory.createCallExpression(decodeJSXSpreadAttributes, undefined, [attribute.expression])
              );
            }

            attributes.push(attribute);
          });

          /* (3) */
          if (className.length) {
            attributes.push(
              factory.createJsxAttribute(
                factory.createIdentifier('className'),
                factory.createJsxExpression(
                  undefined,
                  factory.createCallExpression(decodeClassName, undefined, className)
                )
              )
            );
          }

          const updatedNode = factory.updateJsxOpeningElement(
            node,
            node.tagName,
            node.typeArguments,
            factory.updateJsxAttributes(node.attributes, attributes)
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
