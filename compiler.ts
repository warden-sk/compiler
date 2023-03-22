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

const files = ['/Users/marekkobida/Documents/warden/compiler/private/index.tsx'];

const program = ts.createProgram(files, compilerOptions, ts.createCompilerHost({}));

const emitResult = program.emit(undefined, undefined, undefined, undefined, { before: [transformer] });

const diagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

console.log(diagnostics);
