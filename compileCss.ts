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
    const DESIGN_CSS_PATH = './node_modules/@warden-sk/compiler/design.css';

    if (!options.cache.has(DESIGN_CSS_PATH)) {
      options.cache.set(DESIGN_CSS_PATH, [fs.readFileSync(DESIGN_CSS_PATH), new Date()]);
    }

    options.cache.set(options.path, [fs.readFileSync(options.path), new Date()]);

    fs.writeFileSync(
      path.resolve(options.outputPath, './index.css'),
      Object.keys(options.cache.storage)
        .filter(l => /\.css/.test(l))
        .reduce((l, r) => l + `/* ${r} */\n${options.cache!.storage[r][0]}`, '')
    );

    report(
      undefined,
      '\x1b[34m[CSS]\x1b[0m',
      sizeToReadable(options.cache.get(options.path)[0].length),
      `\x1b[32m${options.path}\x1b[0m`
    );
  }
}

export default compileCss;
