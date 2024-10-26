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
const forBreakpoints_1 = __importDefault(require("../forBreakpoints"));
function order() {
    const $ = dictionary_1.default.getKey('order');
    return (0, forBreakpoints_1.default)(([breakpointName]) => ({
        [`.${breakpointName}${$}${dictionary_1.default.getKey('first')}`]: {
            order: '-999',
        },
        [`.${breakpointName}${$}${dictionary_1.default.getKey('last')}`]: {
            order: '999',
        },
    }));
}
exports.default = order;
