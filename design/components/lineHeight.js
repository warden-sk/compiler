"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getDictionary_1 = __importDefault(require("../../getDictionary"));
const forBreakpoints_1 = __importDefault(require("../forBreakpoints"));
const lineHeights = [
    ['1', '1'],
    ['2', '1.25'],
    ['3', '1.5'],
    ['4', '1.75'],
    ['5', '2'],
];
function lineHeight() {
    const $ = getDictionary_1.default.getKey('lineHeight');
    return (0, forBreakpoints_1.default)(([breakpointName]) => lineHeights.reduce((css, [left, right]) => ({
        ...css,
        [`.${breakpointName}${$}${getDictionary_1.default.getKey(left)}`]: {
            lineHeight: right,
        },
    }), {}));
}
exports.default = lineHeight;
