"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
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
const node_fs_1 = __importDefault(require("node:fs"));
const node_http_1 = __importDefault(require("node:http"));
const node_path_1 = __importDefault(require("node:path"));
const typescript_1 = __importDefault(require("typescript"));
const compileHtml_1 = __importDefault(require("./compileHtml"));
const getIPv4Addresses_1 = __importDefault(require("./helpers/getIPv4Addresses"));
const report_1 = __importDefault(require("./helpers/report"));
const sizeToReadable_1 = __importDefault(require("./helpers/sizeToReadable"));
const isObject_1 = __importDefault(require("./helpers/validation/isObject"));
const cssTransformer_1 = __importDefault(require("./transformers/cssTransformer"));
const jsTransformer_1 = __importDefault(require("./transformers/jsTransformer"));
const λ = __importStar(require("./\u03BB"));
const compilerOptions = {
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    jsx: typescript_1.default.JsxEmit.React,
    module: typescript_1.default.ModuleKind.CommonJS,
    strict: true,
    target: typescript_1.default.ScriptTarget.ESNext,
};
let isFirstCompilation = true, projects = new Map();
function compile(filePath, options) {
    const startDate = +new Date();
    const updatedOptions = {
        ...options,
        outputPath: node_path_1.default.resolve(options.outputPath ?? './public'),
    };
    projects.set(updatedOptions.outputPath, +new Date());
    if (isFirstCompilation) {
        if (updatedOptions.useServer) {
            // dokončiť – Content-Type
            const server = node_http_1.default.createServer((request, response) => {
                // const url = new URL(request.url!, 'file:');
                // report('IN', '\x1b[34m[SERVER]\x1b[0m', url.pathname);
                response.setHeader('Access-Control-Allow-Origin', '*');
                response.setHeader('Content-Type', 'application/json; charset=utf-8');
                response.end(λ.encodeJSON([...projects]));
            });
            server.listen('8080', () => {
                const IPv4Addresses = (0, getIPv4Addresses_1.default)(), address = server.address(), port = (0, isObject_1.default)(address) ? address.port : address;
                (0, report_1.default)(undefined, '\x1b[34m[SERVER]\x1b[0m', IPv4Addresses.map(address => `https://${address}:${port}`).join(', '));
            });
            isFirstCompilation = false;
        }
    }
    (0, compileHtml_1.default)(updatedOptions);
    const transformers = { before: [(0, cssTransformer_1.default)(updatedOptions), (0, jsTransformer_1.default)()] };
    if (updatedOptions.reportErrors) {
        let compiled = '';
        const compilerHost = typescript_1.default.createCompilerHost({});
        compilerHost.writeFile = (fileName, text) => {
            compiled = text;
            updatedOptions.cache?.set(fileName, [Buffer.from(compiled), new Date()]);
        };
        const program = typescript_1.default.createProgram([filePath], compilerOptions, compilerHost);
        const emitResult = program.emit(undefined, undefined, undefined, undefined, updatedOptions.useTransformers ?
            /compiler\//.test(filePath) ?
                undefined
                : transformers
            : undefined);
        const diagnostics = typescript_1.default.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
        const endDate = +new Date();
        if (diagnostics.length > 0) {
            for (const diagnostic of diagnostics) {
                if (diagnostic.file) {
                    const message = typescript_1.default.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
                    (0, report_1.default)(undefined, '\x1b[34m[JS]\x1b[0m', (0, sizeToReadable_1.default)(compiled.length), `${((endDate - startDate) / 1000).toFixed(2)} second(s)`, `\x1b[31m${diagnostic.file.fileName}\n\n${message}\n\x1b[0m`);
                }
            }
        }
        else {
            (0, report_1.default)(undefined, '\x1b[34m[JS]\x1b[0m', (0, sizeToReadable_1.default)(compiled.length), `${((endDate - startDate) / 1000).toFixed(2)} second(s)`, `\x1b[32m${filePath}\x1b[0m`);
        }
        return compiled;
    }
    const { outputText: compiled } = typescript_1.default.transpileModule(node_fs_1.default.readFileSync(filePath).toString(), {
        compilerOptions,
        fileName: filePath,
        transformers: updatedOptions.useTransformers ?
            /compiler\//.test(filePath) ?
                undefined
                : transformers
            : undefined,
    });
    updatedOptions.cache?.set(filePath, [Buffer.from(compiled), new Date()]);
    const endDate = +new Date();
    (0, report_1.default)(undefined, '\x1b[34m[JS]\x1b[0m', (0, sizeToReadable_1.default)(compiled.length), `${((endDate - startDate) / 1000).toFixed(2)} second(s)`, `\x1b[32m${filePath}\x1b[0m`);
    return compiled;
}
exports.default = compile;
