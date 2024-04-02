"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 02.04.2024
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isArray(input, length) {
    return (Object.prototype.toString.call(input) === '[object Array]' &&
        (length === undefined || length === input.length));
}
exports.default = isArray;
