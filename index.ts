/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import ts from 'typescript';
import type Cache from './Cache';
import compileHtml from './compileHtml';
import getIPv4Addresses from './helpers/getIPv4Addresses';
import report from './helpers/report';
import sizeToReadable from './helpers/sizeToReadable';
import isObject from './helpers/validation/isObject';
import cssTransformer from './transformers/cssTransformer';
import jsTransformer from './transformers/jsTransformer';
import * as λ from './λ';

const compilerOptions: ts.CompilerOptions = {
  allowSyntheticDefaultImports: true,
  esModuleInterop: true,
  jsx: ts.JsxEmit.React,
  module: ts.ModuleKind.CommonJS,
  strict: true,
  target: ts.ScriptTarget.ESNext,
};

type Options = {
  assets?: string[];
  cache?: Cache;
  outputPath?: string;
  publicPath?: string;
  reportErrors?: boolean;
  useServer?: boolean;
  useTransformers?: boolean;
};

let isFirstCompilation = true,
  projects = new Map<string, number>();

function compile(filePath: string, options: Options): string {
  const startDate: number = +new Date();

  const updatedOptions: Options & { outputPath: string } = {
    ...options,
    outputPath: path.resolve(options.outputPath ?? './public'),
  };

  projects.set(updatedOptions.outputPath, +new Date());

  if (isFirstCompilation) {
    if (updatedOptions.useServer) {
      // dokončiť – Content-Type
      const server = http.createServer((request, response) => {
        // const url = new URL(request.url!, 'file:');

        // report('IN', '\x1b[34m[SERVER]\x1b[0m', url.pathname);

        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Content-Type', 'application/json; charset=utf-8');

        response.end(λ.encodeJSON([...projects]));
      });

      server.listen('8080', () => {
        const IPv4Addresses = getIPv4Addresses(),
          address = server.address(),
          port = isObject(address) ? address.port : address;

        report(
          undefined,
          '\x1b[34m[SERVER]\x1b[0m',
          IPv4Addresses.map(address => `https://${address}:${port}`).join(', '),
        );
      });

      isFirstCompilation = false;
    }
  }

  compileHtml(updatedOptions);

  const transformers: ts.CustomTransformers = { before: [cssTransformer(updatedOptions), jsTransformer()] };

  if (updatedOptions.reportErrors) {
    let compiled = '';

    const compilerHost: ts.CompilerHost = ts.createCompilerHost({});
    compilerHost.writeFile = (fileName, text) => {
      compiled = text;

      updatedOptions.cache?.set(fileName, [Buffer.from(compiled), new Date()]);
    };

    const program: ts.Program = ts.createProgram([filePath], compilerOptions, compilerHost);

    const emitResult: ts.EmitResult = program.emit(
      undefined,
      undefined,
      undefined,
      undefined,
      updatedOptions.useTransformers ?
        /compiler\//.test(filePath) ?
          undefined
        : transformers
      : undefined,
    );

    const diagnostics: ts.Diagnostic[] = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    const endDate: number = +new Date();

    if (diagnostics.length > 0) {
      for (const diagnostic of diagnostics) {
        if (diagnostic.file) {
          const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

          report(
            undefined,
            '\x1b[34m[JS]\x1b[0m',
            sizeToReadable(compiled.length),
            `${((endDate - startDate) / 1000).toFixed(2)} second(s)`,
            `\x1b[31m${diagnostic.file.fileName}\n\n${message}\n\x1b[0m`,
          );
        }
      }
    } else {
      report(
        undefined,
        '\x1b[34m[JS]\x1b[0m',
        sizeToReadable(compiled.length),
        `${((endDate - startDate) / 1000).toFixed(2)} second(s)`,
        `\x1b[32m${filePath}\x1b[0m`,
      );
    }

    return compiled;
  }

  const { outputText: compiled } = ts.transpileModule(fs.readFileSync(filePath).toString(), {
    compilerOptions,
    fileName: filePath,
    transformers:
      updatedOptions.useTransformers ?
        /compiler\//.test(filePath) ?
          undefined
        : transformers
      : undefined,
  });

  updatedOptions.cache?.set(filePath, [Buffer.from(compiled), new Date()]);

  const endDate: number = +new Date();

  report(
    undefined,
    '\x1b[34m[JS]\x1b[0m',
    sizeToReadable(compiled.length),
    `${((endDate - startDate) / 1000).toFixed(2)} second(s)`,
    `\x1b[32m${filePath}\x1b[0m`,
  );

  return compiled;
}

export default compile;
