/*
 * Copyright 2023 Marek Kobida
 */

import ts from 'typescript';

/**
 * createRequireStatement(ts.factory.createIdentifier('test'), './path/to/test.ts');
 *
 * const test = require('./path/to/test.ts').default;
 */
function createRequireStatement(name: ts.Identifier, path: string): ts.VariableStatement {
  const f: ts.NodeFactory = ts.factory;

  const variableDeclaration: ts.VariableDeclaration = f.createVariableDeclaration(
    name,
    undefined,
    undefined,
    f.createPropertyAccessExpression(
      f.createCallExpression(f.createIdentifier('require'), undefined, [f.createStringLiteral(path)]),
      f.createIdentifier('default')
    )
  );

  return f.createVariableStatement(
    undefined,
    f.createVariableDeclarationList([variableDeclaration], ts.NodeFlags.Const)
  );
}

export default createRequireStatement;
