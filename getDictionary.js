"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const availableJsxAttributes_1 = __importDefault(require("./availableJsxAttributes"));
const dictionary_1 = __importDefault(require("./helpers/dictionary"));
const getDictionary = new dictionary_1.default([
    ...Object.keys(availableJsxAttributes_1.default).reduce(($, key) => [...$, key], []),
    ...Object.keys(availableJsxAttributes_1.default).reduce(($, key) => [...$, ...availableJsxAttributes_1.default[key]], []),
]);
exports.default = getDictionary;
