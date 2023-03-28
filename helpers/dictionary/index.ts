/*
 * Copyright 2023 Marek Kobida
 */

import report from '../report';
import base54 from './base54';

class Dictionary {
  #dictionary: { [key: string]: string };

  constructor(keys: string[]) {
    const dictionary = [...new Set(keys)].sort((l, r) => l.localeCompare(r, 'sk'));

    this.#dictionary = dictionary.reduce((keys, key, i) => ({ ...keys, [key]: base54(i) }), {});
  }

  getDictionary(): { [key: string]: string } {
    return this.#dictionary;
  }

  getKey(key: string): string {
    report(undefined, key, this.#dictionary[key] ?? key);

    return this.#dictionary[key] ?? key;
  }
}

export default Dictionary;
