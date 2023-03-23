"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allowedJSXAttributes_1 = __importDefault(require("../allowedJSXAttributes"));
const decodeResponsiveClassName_1 = __importDefault(require("./decodeResponsiveClassName"));
const dictionary_1 = __importDefault(require("./dictionary"));
function decodeJSXSpreadAttributes(attributes) {
    return Object.keys(attributes).reduce(($, key) => {
        const attribute = attributes[key];
        if (key === 'className') {
            return [...$, attribute];
        }
        if (key in allowedJSXAttributes_1.default) {
            return [...$, (0, decodeResponsiveClassName_1.default)(dictionary_1.default.getKey(key), attribute)];
        }
        return $;
    }, []);
}
exports.default = decodeJSXSpreadAttributes;
