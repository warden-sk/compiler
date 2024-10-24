"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 03.04.2024
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const availableJsxAttributes_1 = __importDefault(require("./availableJsxAttributes"));
const dictionary_1 = __importDefault(require("./helpers/dictionary"));
const λ = __importStar(require("./\u03BB"));
const getDictionary = new dictionary_1.default([
    ...λ.keys(availableJsxAttributes_1.default).reduce(($, key) => [...$, key], []),
    ...λ.keys(availableJsxAttributes_1.default).reduce(($, key) => [...$, ...availableJsxAttributes_1.default[key]], []),
]);
exports.default = getDictionary;
