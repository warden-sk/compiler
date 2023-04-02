/*
 * Copyright 2023 Marek Kobida
 */

import fs from 'fs';
import http from 'http';
import path from 'path';
import ts from 'typescript';
import cache from './cache';
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
  resolveJsonModule: true,
  strict: true,
  target: ts.ScriptTarget.ESNext,
};

interface Options {
  assets?: string[];
  outputPath?: string;
  publicPath?: string;
  reportErrors?: boolean;
  useServer?: boolean;
  useTransformers?: boolean;
}

let isServerUsed = false;

function compile(filePath: string, options: Options): string {
  const startDate: number = +new Date();

  report(undefined, '\x1b[34m[CACHE]\x1b[0m', cache.size);

  const updatedOptions: Options & { outputPath: string } = {
    ...options,
    outputPath: path.resolve(options.outputPath ?? './public'),
  };

  // dokončiť
  if (!isServerUsed && updatedOptions.useServer) {
    const server = http.createServer((request, response) => {
      const url = new URL(request.url!, 'file:');

      report('IN', '\x1b[34m[SERVER]\x1b[0m', url.pathname);

      try {
        const file = fs.readFileSync(path.resolve(updatedOptions.outputPath, `.${url.pathname}`));

        return response.end(file);
      } catch (error) {
        const file = fs.readFileSync(path.resolve(updatedOptions.outputPath, './index.html'));

        return response.end(file);
      }
    });

    server.listen(80, () => {
      report(undefined, '\x1b[34m[SERVER]\x1b[0m', 'http://127.0.0.1');

      isServerUsed = true;
    });
  }

  compileHtml(updatedOptions);

  const transformers: ts.CustomTransformers = { before: [cssTransformer(updatedOptions), transformer()] };

  if (updatedOptions.reportErrors) {
    let compiled = '';

    const compilerHost: ts.CompilerHost = ts.createCompilerHost({});
    compilerHost.writeFile = (fileName, text) => {
      compiled = text;

      cache.set(fileName, [Buffer.from(compiled), new Date()]);
    };

    const program: ts.Program = ts.createProgram([filePath], compilerOptions, compilerHost);

    const emitResult: ts.EmitResult = program.emit(
      undefined,
      undefined,
      undefined,
      undefined,
      updatedOptions.useTransformers ? (/compiler\//.test(filePath) ? undefined : transformers) : undefined
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
            `\x1b[31m${diagnostic.file.fileName}\n\n${message}\n\x1b[0m`
          );
        }
      }
    } else {
      report(
        undefined,
        '\x1b[34m[JS]\x1b[0m',
        sizeToReadable(compiled.length),
        `${((endDate - startDate) / 1000).toFixed(2)} second(s)`,
        `\x1b[32m${filePath}\x1b[0m`
      );
    }

    return compiled;
  }

  const { outputText: compiled } = ts.transpileModule(fs.readFileSync(filePath).toString(), {
    compilerOptions,
    fileName: filePath,
    transformers: updatedOptions.useTransformers ? (/compiler\//.test(filePath) ? undefined : transformers) : undefined,
  });

  cache.set(filePath, [Buffer.from(compiled), new Date()]);

  const endDate: number = +new Date();

  report(
    undefined,
    '\x1b[34m[JS]\x1b[0m',
    sizeToReadable(compiled.length),
    `${((endDate - startDate) / 1000).toFixed(2)} second(s)`,
    `\x1b[32m${filePath}\x1b[0m`
  );

  return compiled;
}

export default compile;
