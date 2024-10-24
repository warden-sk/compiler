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
    ['0', '0'], //        0
    ['1', '0.125rem'], // 2px
    ['2', '0.25rem'], //  4px
    ['3', '0.5rem'], //   8px
    ['50', '50%'], //     50%
];
function borderRadius() {
    const $ = getDictionary_1.default.getKey('borderRadius');
    const b = getDictionary_1.default.getKey('borderBottomRadius');
    const l = getDictionary_1.default.getKey('borderLeftRadius');
    const r = getDictionary_1.default.getKey('borderRightRadius');
    const t = getDictionary_1.default.getKey('borderTopRadius');
    return (0, forBreakpoints_1.default)(([breakpointName]) => {
        return {
            ...sizes.reduce((_, [left, right]) => ({
                ..._,
                [`.${breakpointName}${$}${getDictionary_1.default.getKey(left)}`]: {
                    borderRadius: right,
                },
                [`.${breakpointName}${b}${getDictionary_1.default.getKey(left)}`]: {
                    borderBottomLeftRadius: right,
                    borderBottomRightRadius: right,
                },
                [`.${breakpointName}${l}${getDictionary_1.default.getKey(left)}`]: {
                    borderBottomLeftRadius: right,
                    borderTopLeftRadius: right,
                },
                [`.${breakpointName}${r}${getDictionary_1.default.getKey(left)}`]: {
                    borderBottomRightRadius: right,
                    borderTopRightRadius: right,
                },
                [`.${breakpointName}${t}${getDictionary_1.default.getKey(left)}`]: {
                    borderTopLeftRadius: right,
                    borderTopRightRadius: right,
                },
            }), {}),
        };
    });
}
exports.default = borderRadius;
