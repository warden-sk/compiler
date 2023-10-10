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
function flexBasis(columns) {
    const $ = getDictionary_1.default.getKey('flexBasis');
    return (0, forBreakpoints_1.default)(([breakpointName]) => ({
        // .flex-basis-0
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('0')}`]: {
            flexBasis: '0',
        },
        // .flex-basis-1/12
        ...(0, createArrayOf_1.default)(columns).reduce((css, i) => ({
            ...css,
            [`.${breakpointName}${$}${getDictionary_1.default.getKey(`${i}/${columns}`)}`]: {
                flexBasis: (0, percentage_1.default)(i, columns),
            },
        }), {}),
        // .flex-basis-100
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('100')}`]: {
            flexBasis: '100%',
        },
        // .flex-basis-auto
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('auto')}`]: {
            flexBasis: 'auto',
        },
    }));
}
exports.default = flexBasis;
