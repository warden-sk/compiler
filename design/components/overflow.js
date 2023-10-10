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
function overflow() {
    return (0, forBreakpoints_1.default)(([breakpointName]) => {
        const $ = (0, getName_1.default)(breakpointName, 'overflow');
        return {
            [$('auto')]: {
                overflow: 'auto',
            },
            [$('hidden')]: {
                overflow: 'hidden',
            },
        };
    });
}
exports.default = overflow;
