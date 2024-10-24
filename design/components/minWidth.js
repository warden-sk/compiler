"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 06.05.2024
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createArrayOf_1 = __importDefault(require("../createArrayOf"));
const forBreakpoints_1 = __importDefault(require("../forBreakpoints"));
const getName_1 = __importDefault(require("../getName"));
const percentage_1 = __importDefault(require("../percentage"));
function minWidth(columns) {
    return (0, forBreakpoints_1.default)(([breakpointName]) => {
        const $ = (0, getName_1.default)(breakpointName, 'minWidth');
        return {
            [$('0')]: {
                minWidth: '0',
            },
            ...(0, createArrayOf_1.default)(columns).reduce((css, i) => {
                const f = `${i}/${columns}`;
                return {
                    ...css,
                    [$(f)]: {
                        minWidth: (0, percentage_1.default)(i, columns),
                    },
                };
            }, {}),
            [$('100')]: {
                minWidth: '100%',
            },
            [$('auto')]: {
                minWidth: 'auto',
            },
        };
    });
}
exports.default = minWidth;
