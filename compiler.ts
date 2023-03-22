/*
 * Copyright 2023 Marek Kobida
 */

import * as ts from 'typescript';
import transformer from './transformer';

const compilerOptions: ts.CompilerOptions = {
  allowSyntheticDefaultImports: true,
  esModuleInterop: true,
  jsx: ts.JsxEmit.React,
  module: ts.ModuleKind.CommonJS,
  strict: true,
  target: ts.ScriptTarget.ESNext,
};

const files: string[] = ['/Users/marekkobida/Documents/warden/compiler/private/index.tsx'];

const program: ts.Program = ts.createProgram(files, compilerOptions);

const emitResult: ts.EmitResult = program.emit(undefined, undefined, undefined, undefined, { before: [transformer] });

const diagnostics: ts.Diagnostic[] = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

for (const diagnostic of diagnostics) {
  if (diagnostic.file) {
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

    console.log(`\x1b[31m${diagnostic.file.fileName}\x1b[0m\n${message}`);
  }
}
