/*
 * Copyright 2023 Marek Kobida
 */

import ts from 'typescript';
import report from './helpers/report';
import sizeToReadable from './helpers/sizeToReadable';

interface Options {
  cssOutputPath: string;
}

const cssTransformer =
  (options: Options): ts.TransformerFactory<ts.SourceFile> =>
  context => {
    return sourceFile => {
      const visitor: ts.Visitor = node => {
        if (ts.isImportDeclaration(node)) {
          const expression: ts.Expression = node.moduleSpecifier;

          if (ts.isStringLiteral(expression)) {
            if (/\.css/.test(expression.text)) {
              report(undefined, expression.text, sizeToReadable(expression.text.length));

              return;
            }
          }
        }

        return ts.visitEachChild(node, visitor, context);
      };

      return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
    };
  };

export default cssTransformer;
