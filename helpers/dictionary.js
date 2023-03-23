"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allowedJSXAttributes_1 = __importDefault(require("../allowedJSXAttributes"));
const dict_1 = __importDefault(require("./dict"));
const dictionary = new dict_1.default([
    ...Object.keys(allowedJSXAttributes_1.default).reduce(($, key) => [...$, key], []),
    ...Object.keys(allowedJSXAttributes_1.default).reduce(($, key) => [...$, ...allowedJSXAttributes_1.default[key]], []),
]);
exports.default = dictionary;
