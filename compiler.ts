/*
 * Copyright 2023 Marek Kobida
 */

import ts from 'typescript';
import report from './helpers/report';
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

function sizeToReadable(size: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

function compile(filePath: string, useTransformers: boolean): string {
  let compiled = '';

  const compilerHost: ts.CompilerHost = ts.createCompilerHost({});
  compilerHost.writeFile = (fileName, text) => (compiled = text);

  const program: ts.Program = ts.createProgram([filePath], compilerOptions, compilerHost);

  const emitResult: ts.EmitResult = program.emit(
    undefined,
    undefined,
    undefined,
    undefined,
    useTransformers ? transformers : undefined
  );

  const diagnostics: ts.Diagnostic[] = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  for (const diagnostic of diagnostics) {
    if (diagnostic.file) {
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

      report(undefined, `\x1b[31m${diagnostic.file.fileName}\x1b[0m`);
      report(undefined, message);
    }
  }

  report(undefined, filePath, `${sizeToReadable(compiled.length)}`);

  return compiled;
}

export default compile;
