"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 02.04.2024
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base54_1 = __importDefault(require("./base54"));
class Dictionary {
    #dictionary;
    constructor(keys) {
        const dictionary = [...new Set(keys)].sort((l, r) => l.localeCompare(r, 'sk'));
        this.#dictionary = dictionary.reduce((keys, key, i) => ({ ...keys, [key]: (0, base54_1.default)(i) }), {});
    }
    getDictionary() {
        return this.#dictionary;
    }
    getKey(key) {
        return this.#dictionary[key] ?? key;
    }
}
exports.default = Dictionary;
