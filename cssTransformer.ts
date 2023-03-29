/*
 * Copyright 2023 Marek Kobida
 */

import fs from 'fs';
import path from 'path';
import ts from 'typescript';
import report from './helpers/report';
import sizeToReadable from './helpers/sizeToReadable';

interface Options {
  outputPath?: string;
}

const cache = new Map<string, Buffer>();

const cssTransformer = (options: Options): ts.TransformerFactory<ts.SourceFile> => {
  return context => {
    return sourceFile => {
      const visitor: ts.Visitor = node => {
        if (ts.isImportDeclaration(node)) {
          const expression: ts.Expression = node.moduleSpecifier;

          if (ts.isStringLiteral(expression)) {
            if (/\.css/.test(expression.text)) {
              // dokončiť
              const FILE_PATH = sourceFile.fileName.replace(/\/[^\/]+$/, '');
              const CSS_PATH = path.resolve(FILE_PATH, expression.text);

              if (cache.has(CSS_PATH)) {
              } else {
                cache.set(CSS_PATH, fs.readFileSync(CSS_PATH));
              }

              const DESIGN_CSS_PATH = './node_modules/@warden-sk/design/index.css';

              const icon = cache.has(DESIGN_CSS_PATH) ? '🟠' : '🟢';

              if (icon === '🟢') {
                cache.set(DESIGN_CSS_PATH, fs.readFileSync(DESIGN_CSS_PATH));
              }

              if (options.outputPath) {
                fs.writeFileSync(
                  path.resolve(options.outputPath, './index.css'),
                  [...cache].reduce((l, r) => Buffer.concat([l, r[1]]), Buffer.alloc(0))
                );
              }

              report(undefined, icon, '\x1b[33m[CSS]\x1b[0m', CSS_PATH, sizeToReadable(cache.get(CSS_PATH)!.length));

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
