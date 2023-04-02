/*
 * Copyright 2023 Marek Kobida
 */

class Cache {
  storage: { [key: string]: [Buffer, Date] } = {};

  get(l: string): [Buffer, Date] {
    return this.storage[l];
  }

  has(l: string): boolean {
    return l in this.storage;
  }

  set(l: string, r: [Buffer, Date]) {
    this.storage[l] = r;
  }
}

export default new Cache();
