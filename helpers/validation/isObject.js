"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 02.04.2024
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isObject(input) {
    return Object.prototype.toString.call(input) === '[object Object]';
}
exports.default = isObject;
