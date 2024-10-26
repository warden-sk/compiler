/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 26.10.2024
 */

class Cache {
  storage: Record<string, [Buffer, Date]> = {};

  get(l: string): [Buffer, Date] | undefined {
    return this.storage[l];
  }

  has(l: string): boolean {
    return l in this.storage;
  }

  set(l: string, r: [Buffer, Date]) {
    this.storage[l] = r;
  }
}

export default Cache;
