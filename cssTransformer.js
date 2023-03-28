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
                            // dokončiť
                            const FILE_PATH = sourceFile.fileName.replace(/\/[^\/]+$/, '');
                            const CSS_PATH = path_1.default.resolve(FILE_PATH, expression.text);
                            if (cache.has(CSS_PATH)) {
                            }
                            else {
                                cache.set(CSS_PATH, fs_1.default.readFileSync(CSS_PATH));
                            }
                            const DESIGN_CSS_PATH = './node_modules/@warden-sk/design/index.css';
                            if (cache.has(DESIGN_CSS_PATH)) {
                                (0, report_1.default)(undefined, `🟧 ${CSS_PATH}`, (0, sizeToReadable_1.default)(cache.get(CSS_PATH).length));
                            }
                            else {
                                cache.set(DESIGN_CSS_PATH, fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), DESIGN_CSS_PATH)));
                                (0, report_1.default)(undefined, `🟩 ${CSS_PATH}`, (0, sizeToReadable_1.default)(cache.get(CSS_PATH).length));
                            }
                            fs_1.default.writeFileSync(path_1.default.resolve(process.cwd(), options.cssOutputPath), [...cache].reduce((l, r) => Buffer.concat([l, r[1]]), Buffer.alloc(0)));
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
