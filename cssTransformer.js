"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const report_1 = __importDefault(require("./helpers/report"));
const sizeToReadable_1 = __importDefault(require("./helpers/sizeToReadable"));
const cache = new Map();
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
                            const date = new Date();
                            date.setSeconds(date.getSeconds() + 30);
                            if (cache.has(CSS_PATH) && cache.get(CSS_PATH)[1] > new Date()) {
                            }
                            else {
                                cache.set(CSS_PATH, [fs_1.default.readFileSync(CSS_PATH), date]);
                            }
                            const DESIGN_CSS_PATH = '/Users/marekkobida/Documents/warden/design/packages/design/index.css';
                            if (cache.has(DESIGN_CSS_PATH)) {
                            }
                            else {
                                cache.set(DESIGN_CSS_PATH, [fs_1.default.readFileSync(DESIGN_CSS_PATH), date]);
                            }
                            if (options.outputPath) {
                                fs_1.default.writeFileSync(path_1.default.resolve(options.outputPath, './index.css'), [...cache].reduce((l, r) => l + r[1][0], ''));
                            }
                            (0, report_1.default)(undefined, '\x1b[34m[CSS]\x1b[0m', (0, sizeToReadable_1.default)(cache.get(CSS_PATH)[0].length), `\x1b[32m${CSS_PATH}\x1b[0m`);
                            return;
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
