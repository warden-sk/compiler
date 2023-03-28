/*
 * Copyright 2023 Marek Kobida
 */

import ts from 'typescript';
import allowedHtmlElements from './allowedHtmlElements';
import availableJsxAttributes from './availableJsxAttributes';
import dictionary from './dictionary';
import createRequireStatement from './helpers/createRequireStatement';

const transformer = (): ts.TransformerFactory<ts.SourceFile> => {
  return context => {
    const { factory: f } = context;

    return sourceFile => {
      const visitor: ts.Visitor = node => {
        // report(undefined, node.kind, `\t# ts.SyntaxKind.${ts.SyntaxKind[node.kind]}`);

        const decodeClassName = f.createIdentifier('decodeClassName');
        const decodeJsxSpreadAttributes = f.createIdentifier('decodeJsxSpreadAttributes');
        const decodeResponsiveClassName = f.createIdentifier('decodeResponsiveClassName');
        const filterJsxSpreadAttributes = f.createIdentifier('filterJsxSpreadAttributes');

        if (ts.isSourceFile(node)) {
          const $ = (
            [
              [decodeClassName, '@warden-sk/compiler/helpers/decodeClassName'],
              [decodeJsxSpreadAttributes, '@warden-sk/compiler/helpers/decodeJsxSpreadAttributes'],
              [decodeResponsiveClassName, '@warden-sk/compiler/helpers/decodeResponsiveClassName'],
              [filterJsxSpreadAttributes, '@warden-sk/compiler/helpers/filterJsxSpreadAttributes'],
            ] as const
          ).map(([name, path]) => createRequireStatement(name, path));

          const updatedNode = f.updateSourceFile(node, [...$, ...node.statements]);

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
};

export default transformer;
