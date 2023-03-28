"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const report_1 = __importDefault(require("../report"));
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
        (0, report_1.default)(undefined, key, this.#dictionary[key] ?? key);
        return this.#dictionary[key] ?? key;
    }
}
exports.default = Dictionary;
