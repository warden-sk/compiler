"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
function percentage(left, right) {
    return ((left / right) * 100).toFixed(6).replace(/\.0+$/, '') + '%';
}
exports.default = percentage;
