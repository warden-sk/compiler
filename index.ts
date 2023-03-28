/*
 * Copyright 2023 Marek Kobida
 */

import ts from 'typescript';
import cssTransformer from './cssTransformer';
import report from './helpers/report';
import sizeToReadable from './helpers/sizeToReadable';
import transformer from './transformer';

const compilerOptions: ts.CompilerOptions = {
  allowSyntheticDefaultImports: true,
  esModuleInterop: true,
  jsx: ts.JsxEmit.React,
  module: ts.ModuleKind.CommonJS,
  strict: true,
  target: ts.ScriptTarget.ESNext,
};

interface Options {
  cssOutputPath: string;
  useTransformers: boolean;
}

function compile(filePath: string, options: Options): string {
  report(undefined, `🟠 compiling ${filePath}`);

  let compiled = '';

  const compilerHost: ts.CompilerHost = ts.createCompilerHost({});
  compilerHost.writeFile = (fileName, text) => (compiled = text);

  const program: ts.Program = ts.createProgram([filePath], compilerOptions, compilerHost);

  const transformers: ts.CustomTransformers = { before: [cssTransformer(options, program), transformer(program)] };

  const emitResult: ts.EmitResult = program.emit(
    undefined,
    undefined,
    undefined,
    undefined,
    options.useTransformers ? transformers : undefined
  );

  const diagnostics: ts.Diagnostic[] = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  if (diagnostics.length > 0) {
    for (const diagnostic of diagnostics) {
      if (diagnostic.file) {
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

        report(undefined, `🔴 \x1b[31m${diagnostic.file.fileName}\n\n${message}\n\x1b[0m`);
      }
    }
  } else {
    report(undefined, `🟢 ${filePath}`, sizeToReadable(compiled.length));
  }

  return compiled;
}

export default compile;
