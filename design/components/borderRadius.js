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
    ['0', '0'], //        0
    ['1', '0.125rem'], // 2px
    ['2', '0.25rem'], //  4px
    ['3', '0.5rem'], //   8px
    ['50', '50%'], //     50%
];
function borderRadius() {
    const $ = dictionary_1.default.getKey('borderRadius');
    const b = dictionary_1.default.getKey('borderBottomRadius');
    const l = dictionary_1.default.getKey('borderLeftRadius');
    const r = dictionary_1.default.getKey('borderRightRadius');
    const t = dictionary_1.default.getKey('borderTopRadius');
    return (0, forBreakpoints_1.default)(([breakpointName]) => {
        return {
            ...sizes.reduce((_, [left, right]) => ({
                ..._,
                [`.${breakpointName}${$}${dictionary_1.default.getKey(left)}`]: {
                    borderRadius: right,
                },
                [`.${breakpointName}${b}${dictionary_1.default.getKey(left)}`]: {
                    borderBottomLeftRadius: right,
                    borderBottomRightRadius: right,
                },
                [`.${breakpointName}${l}${dictionary_1.default.getKey(left)}`]: {
                    borderBottomLeftRadius: right,
                    borderTopLeftRadius: right,
                },
                [`.${breakpointName}${r}${dictionary_1.default.getKey(left)}`]: {
                    borderBottomRightRadius: right,
                    borderTopRightRadius: right,
                },
                [`.${breakpointName}${t}${dictionary_1.default.getKey(left)}`]: {
                    borderTopLeftRadius: right,
                    borderTopRightRadius: right,
                },
            }), {}),
        };
    });
}
exports.default = borderRadius;
