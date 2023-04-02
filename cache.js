"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Cache {
    storage = {};
    get(l) {
        return this.storage[l];
    }
    has(l) {
        return l in this.storage;
    }
    set(l, r) {
        this.storage[l] = r;
    }
}
exports.default = new Cache();
