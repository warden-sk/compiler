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
const createArrayOf_1 = __importDefault(require("../createArrayOf"));
const forBreakpoints_1 = __importDefault(require("../forBreakpoints"));
const percentage_1 = __importDefault(require("../percentage"));
function flexBasis(columns) {
    const $ = dictionary_1.default.getKey('flexBasis');
    return (0, forBreakpoints_1.default)(([breakpointName]) => ({
        // .flex-basis-0
        [`.${breakpointName}${$}${dictionary_1.default.getKey('0')}`]: {
            flexBasis: '0',
        },
        // .flex-basis-1/12
        ...(0, createArrayOf_1.default)(columns).reduce((css, i) => ({
            ...css,
            [`.${breakpointName}${$}${dictionary_1.default.getKey(`${i}/${columns}`)}`]: {
                flexBasis: (0, percentage_1.default)(i, columns),
            },
        }), {}),
        // .flex-basis-100
        [`.${breakpointName}${$}${dictionary_1.default.getKey('100')}`]: {
            flexBasis: '100%',
        },
        // .flex-basis-auto
        [`.${breakpointName}${$}${dictionary_1.default.getKey('auto')}`]: {
            flexBasis: 'auto',
        },
    }));
}
exports.default = flexBasis;
