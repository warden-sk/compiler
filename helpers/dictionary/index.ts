/*
 * Copyright 2023 Marek Kobida
 */

import base54 from './base54';

class Dictionary {
  #dictionary: Record<string, string>;

  constructor(keys: string[]) {
    const dictionary = [...new Set(keys)].sort((l, r) => l.localeCompare(r, 'sk'));

    this.#dictionary = dictionary.reduce((keys, key, i) => ({ ...keys, [key]: base54(i) }), {});
  }

  getDictionary(): Record<string, string> {
    return this.#dictionary;
  }

  getKey(key: string): string {
    return this.#dictionary[key] ?? key;
  }
}

export default Dictionary;
