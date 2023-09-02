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
function opacity() {
    const $ = getDictionary_1.default.getKey('opacity');
    return (0, forBreakpoints_1.default)(([breakpointName]) => ({
        // .opacity-0
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('0')}`]: {
            opacity: '0',
        },
        // .opacity-25
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('25')}`]: {
            opacity: '0.25',
        },
        // .opacity-50
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('50')}`]: {
            opacity: '0.5',
        },
        // .opacity-75
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('75')}`]: {
            opacity: '0.75',
        },
        // .opacity-100
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('100')}`]: {
            opacity: '1',
        },
    }));
}
exports.default = opacity;
