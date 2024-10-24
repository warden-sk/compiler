"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const report_1 = __importDefault(require("./helpers/report"));
const sizeToReadable_1 = __importDefault(require("./helpers/sizeToReadable"));
function compileCss(options) {
    if (options.cache) {
        /**
         * 1
         */
        const designFilePath = './node_modules/@warden-sk/compiler/design.css';
        if (!options.cache.has(designFilePath)) {
            const designFile = node_fs_1.default.readFileSync(designFilePath);
            options.cache.set(designFilePath, [designFile, new Date()]);
            (0, report_1.default)(undefined, '\x1b[34m[CSS]\x1b[0m', (0, sizeToReadable_1.default)(designFile.length), `\x1b[32m${designFilePath}\x1b[0m`);
        }
        /**
         * 2
         */
        const cssFile = node_fs_1.default.readFileSync(options.path);
        options.cache.set(options.path, [cssFile, new Date()]);
        (0, report_1.default)(undefined, '\x1b[34m[CSS]\x1b[0m', (0, sizeToReadable_1.default)(cssFile.length), `\x1b[32m${options.path}\x1b[0m`);
        /**
         * 3
         */
        node_fs_1.default.writeFileSync(node_path_1.default.resolve(options.outputPath, './index.css'), Object.keys(options.cache.storage)
            .filter(l => /\.css/.test(l))
            .reduce((l, r) => l + options.cache.storage[r][0], ''));
    }
}
exports.default = compileCss;
