/*
 * Copyright 2023 Marek Kobida
 */

import fs from 'fs';
import path from 'path';
import ts from 'typescript';
import compileHtml from './compileHtml';
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
  assets?: string[];
  outputPath?: string;
  transpileOnly?: boolean;
  useTransformers?: boolean;
}

function compile(filePath: string, options: Options): string {
  const startDate: number = +new Date();

  compileHtml({
    assets: options.assets ?? [],
    outputPath: path.resolve(options.outputPath ?? '/'),
  });

  const transformers: ts.CustomTransformers = { before: [cssTransformer(options), transformer()] };

  if (options.transpileOnly) {
    const { outputText: compiled } = ts.transpileModule(fs.readFileSync(filePath).toString(), {
      compilerOptions,
      fileName: filePath,
      transformers: options.useTransformers ? (/compiler\//.test(filePath) ? undefined : transformers) : undefined,
    });

    const endDate: number = +new Date();

    report(
      undefined,
      '🟢',
      `${((endDate - startDate) / 1000).toFixed(2)} second(s)`,
      filePath,
      sizeToReadable(compiled.length)
    );

    return compiled;
  }

  let compiled = '';

  const compilerHost: ts.CompilerHost = ts.createCompilerHost({});
  compilerHost.writeFile = (fileName, text) => (compiled = text);

  const program: ts.Program = ts.createProgram([filePath], compilerOptions, compilerHost);

  const emitResult: ts.EmitResult = program.emit(
    undefined,
    undefined,
    undefined,
    undefined,
    options.useTransformers ? (/compiler\//.test(filePath) ? undefined : transformers) : undefined
  );

  const diagnostics: ts.Diagnostic[] = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  const endDate: number = +new Date();

  if (diagnostics.length > 0) {
    for (const diagnostic of diagnostics) {
      if (diagnostic.file) {
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

        report(
          undefined,
          '🔴',
          `${((endDate - startDate) / 1000).toFixed(2)} second(s)`,
          `\x1b[31m${diagnostic.file.fileName}\n\n${message}\n\x1b[0m`
        );
      }
    }
  } else {
    report(
      undefined,
      '🟢',
      `${((endDate - startDate) / 1000).toFixed(2)} second(s)`,
      filePath,
      sizeToReadable(compiled.length)
    );
  }

  return compiled;
}

export default compile;
