/*
 * Copyright 2023 Marek Kobida
 */

import * as ts from 'typescript';

const allowedJSXAttributes = {
  m: 'm',
  p: 'p',
};

const transformer: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    const visitor: ts.Visitor = node => {
      if (ts.isJsxOpeningElement(node)) {
        if (ts.isIdentifier(node.tagName)) {
          console.log('JsxOpeningElement.Identifier', `"${node.tagName.text}"`);

          const attributes: (ts.JsxAttribute | ts.JsxSpreadAttribute)[] = [];
          const className: ts.Expression[] = [];

          node.attributes.properties.forEach(attribute => {
            if (ts.isJsxAttribute(attribute)) {
              if (attribute.initializer) {
                /* (1) */
                if (attribute.name.text === 'className') {
                  console.log('JsxOpeningElement.JsxAttribute', '"className" exists');
                  /* (1.1) */
                  if (ts.isJsxExpression(attribute.initializer) || ts.isStringLiteral(attribute.initializer)) {
                    return className.push(attribute.initializer);
                  }
                }
                /* (2) */
                if (attribute.name.text in allowedJSXAttributes) {
                  console.log('JsxOpeningElement.JsxAttribute', `"${attribute.name.text}" exists`);
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
              console.log(
                'JsxOpeningElement.JsxSpreadAttribute',
                ts.isIdentifier(attribute.expression) && `"${attribute.expression.text}"`
              );

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

          return ts.factory.updateJsxOpeningElement(
            node,
            node.tagName,
            node.typeArguments,
            ts.factory.updateJsxAttributes(node.attributes, attributes)
          );
        }
      }

      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
  };
};

const compilerOptions: ts.CompilerOptions = {
  allowSyntheticDefaultImports: true,
  esModuleInterop: true,
  jsx: ts.JsxEmit.React,
  module: ts.ModuleKind.CommonJS,
  strict: true,
  target: ts.ScriptTarget.ESNext,
};

const files = ['/Users/marekkobida/Documents/warden/compiler/private/index.tsx'];
const program = ts.createProgram(files, compilerOptions, ts.createCompilerHost({}));

const emitResult = program.emit(undefined, undefined, undefined, undefined, { before: [transformer] });

const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

console.log(allDiagnostics);
