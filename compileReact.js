"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_vm_1 = __importDefault(require("node:vm"));
const server_1 = __importDefault(require("react-dom/server"));
function compileReact(code) {
    const context = { URL, exports, module: { exports }, require };
    const script = new node_vm_1.default.Script(code);
    try {
        script.runInNewContext(context);
        const $ = context.module.exports.default;
        if (Array.isArray($)) {
            return $.map(([l, r]) => [l, server_1.default.renderToString(r)]);
        }
        return server_1.default.renderToString($);
    }
    catch (error) {
        return error instanceof Error ? error.message : 'Error';
    }
}
exports.default = compileReact;
