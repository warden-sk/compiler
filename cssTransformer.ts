/*
 * Copyright 2023 Marek Kobida
 */

import path from 'path';
import ts from 'typescript';
import compileCss from './compileCss';

interface Options {
  outputPath: string;
}

const cssTransformer = (options: Options): ts.TransformerFactory<ts.SourceFile> => {
  return context => {
    return sourceFile => {
      const visitor: ts.Visitor = node => {
        if (ts.isImportDeclaration(node)) {
          const expression: ts.Expression = node.moduleSpecifier;

          if (ts.isStringLiteral(expression)) {
            if (/\.css/.test(expression.text)) {
              const FILE_PATH = sourceFile.fileName.replace(/\/[^\/]+$/, '');

              const CSS_PATH = path.resolve(FILE_PATH, expression.text);

              compileCss(options.outputPath, CSS_PATH);
            }
          }
        }

        return ts.visitEachChild(node, visitor, context);
      };

      return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
    };
  };
};

export default cssTransformer;
