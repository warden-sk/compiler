"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forBreakpoints_1 = require("../forBreakpoints");
const forBreakpoints_2 = __importDefault(require("../forBreakpoints"));
const getName_1 = __importDefault(require("../getName"));
function maxWidth() {
    return (0, forBreakpoints_2.default)(([breakpointName]) => {
        const $ = (0, getName_1.default)(breakpointName, 'maxWidth');
        return {
            ...forBreakpoints_1.breakpoints.reduce((css, [left, right]) => {
                return {
                    ...css,
                    [$(left.replace(/\\/g, ''))]: {
                        maxWidth: right,
                    },
                };
            }, {}),
        };
    });
}
exports.default = maxWidth;
