/*
 * Copyright 2023 Marek Kobida
 */

import fs from 'fs';
import path from 'path';
import cache from './cache';
import report from './helpers/report';
import sizeToReadable from './helpers/sizeToReadable';

interface Options {
  outputPath: string;
  path: string;
}

function compileCss(options: Options) {
  cache.set(options.path, [fs.readFileSync(options.path), new Date()]);

  const DESIGN_CSS_PATH = './node_modules/@warden-sk/compiler/design.css';

  if (cache.has(DESIGN_CSS_PATH)) {
  } else {
    cache.set(DESIGN_CSS_PATH, [fs.readFileSync(DESIGN_CSS_PATH), new Date()]);
  }

  fs.writeFileSync(
    path.resolve(options.outputPath, './index.css'),
    Object.keys(cache.storage)
      .filter(l => /\.css/.test(l))
      .reduce((l, r) => l + cache.storage[r][0], '')
  );

  report(
    undefined,
    '\x1b[34m[CSS]\x1b[0m',
    sizeToReadable(cache.get(options.path)[0].length),
    `\x1b[32m${options.path}\x1b[0m`
  );
}

export default compileCss;
