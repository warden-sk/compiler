"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 02.04.2024
 */
Object.defineProperty(exports, "__esModule", { value: true });
class InvariantError extends Error {
}
function invariant(condition, message) {
    if (!condition) {
        throw new InvariantError(message);
    }
}
exports.default = invariant;
