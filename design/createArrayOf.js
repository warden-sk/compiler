"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
function createArrayOf(length) {
    const $ = [];
    for (let i = 0; i <= length; i++) {
        $[i] = i;
    }
    return $;
}
exports.default = createArrayOf;
