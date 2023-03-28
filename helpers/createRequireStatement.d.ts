import ts from 'typescript';
/**
 * createRequireStatement(ts.factory.createIdentifier('test'), './path/to/test.ts');
 *
 * const test = require('./path/to/test.ts').default;
 */
declare function createRequireStatement(name: ts.Identifier, path: string): ts.VariableStatement;
export default createRequireStatement;
