"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const compileCss_1 = __importDefault(require("./compileCss"));
const cssTransformer = (options) => {
    return context => {
        return sourceFile => {
            const visitor = node => {
                if (typescript_1.default.isImportDeclaration(node)) {
                    const expression = node.moduleSpecifier;
                    if (typescript_1.default.isStringLiteral(expression)) {
                        if (/\.css/.test(expression.text)) {
                            const FILE_PATH = sourceFile.fileName.replace(/\/[^\/]+$/, '');
                            const CSS_PATH = path_1.default.resolve(FILE_PATH, expression.text);
                            (0, compileCss_1.default)({ ...options, path: CSS_PATH });
                        }
                    }
                }
                return typescript_1.default.visitEachChild(node, visitor, context);
            };
            return typescript_1.default.visitNode(sourceFile, visitor);
        };
    };
};
exports.default = cssTransformer;
