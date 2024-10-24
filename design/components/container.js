"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forBreakpoints_1 = __importDefault(require("../forBreakpoints"));
function container() {
    return (0, forBreakpoints_1.default)(breakpoint => breakpoint[0] ?
        {
            '.container': {
                maxWidth: breakpoint[1],
            },
        }
        : {
            '.container': {
                width: '100%',
            },
        });
}
exports.default = container;
