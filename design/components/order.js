"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 04.04.2024
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getDictionary_1 = __importDefault(require("../../getDictionary"));
const forBreakpoints_1 = __importDefault(require("../forBreakpoints"));
function order() {
    const $ = getDictionary_1.default.getKey('order');
    return (0, forBreakpoints_1.default)(([breakpointName]) => ({
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('first')}`]: {
            order: '-999',
        },
        [`.${breakpointName}${$}${getDictionary_1.default.getKey('last')}`]: {
            order: '999',
        },
    }));
}
exports.default = order;
