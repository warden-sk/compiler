/*
 * Copyright 2023 Marek Kobida
 */

import ts from 'typescript';

const cssTransformer: ts.TransformerFactory<ts.SourceFile> = context => {
  const { factory: f } = context;

  return sourceFile => {
    const visitor: ts.Visitor = node => {
      if (ts.isImportDeclaration(node)) {
        const expression: ts.Expression = node.moduleSpecifier;

        if (ts.isStringLiteral(expression)) {
          if (/\.css/.test(expression.text)) {
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
