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
function height() {
    const $ = getDictionary_1.default.getKey('height');
    return (0, forBreakpoints_1.default)(([breakpointName]) => ({
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('0')}`]: {
            height: '0',
        },
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('25')}`]: {
            height: '25%',
        },
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('50')}`]: {
            height: '50%',
        },
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('75')}`]: {
            height: '75%',
        },
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('100')}`]: {
            height: '100%',
        },
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('auto')}`]: {
            height: 'auto',
        },
    }));
}
exports.default = height;
