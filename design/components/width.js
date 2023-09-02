"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getDictionary_1 = __importDefault(require("../../getDictionary"));
const createArrayOf_1 = __importDefault(require("../createArrayOf"));
const forBreakpoints_1 = __importDefault(require("../forBreakpoints"));
const percentage_1 = __importDefault(require("../percentage"));
function width(columns) {
    const $ = getDictionary_1.default.getKey('width');
    return (0, forBreakpoints_1.default)(([breakpointName]) => ({
        // .width-0
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('0')}`]: {
            width: '0',
        },
        // .width-1/12
        ...(0, createArrayOf_1.default)(columns).reduce((css, i) => ({
            ...css,
            [`.${breakpointName}${$}${getDictionary_1.default.getKey(`${i + 1}/${columns}`)}`]: {
                width: (0, percentage_1.default)(i + 1, columns),
            },
        }), {}),
        // .width-100
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('100')}`]: {
            width: '100%',
        },
        // .width-auto
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('auto')}`]: {
            width: 'auto',
        },
    }));
}
exports.default = width;
