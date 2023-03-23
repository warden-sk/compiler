/*
 * Copyright 2023 Marek Kobida
 */

import fs from 'fs';
import compile from './compiler';

const compiled = compile('/Users/marekkobida/Documents/warden/compiler/private/index.tsx');

fs.writeFileSync('/Users/marekkobida/Documents/warden/compiler_test/test.js', compiled);
