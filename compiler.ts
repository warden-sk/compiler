/*
 * Copyright 2023 Marek Kobida
 */

import ts from 'typescript';
import transformer from './transformer';

const compilerOptions: ts.CompilerOptions = {
  allowSyntheticDefaultImports: true,
  esModuleInterop: true,
  jsx: ts.JsxEmit.React,
  module: ts.ModuleKind.CommonJS,
  strict: true,
  target: ts.ScriptTarget.ESNext,
};

const transformers: ts.CustomTransformers = { before: [transformer] };

function compile(filePath: string, useTransformers: boolean): string {
  let response = '';

  const program: ts.Program = ts.createProgram([filePath], compilerOptions);

  const emitResult: ts.EmitResult = program.emit(
    undefined,
    (fileName, text) => (response = text),
    undefined,
    undefined,
    useTransformers ? transformers : undefined
  );

  const diagnostics: ts.Diagnostic[] = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  for (const diagnostic of diagnostics) {
    if (diagnostic.file) {
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

      console.log(`\x1b[31m${diagnostic.file.fileName}\x1b[0m\n${message}`);
    }
  }

  console.log('compiled', filePath);

  return response;
}

export default compile;
