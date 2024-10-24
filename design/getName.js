"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getDictionary_1 = __importDefault(require("../getDictionary"));
function getName(breakpointName, key) {
    return (value) => {
        return `.${breakpointName}${getDictionary_1.default.getKey(key)}${getDictionary_1.default.getKey(value)}`;
    };
}
exports.default = getName;
