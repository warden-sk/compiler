/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 29.10.2024
 */

import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import compileCss from './compileCss';
import compileHtml from './compileHtml';
import report from './helpers/report';
import sizeToReadable from './helpers/sizeToReadable';
import cssTransformer from './transformers/cssTransformer';
import jsTransformer from './transformers/jsTransformer';

type Options = {
  assets?: string[];
  outputPath?: string;
  publicPath?: string;
  useHtmlCompiler?: boolean;
  useTransformers?: boolean;
};

function compile(input: string, options: Options): string {
  const isFilePath = /^(\.\/|\/)/.test(input);

  const startDate: number = +new Date();

  const updatedOptions: Options & { outputPath: string } = {
    ...options,
    outputPath: path.resolve(options.outputPath ?? './public'),
  };

  updatedOptions.useHtmlCompiler && compileHtml(updatedOptions);

  const transformers: ts.CustomTransformers = { before: [cssTransformer(updatedOptions), jsTransformer()] };

  const { outputText: compiled } = ts.transpileModule(
    /**/ isFilePath ? fs.readFileSync(input).toString() : input,
    /**/ {
      compilerOptions: {
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        jsx: ts.JsxEmit.React,
        module: ts.ModuleKind.CommonJS,
        noUncheckedIndexedAccess: true,
        strict: true,
        target: ts.ScriptTarget.ESNext,
      },
      fileName: isFilePath ? input : 'index.tsx',
      transformers: updatedOptions.useTransformers && !/compiler\//.test(input) ? transformers : undefined,
    },
  );

  const endDate: number = +new Date();

  report(
    undefined,
    '\x1b[34m[JS]\x1b[0m',
    sizeToReadable(compiled.length),
    `${((endDate - startDate) / 1000).toFixed(2)} second(s)`,
    `\x1b[32m${isFilePath ? input : 'index.tsx'}\x1b[0m`,
  );

  return compiled;
}

export { compile, compileCss };

export default compile;
