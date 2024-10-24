"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forBreakpoints_1 = __importDefault(require("../forBreakpoints"));
const getName_1 = __importDefault(require("../getName"));
const lineHeights = [
    ['1', '1'],
    ['2', '1.25'],
    ['3', '1.5'],
    ['4', '1.75'],
    ['5', '2'],
];
function lineHeight() {
    return (0, forBreakpoints_1.default)(([breakpointName]) => {
        const $ = (0, getName_1.default)(breakpointName, 'lineHeight');
        return lineHeights.reduce((css, [left, right]) => ({
            ...css,
            [$(left)]: {
                lineHeight: right,
            },
        }), {});
    });
}
exports.default = lineHeight;
