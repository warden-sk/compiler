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
const cache_1 = __importDefault(require("./cache"));
const report_1 = __importDefault(require("./helpers/report"));
const sizeToReadable_1 = __importDefault(require("./helpers/sizeToReadable"));
function compileCss(options) {
    cache_1.default.set(options.path, [fs_1.default.readFileSync(options.path), new Date()]);
    const DESIGN_CSS_PATH = './node_modules/@warden-sk/compiler/design.css';
    if (cache_1.default.has(DESIGN_CSS_PATH)) {
    }
    else {
        cache_1.default.set(DESIGN_CSS_PATH, [fs_1.default.readFileSync(DESIGN_CSS_PATH), new Date()]);
    }
    fs_1.default.writeFileSync(path_1.default.resolve(options.outputPath, './index.css'), Object.keys(cache_1.default.storage)
        .filter(l => /\.css/.test(l))
        .reduce((l, r) => l + cache_1.default.storage[r][0], ''));
    (0, report_1.default)(undefined, '\x1b[34m[CSS]\x1b[0m', (0, sizeToReadable_1.default)(cache_1.default.get(options.path)[0].length), `\x1b[32m${options.path}\x1b[0m`);
}
exports.default = compileCss;
