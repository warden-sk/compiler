"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dictionary_1 = __importDefault(require("../dictionary"));
const isObject_1 = __importDefault(require("./isObject"));
function decodeResponsiveClassName(className, encodedResponsiveClassName) {
    const decodedResponsiveClassNames = [];
    // T
    if (typeof encodedResponsiveClassName === 'string') {
        decodedResponsiveClassNames.push(`${className}${dictionary_1.default.getKey(encodedResponsiveClassName)}`);
    }
    // [T]
    else if (Array.isArray(encodedResponsiveClassName)) {
        decodedResponsiveClassNames.push(`${className}${dictionary_1.default.getKey(encodedResponsiveClassName[0])}`);
        // [T, { [breakpointName: string]: T }]
        if (encodedResponsiveClassName[1]) {
            for (const breakpointName in encodedResponsiveClassName[1]) {
                decodedResponsiveClassNames.push(`${breakpointName}${className}${dictionary_1.default.getKey(encodedResponsiveClassName[1][breakpointName])}`);
            }
        }
    }
    // { [breakpointName: string]: T }
    else if ((0, isObject_1.default)(encodedResponsiveClassName)) {
        for (const breakpointName in encodedResponsiveClassName) {
            decodedResponsiveClassNames.push(`${breakpointName}${className}${dictionary_1.default.getKey(encodedResponsiveClassName[breakpointName])}`);
        }
    }
    return decodedResponsiveClassNames;
}
exports.default = decodeResponsiveClassName;
