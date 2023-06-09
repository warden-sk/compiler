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
const compileHtml_1 = __importDefault(require("./compileHtml"));
const getIPv4Addresses_1 = __importDefault(require("./helpers/getIPv4Addresses"));
const report_1 = __importDefault(require("./helpers/report"));
const sizeToReadable_1 = __importDefault(require("./helpers/sizeToReadable"));
const cssTransformer_1 = __importDefault(require("./transformers/cssTransformer"));
const jsTransformer_1 = __importDefault(require("./transformers/jsTransformer"));
const compilerOptions = {
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    jsx: typescript_1.default.JsxEmit.React,
    module: typescript_1.default.ModuleKind.CommonJS,
    resolveJsonModule: true,
    strict: true,
    target: typescript_1.default.ScriptTarget.ESNext,
};
let isFirstCompilation = true;
const d = `     _                _                                  _
  __| | _____   _____| | ___  _ __  _ __ ___   ___ _ __ | |_
 / _\` |/ _ \\ \\ / / _ \\ |/ _ \\| '_ \\| '_ \` _ \\ / _ \\ '_ \\| __|
| (_| |  __/\\ V /  __/ | (_) | |_) | | | | | |  __/ | | | |_
 \\__,_|\\___| \\_/ \\___|_|\\___/| .__/|_| |_| |_|\\___|_| |_|\\__|
                             |_|`;
const p = `                     _            _   _
 _ __  _ __ ___   __| |_   _  ___| |_(_) ___  _ __
| '_ \\| '__/ _ \\ / _\` | | | |/ __| __| |/ _ \\| '_ \\
| |_) | | | (_) | (_| | |_| | (__| |_| | (_) | | | |
| .__/|_|  \\___/ \\__,_|\\__,_|\\___|\\__|_|\\___/|_| |_|
|_|`;
function compile(filePath, options) {
    const startDate = +new Date();
    const updatedOptions = {
        ...options,
        outputPath: path_1.default.resolve(options.outputPath ?? './public'),
    };
    if (isFirstCompilation) {
        (0, report_1.default)(undefined, `
  ____                       _       _     _     ____   ___ ____  _____
 / ___|___  _ __  _   _ _ __(_) __ _| |__ | |_  |___ \\ / _ \\___ \\|___ /
| |   / _ \\| '_ \\| | | | '__| |/ _\` | '_ \\| __|   __) | | | |__) | |_ \\
| |__| (_) | |_) | |_| | |  | | (_| | | | | |_   / __/| |_| / __/ ___) |
 \\____\\___/| .__/ \\__, |_|  |_|\\__, |_| |_|\\__| |_____|\\___/_____|____/
           |_|    |___/        |___/
 __  __                _      _  __     _     _     _
|  \\/  | __ _ _ __ ___| | __ | |/ /___ | |__ (_) __| | __ _
| |\\/| |/ _\` | '__/ _ \\ |/ / | ' // _ \\| '_ \\| |/ _\` |/ _\` |
| |  | | (_| | | |  __/   <  | . \\ (_) | |_) | | (_| | (_| |
|_|  |_|\\__,_|_|  \\___|_|\\_\\ |_|\\_\\___/|_.__/|_|\\__,_|\\__,_|
${process.env.NODE_ENV === 'production' ? p : d}
`);
        if (updatedOptions.useServer) {
            // Content-Type
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
                const IPv4Addresses = (0, getIPv4Addresses_1.default)();
                (0, report_1.default)(undefined, '\x1b[34m[SERVER]\x1b[0m', IPv4Addresses.map(address => `http://${address}`).join(', '));
            });
        }
        isFirstCompilation = false;
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
    updatedOptions.cache?.set(filePath, [Buffer.from(compiled), new Date()]);
    const endDate = +new Date();
    (0, report_1.default)(undefined, '\x1b[34m[JS]\x1b[0m', (0, sizeToReadable_1.default)(compiled.length), `${((endDate - startDate) / 1000).toFixed(2)} second(s)`, `\x1b[32m${filePath}\x1b[0m`);
    return compiled;
}
exports.default = compile;
