"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const availableJsxAttributes_1 = __importDefault(require("../availableJsxAttributes"));
const dictionary_1 = __importDefault(require("../dictionary"));
const decodeResponsiveClassName_1 = __importDefault(require("./decodeResponsiveClassName"));
function decodeJsxSpreadAttributes(attributes) {
    return Object.keys(attributes).reduce(($, key) => {
        const attribute = attributes[key];
        if (key === 'className') {
            return [...$, attribute];
        }
        if (key in availableJsxAttributes_1.default) {
            return [...$, (0, decodeResponsiveClassName_1.default)(dictionary_1.default.getKey(key), attribute)];
        }
        return $;
    }, []);
}
exports.default = decodeJsxSpreadAttributes;
