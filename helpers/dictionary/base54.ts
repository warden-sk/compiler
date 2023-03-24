/*
 * Copyright 2023 Marek Kobida
 */

import alphabet from './alphabet';

function base54(i: number): string {
  let base = 54,
    key = '';

  i++;

  while (i > 0) {
    i--;

    key += alphabet[i % base];

    i = Math.floor(i / base);

    base = 64;
  }

  return key;
}

export default base54;
