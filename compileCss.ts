/*
 * Copyright 2023 Marek Kobida
 */

import fs from 'fs';
import path from 'path';
import type Cache from './Cache';
import report from './helpers/report';
import sizeToReadable from './helpers/sizeToReadable';

interface Options {
  cache?: Cache;
  outputPath: string;
  path: string;
}

function compileCss(options: Options) {
  if (options.cache) {
    /**
     * 1
     */
    const designFilePath = './node_modules/@warden-sk/compiler/design.css';

    if (!options.cache.has(designFilePath)) {
      const designFile = fs.readFileSync(designFilePath);

      options.cache.set(designFilePath, [designFile, new Date()]);

      report(undefined, '\x1b[34m[CSS]\x1b[0m', sizeToReadable(designFile.length), `\x1b[32m${designFilePath}\x1b[0m`);
    }

    /**
     * 2
     */
    const cssFile = fs.readFileSync(options.path);

    options.cache.set(options.path, [cssFile, new Date()]);

    report(undefined, '\x1b[34m[CSS]\x1b[0m', sizeToReadable(cssFile.length), `\x1b[32m${options.path}\x1b[0m`);

    /**
     * 3
     */
    fs.writeFileSync(
      path.resolve(options.outputPath, './index.css'),
      Object.keys(options.cache.storage)
        .filter(l => /\.css/.test(l))
        .reduce((l, r) => l + options.cache!.storage[r][0], '')
    );
  }
}

export default compileCss;
