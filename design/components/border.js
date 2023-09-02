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
const sizes = [
    ['0', '0'],
    ['1', '0.0625rem'],
    ['2', '0.125rem'], //  2px
];
function css(breakpointName, left, right) {
    const $ = getDictionary_1.default.getKey('border');
    const b = getDictionary_1.default.getKey(`borderBottom`);
    const l = getDictionary_1.default.getKey(`borderLeft`);
    const r = getDictionary_1.default.getKey(`borderRight`);
    const t = getDictionary_1.default.getKey(`borderTop`);
    const x = getDictionary_1.default.getKey(`borderX`);
    const y = getDictionary_1.default.getKey(`borderY`);
    return {
        [`.${breakpointName}${$}${getDictionary_1.default.getKey(left)}`]: {
            borderStyle: 'solid',
            borderWidth: right,
        },
        // "b", "y"
        [`.${breakpointName}${b}${getDictionary_1.default.getKey(left)},.${breakpointName}${y}${getDictionary_1.default.getKey(left)}`]: {
            borderBottomStyle: 'solid',
            borderBottomWidth: right,
        },
        // "l", "x"
        [`.${breakpointName}${l}${getDictionary_1.default.getKey(left)},.${breakpointName}${x}${getDictionary_1.default.getKey(left)}`]: {
            borderLeftStyle: 'solid',
            borderLeftWidth: right,
        },
        // "r", "x"
        [`.${breakpointName}${r}${getDictionary_1.default.getKey(left)},.${breakpointName}${x}${getDictionary_1.default.getKey(left)}`]: {
            borderRightStyle: 'solid',
            borderRightWidth: right,
        },
        // "t", "y"
        [`.${breakpointName}${t}${getDictionary_1.default.getKey(left)},.${breakpointName}${y}${getDictionary_1.default.getKey(left)}`]: {
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
