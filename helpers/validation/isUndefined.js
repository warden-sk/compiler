"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 02.04.2024
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isUndefined(input) {
    return Object.prototype.toString.call(input) === '[object Undefined]';
}
exports.default = isUndefined;
