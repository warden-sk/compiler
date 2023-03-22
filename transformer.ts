/*
 * Copyright 2023 Marek Kobida
 */

import * as ts from 'typescript';
import allowedHTMLElements from './allowedHTMLElements';
import allowedJSXAttributes from './allowedJSXAttributes';

function createImportDeclaration(name: string, path: string): ts.ImportDeclaration {
  return ts.factory.createImportDeclaration(
    undefined,
    ts.factory.createImportClause(false, ts.factory.createIdentifier(name), undefined),
    ts.factory.createStringLiteral(path)
  );
}

const transformer: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    const visitor: ts.Visitor = node => {
      console.log(node.kind, `\t# ts.SyntaxKind.${ts.SyntaxKind[node.kind]}`);

      if (ts.isSourceFile(node)) {
        const updatedNode = ts.factory.updateSourceFile(node, [
          ts.factory.createImportDeclaration(
            undefined,
            undefined,
            ts.factory.createStringLiteral('@warden-sk/design/index.css')
          ),
          ...[
            ['decodeClassName', '@warden-sk/babel-plugin/private/decodeClassName'],
            ['decodeJSXSpreadAttributes', '@warden-sk/babel-plugin/private/decodeJSXSpreadAttributes'],
            ['decodeResponsiveClassName', '@warden-sk/babel-plugin/private/decodeResponsiveClassName'],
            ['filterJSXSpreadAttributes', '@warden-sk/babel-plugin/private/filterJSXSpreadAttributes'],
          ].map(([l, r]) => createImportDeclaration(l, r)),
          ...node.statements,
        ]);

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
                      ts.factory.createCallExpression(
                        ts.factory.createIdentifier('decodeResponsiveClassName'),
                        undefined,
                        [ts.factory.createStringLiteral(attribute.name.text), attribute.initializer]
                      )
                    );
                  }
                }
              }
            }
            /* (2) */
            if (ts.isJsxSpreadAttribute(attribute)) {
              attributes.push(
                ts.factory.createJsxSpreadAttribute(
                  ts.factory.createCallExpression(ts.factory.createIdentifier('filterJsxSpreadAttributes'), undefined, [
                    attribute.expression,
                  ])
                )
              );

              return className.push(
                ts.factory.createCallExpression(ts.factory.createIdentifier('decodeJsxSpreadAttributes'), undefined, [
                  attribute.expression,
                ])
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
                  ts.factory.createCallExpression(ts.factory.createIdentifier('decodeClassName'), undefined, className)
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
