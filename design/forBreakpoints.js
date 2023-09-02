"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.breakpoints = void 0;
exports.breakpoints = [
    ['\\#', '40rem'],
    ['\\#\\#', '48rem'],
    ['\\#\\#\\#', '64rem'],
    ['\\#\\#\\#\\#', '80rem'], // 1280px
];
function forBreakpoints(on) {
    return exports.breakpoints.reduce((_, breakpoint) => ({
        ..._,
        [`@media(min-width:${breakpoint[1]})`]: on(breakpoint),
    }), on(['', '']));
}
exports.default = forBreakpoints;
