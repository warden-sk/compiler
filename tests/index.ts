/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 26.10.2024
 */

import assert from 'node:assert';
import fs from 'node:fs';
import test from 'node:test';
import compile from '../index';

test('compile', () => {
  const compiled = compile('./samples/application/index.tsx', {});
  const js = fs.readFileSync('./samples/application/index.js').toString();

  assert.strictEqual(compiled, js);
});
