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
function minHeight() {
    const $ = getDictionary_1.default.getKey('minHeight');
    return (0, forBreakpoints_1.default)(([breakpointName]) => ({
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('25')}`]: {
            minHeight: '25%',
        },
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('50')}`]: {
            minHeight: '50%',
        },
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('75')}`]: {
            minHeight: '75%',
        },
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('100')}`]: {
            minHeight: '100%',
        },
    }));
}
exports.default = minHeight;
