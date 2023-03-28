"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isObject(input) {
    return Object.prototype.toString.call(input) === '[object Object]';
}
exports.default = isObject;
