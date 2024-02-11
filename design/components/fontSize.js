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
const fontSizes = [
    ['1', '0.75rem'], //  12px
    ['2', '0.875rem'], // 14px
    ['3', '1rem'], //     16px
    ['4', '1.125rem'], // 18px
    ['5', '1.25rem'], //  20px
    ['6', '1.5rem'], //   24px
    ['7', '1.75rem'], //  28px
    ['8', '2rem'], //     32px
    ['9', '2.25rem'], //  36px
    ['10', '2.5rem'], //  40px
    ['11', '2.75rem'], // 44px
    ['12', '3rem'], //    48px
];
function fontSize() {
    const $ = getDictionary_1.default.getKey('fontSize');
    return (0, forBreakpoints_1.default)(([breakpointName]) => fontSizes.reduce((css, [left, right]) => ({
        ...css,
        [`.${breakpointName}${$}${getDictionary_1.default.getKey(left)}`]: {
            fontSize: right,
        },
    }), {}));
}
exports.default = fontSize;
