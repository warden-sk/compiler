"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dictionary_1 = __importDefault(require("../dictionary"));
function getName(breakpointName, key) {
    return (value) => {
        return `.${breakpointName}${dictionary_1.default.getKey(key)}${dictionary_1.default.getKey(value)}`;
    };
}
exports.default = getName;
