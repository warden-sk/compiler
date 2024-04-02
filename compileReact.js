"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 02.04.2024
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_vm_1 = __importDefault(require("node:vm"));
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const invariant_1 = __importDefault(require("./helpers/validation/invariant"));
const isArray_1 = __importDefault(require("./helpers/validation/isArray"));
const isError_1 = __importDefault(require("./helpers/validation/isError"));
const isObject_1 = __importDefault(require("./helpers/validation/isObject"));
const isString_1 = __importDefault(require("./helpers/validation/isString"));
function compileReact(code) {
    const context = { TextEncoder, URL, exports, module: { exports }, require }, script = new node_vm_1.default.Script(code);
    try {
        script.runInNewContext(context);
        const output = context.module.exports.default;
        if ((0, isArray_1.default)(output)) {
            (0, invariant_1.default)(react_1.default.isValidElement(output[0]), 'The output is not a valid `React` component.');
            (0, invariant_1.default)((0, isObject_1.default)(output[1]), 'The output is not a valid `Object` type.');
            return { compiled: server_1.default.renderToString(output[0]), options: output[1] };
        }
        (0, invariant_1.default)(react_1.default.isValidElement(output), 'The output is not a valid `React` component.');
        return { compiled: server_1.default.renderToString(output) };
    }
    catch (error) {
        if ((0, isError_1.default)(error)) {
            return { compiled: error.message };
        }
        if ((0, isString_1.default)(error)) {
            return { compiled: error };
        }
        return { compiled: 'Error' };
    }
}
exports.default = compileReact;
