"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isObject_1 = __importDefault(require("./validation/isObject"));
function decodeClassName(...encodedClassNames) {
    const decodedClassNames = [];
    for (const encodedClassName of encodedClassNames) {
        // EncodedClassName[]
        if (Array.isArray(encodedClassName)) {
            const decodedClassName = decodeClassName(...encodedClassName);
            decodedClassNames.push(decodedClassName);
        }
        // number
        else if (typeof encodedClassName === 'number') {
            decodedClassNames.push(`${encodedClassName}`);
        }
        // string
        else if (typeof encodedClassName === 'string') {
            decodedClassNames.push(encodedClassName);
        }
        // { [decodedClassName: string]: Falsy | boolean }
        else if ((0, isObject_1.default)(encodedClassName)) {
            for (const decodedClassName in encodedClassName) {
                if (encodedClassName[decodedClassName]) {
                    decodedClassNames.push(decodedClassName);
                }
            }
        }
    }
    return decodedClassNames.filter(decodedClassName => !!decodedClassName).join(' ');
}
exports.default = decodeClassName;
