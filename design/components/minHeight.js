"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forBreakpoints_1 = __importDefault(require("../forBreakpoints"));
const getName_1 = __importDefault(require("../getName"));
function minHeight() {
    return (0, forBreakpoints_1.default)(([breakpointName]) => {
        const $ = (0, getName_1.default)(breakpointName, 'minHeight');
        return {
            [$('25')]: {
                minHeight: '25%',
            },
            [$('50')]: {
                minHeight: '50%',
            },
            [$('75')]: {
                minHeight: '75%',
            },
            [$('100')]: {
                minHeight: '100%',
            },
        };
    });
}
exports.default = minHeight;
