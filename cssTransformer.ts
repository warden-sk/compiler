/*
 * Copyright 2023 Marek Kobida
 */

import fs from 'fs';
import path from 'path';
import ts from 'typescript';
import cache from './cache';
import report from './helpers/report';
import sizeToReadable from './helpers/sizeToReadable';

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

              cache.set(CSS_PATH, [fs.readFileSync(CSS_PATH), new Date()]);

              const DESIGN_CSS_PATH = './node_modules/@warden-sk/compiler/design.css';

              if (cache.has(DESIGN_CSS_PATH)) {
              } else {
                cache.set(DESIGN_CSS_PATH, [fs.readFileSync(DESIGN_CSS_PATH), new Date()]);
              }

              fs.writeFileSync(
                path.resolve(options.outputPath, './index.css'),
                [...cache].reduce((l, r) => l + r[1][0], '')
              );

              report(
                undefined,
                '\x1b[34m[CSS]\x1b[0m',
                sizeToReadable(cache.get(CSS_PATH)![0].length),
                `\x1b[32m${CSS_PATH}\x1b[0m`
              );

              return;
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
