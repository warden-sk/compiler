/*
 * Copyright 2023 Marek Kobida
 */

// @ts-ignore
import * as babel from '@babel/core';

function compileBabel(code: string, path: string): string {
  ({ code } = babel.transformSync(code, {
    filename: path,
    plugins: ['@warden-sk'],
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  }));

  return code;
}

export default compileBabel;
