"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 02.04.2024
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isBoolean(input) {
    return Object.prototype.toString.call(input) === '[object Boolean]';
}
exports.default = isBoolean;
