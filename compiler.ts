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

function compile(code: string): string {
  const transpileOutput = ts.transpileModule(code, { compilerOptions, transformers });

  if (transpileOutput.diagnostics) {
    for (const diagnostic of transpileOutput.diagnostics) {
      if (diagnostic.file) {
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

        console.log(`\x1b[31m${diagnostic.file.fileName}\x1b[0m\n${message}`);
      }
    }
  }

  return transpileOutput.outputText;
}

export default compile;
