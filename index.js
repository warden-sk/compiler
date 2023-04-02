"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const cache_1 = __importDefault(require("./cache"));
const compileHtml_1 = __importDefault(require("./compileHtml"));
const cssTransformer_1 = __importDefault(require("./cssTransformer"));
const report_1 = __importDefault(require("./helpers/report"));
const sizeToReadable_1 = __importDefault(require("./helpers/sizeToReadable"));
const transformer_1 = __importDefault(require("./transformer"));
const compilerOptions = {
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    jsx: typescript_1.default.JsxEmit.React,
    module: typescript_1.default.ModuleKind.CommonJS,
    resolveJsonModule: true,
    strict: true,
    target: typescript_1.default.ScriptTarget.ESNext,
};
let isServerUsed = false;
function compile(filePath, options) {
    const startDate = +new Date();
    (0, report_1.default)(undefined, '\x1b[34m[CACHE]\x1b[0m', cache_1.default.size);
    const updatedOptions = {
        ...options,
        outputPath: path_1.default.resolve(options.outputPath ?? './public'),
    };
    // dokončiť
    if (!isServerUsed && updatedOptions.useServer) {
        const server = http_1.default.createServer((request, response) => {
            const url = new URL(request.url, 'file:');
            (0, report_1.default)('IN', '\x1b[34m[SERVER]\x1b[0m', url.pathname);
            try {
                const file = fs_1.default.readFileSync(path_1.default.resolve(updatedOptions.outputPath, `.${url.pathname}`));
                return response.end(file);
            }
            catch (error) {
                const file = fs_1.default.readFileSync(path_1.default.resolve(updatedOptions.outputPath, './index.html'));
                return response.end(file);
            }
        });
        server.listen(80, () => {
            (0, report_1.default)(undefined, '\x1b[34m[SERVER]\x1b[0m', 'http://127.0.0.1');
            isServerUsed = true;
        });
    }
    (0, compileHtml_1.default)(updatedOptions);
    const transformers = { before: [(0, cssTransformer_1.default)(updatedOptions), (0, transformer_1.default)()] };
    if (updatedOptions.reportErrors) {
        let compiled = '';
        const compilerHost = typescript_1.default.createCompilerHost({});
        compilerHost.writeFile = (fileName, text) => {
            compiled = text;
            cache_1.default.set(fileName, [Buffer.from(compiled), new Date()]);
        };
        const program = typescript_1.default.createProgram([filePath], compilerOptions, compilerHost);
        const emitResult = program.emit(undefined, undefined, undefined, undefined, updatedOptions.useTransformers ? (/compiler\//.test(filePath) ? undefined : transformers) : undefined);
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
    const { outputText: compiled } = typescript_1.default.transpileModule(fs_1.default.readFileSync(filePath).toString(), {
        compilerOptions,
        fileName: filePath,
        transformers: updatedOptions.useTransformers ? (/compiler\//.test(filePath) ? undefined : transformers) : undefined,
    });
    cache_1.default.set(filePath, [Buffer.from(compiled), new Date()]);
    const endDate = +new Date();
    (0, report_1.default)(undefined, '\x1b[34m[JS]\x1b[0m', (0, sizeToReadable_1.default)(compiled.length), `${((endDate - startDate) / 1000).toFixed(2)} second(s)`, `\x1b[32m${filePath}\x1b[0m`);
    return compiled;
}
exports.default = compile;
