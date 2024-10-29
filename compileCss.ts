/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 29.10.2024
 */

import fs from 'node:fs';
import path from 'node:path';
import design from './design';
import report from './helpers/report';
import sizeToReadable from './helpers/sizeToReadable';

type Options = {
  outputPath: string;
  path: string;
};

const cache = new Map([['design', design]]);

function compileCss(options: Options) {
  const cssFile = fs.readFileSync(options.path);

  cache.set(options.path, cssFile.toString());

  report(undefined, '\x1b[34m[CSS]\x1b[0m', sizeToReadable(cssFile.length), `\x1b[32m${options.path}\x1b[0m`);

  /**
   * 3
   */
  fs.writeFileSync(
    path.resolve(options.outputPath, './index.css'),
    [...cache].reduce((l, r) => l + r[1], ''),
  );
}

export default compileCss;
