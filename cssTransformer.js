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
const cache_1 = __importDefault(require("./cache"));
const report_1 = __importDefault(require("./helpers/report"));
const sizeToReadable_1 = __importDefault(require("./helpers/sizeToReadable"));
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
                            cache_1.default.set(CSS_PATH, [fs_1.default.readFileSync(CSS_PATH), new Date()]);
                            const DESIGN_CSS_PATH = './node_modules/@warden-sk/compiler/design.css';
                            if (cache_1.default.has(DESIGN_CSS_PATH)) {
                            }
                            else {
                                cache_1.default.set(DESIGN_CSS_PATH, [fs_1.default.readFileSync(DESIGN_CSS_PATH), new Date()]);
                            }
                            fs_1.default.writeFileSync(path_1.default.resolve(options.outputPath, './index.css'), Object.keys(cache_1.default.storage)
                                .filter(l => /\.css/.test(l))
                                .reduce((l, r) => l + cache_1.default.storage[r][0], ''));
                            (0, report_1.default)(undefined, '\x1b[34m[CSS]\x1b[0m', (0, sizeToReadable_1.default)(cache_1.default.get(CSS_PATH)[0].length), `\x1b[32m${CSS_PATH}\x1b[0m`);
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
