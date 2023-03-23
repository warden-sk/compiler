"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const alphabet_1 = __importDefault(require("./alphabet"));
function base54(i) {
    let base = 54, key = '';
    i++;
    while (i > 0) {
        i--;
        key += alphabet_1.default[i % base];
        i = Math.floor(i / base);
        base = 64;
    }
    return key;
}
exports.default = base54;
