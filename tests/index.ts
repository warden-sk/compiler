/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 26.10.2024
 */

import assert from 'node:assert';
import fs from 'node:fs';
import test from 'node:test';
import compile from '../index';

test('application', () => {
  //                ↓ The path where the HTML compiler creates the HTML file "index.html."
  const options = { outputPath: './samples/application', useHtmlCompiler: true };

  const compiled = compile(`${options.outputPath}/index.tsx`, options);

  const js = fs.readFileSync(`${options.outputPath}/index.js`).toString();

  assert.strictEqual(compiled, js);
});
