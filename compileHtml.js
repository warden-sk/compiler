"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 02.04.2024
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const compileReact_1 = __importDefault(require("./compileReact"));
const getIPv4Addresses_1 = __importDefault(require("./helpers/getIPv4Addresses"));
function compileHtml({ assets = [], outputPath, publicPath }) {
    const assetsToHtml = (assets, pattern, template) => {
        return assets
            .filter(asset => pattern.test(asset))
            .map(assetToUrl)
            .map(template);
    };
    const assetToUrl = (asset) => {
        const IPv4Addresses = (0, getIPv4Addresses_1.default)();
        const lastIPv4Address = IPv4Addresses[IPv4Addresses.length - 1];
        const updatedPublicPath = publicPath ? publicPath : `http://${lastIPv4Address}`;
        const url = /^https?:\/\//.test(asset) ? new URL(asset) : new URL(`${updatedPublicPath}/${asset}`);
        url.searchParams.set('date', (+new Date()).toString());
        return url.toString();
    };
    const css = assetsToHtml(assets, /\.css/, url => `<link href="${url}" rel="stylesheet" />`);
    const js = assetsToHtml(assets, /\.js/, url => `<script src="${url}"></script>`);
    const HTML_PATH = `${outputPath}/index.html`;
    let inputFile = '';
    try {
        inputFile = node_fs_1.default.readFileSync(`${outputPath}/index.js`).toString();
    }
    catch (error) { }
    let compiledReact = (0, compileReact_1.default)(inputFile);
    const head = [
        '<meta charset="utf-8" />',
        '<meta content="viewport-fit=cover, width=device-width" name="viewport" />',
    ];
    if (compiledReact.options) {
        compiledReact.options.description &&
            head.push(`<meta content="${compiledReact.options.description}" name="description" />`);
        compiledReact.options.icon &&
            compiledReact.options.iconType &&
            head.push(`<link href="${compiledReact.options.icon}" rel="icon" type="${compiledReact.options.iconType}" />`);
        compiledReact.options.title && head.push(`<title>${compiledReact.options.title}</title>`);
    }
    const html = `<!DOCTYPE html>
<html lang="sk">
  <head>
    ${css.join('\n    ')}
    ${head.join('\n    ')}
    <script>window.updatedAt=${+new Date()};</script>
  </head>
  <body>
    ${compiledReact.compiled}
    ${js.join('\n    ')}
  </body>
</html>
`;
    node_fs_1.default.writeFileSync(HTML_PATH, html);
    return html;
}
exports.default = compileHtml;
