"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dictionary_1 = __importDefault(require("../../dictionary"));
const forBreakpoints_1 = __importDefault(require("../forBreakpoints"));
const sizes = [
    ['0', '0'], //         0
    ['1', '0.0625rem'], // 1px
    ['2', '0.125rem'], //  2px
];
function css(breakpointName, left, right) {
    const $ = dictionary_1.default.getKey('border');
    const b = dictionary_1.default.getKey('borderBottom');
    const l = dictionary_1.default.getKey('borderLeft');
    const r = dictionary_1.default.getKey('borderRight');
    const t = dictionary_1.default.getKey('borderTop');
    const x = dictionary_1.default.getKey('borderX');
    const y = dictionary_1.default.getKey('borderY');
    return {
        [`.${breakpointName}${$}${dictionary_1.default.getKey(left)}`]: {
            borderStyle: 'solid',
            borderWidth: right,
        },
        // "b", "y"
        [`.${breakpointName}${b}${dictionary_1.default.getKey(left)},.${breakpointName}${y}${dictionary_1.default.getKey(left)}`]: {
            borderBottomStyle: 'solid',
            borderBottomWidth: right,
        },
        // "l", "x"
        [`.${breakpointName}${l}${dictionary_1.default.getKey(left)},.${breakpointName}${x}${dictionary_1.default.getKey(left)}`]: {
            borderLeftStyle: 'solid',
            borderLeftWidth: right,
        },
        // "r", "x"
        [`.${breakpointName}${r}${dictionary_1.default.getKey(left)},.${breakpointName}${x}${dictionary_1.default.getKey(left)}`]: {
            borderRightStyle: 'solid',
            borderRightWidth: right,
        },
        // "t", "y"
        [`.${breakpointName}${t}${dictionary_1.default.getKey(left)},.${breakpointName}${y}${dictionary_1.default.getKey(left)}`]: {
            borderTopStyle: 'solid',
            borderTopWidth: right,
        },
    };
}
function border() {
    return (0, forBreakpoints_1.default)(([breakpointName]) => {
        return {
            ...sizes.reduce((_, [left, right]) => ({
                ..._,
                ...css(breakpointName, left, right),
            }), {}),
        };
    });
}
exports.default = border;
