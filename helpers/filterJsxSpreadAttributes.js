"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const availableJsxAttributes_1 = __importDefault(require("../availableJsxAttributes"));
function filterJsxSpreadAttributes(attributes) {
    return Object.keys(attributes).reduce(($, key) => {
        const attribute = attributes[key];
        if (key === 'className') {
            return $;
        }
        if (key in availableJsxAttributes_1.default) {
            return $;
        }
        return { ...$, [key]: attribute };
    }, {});
}
exports.default = filterJsxSpreadAttributes;
