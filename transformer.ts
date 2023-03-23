/*
 * Copyright 2023 Marek Kobida
 */

import ts from 'typescript';
import allowedHTMLElements from './allowedHTMLElements';
import allowedJSXAttributes from './allowedJSXAttributes';

function createImportDeclaration(name: ts.Identifier | undefined, path: string): ts.ImportDeclaration {
  return ts.factory.createImportDeclaration(
    undefined,
    name ? ts.factory.createImportClause(false, name, undefined) : undefined,
    ts.factory.createStringLiteral(path)
  );
}

const decodeClassName = ts.factory.createUniqueName('decodeClassName');
const decodeJSXSpreadAttributes = ts.factory.createUniqueName('decodeJSXSpreadAttributes');
const decodeResponsiveClassName = ts.factory.createUniqueName('decodeResponsiveClassName');
const filterJSXSpreadAttributes = ts.factory.createUniqueName('filterJSXSpreadAttributes');

const test = (
  [
    [decodeClassName, '@warden-sk/compiler/helpers/decodeClassName'],
    [decodeJSXSpreadAttributes, '@warden-sk/compiler/helpers/decodeJSXSpreadAttributes'],
    [decodeResponsiveClassName, '@warden-sk/compiler/helpers/decodeResponsiveClassName'],
    [filterJSXSpreadAttributes, '@warden-sk/compiler/helpers/filterJSXSpreadAttributes'],
  ] as const
).map(([l, r]) => createImportDeclaration(l, r));

const transformer: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    const visitor: ts.Visitor = node => {
      console.log(node.kind, `\t# ts.SyntaxKind.${ts.SyntaxKind[node.kind]}`);

      if (ts.isSourceFile(node)) {
        const updatedNode = ts.factory.updateSourceFile(node, [...test, ...node.statements]);

        return ts.visitEachChild(updatedNode, visitor, context);
      }

      if (ts.isJsxOpeningElement(node)) {
        if (ts.isIdentifier(node.tagName) && node.tagName.text in allowedHTMLElements) {
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
                if (attribute.name.text in allowedJSXAttributes) {
                  /* (2.1) */
                  if (ts.isJsxExpression(attribute.initializer) || ts.isStringLiteral(attribute.initializer)) {
                    return className.push(
                      ts.factory.createCallExpression(decodeResponsiveClassName, undefined, [
                        ts.factory.createStringLiteral(attribute.name.text),
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
                ts.factory.createJsxSpreadAttribute(
                  ts.factory.createCallExpression(filterJSXSpreadAttributes, undefined, [attribute.expression])
                )
              );

              return className.push(
                ts.factory.createCallExpression(decodeJSXSpreadAttributes, undefined, [attribute.expression])
              );
            }

            attributes.push(attribute);
          });

          /* (3) */
          if (className.length) {
            attributes.push(
              ts.factory.createJsxAttribute(
                ts.factory.createIdentifier('className'),
                ts.factory.createJsxExpression(
                  undefined,
                  ts.factory.createCallExpression(decodeClassName, undefined, className)
                )
              )
            );
          }

          const updatedNode = ts.factory.updateJsxOpeningElement(
            node,
            node.tagName,
            node.typeArguments,
            ts.factory.updateJsxAttributes(node.attributes, attributes)
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
