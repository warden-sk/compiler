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

function compile(code: string, filePath: string, useTransformers: boolean): string {
  const transpileOutput: ts.TranspileOutput = ts.transpileModule(code, {
    compilerOptions,
    fileName: filePath,
    transformers: useTransformers ? transformers : undefined,
  });

  if (transpileOutput.diagnostics) {
    for (const diagnostic of transpileOutput.diagnostics) {
      if (diagnostic.file) {
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

        console.log(`\x1b[31m${diagnostic.file.fileName}\x1b[0m\n${message}`);
      }
    }
  }

  console.log('compiled', filePath);

  return transpileOutput.outputText;
}

export default compile;
