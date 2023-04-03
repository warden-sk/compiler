"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const compileReact_1 = __importDefault(require("./compileReact"));
const getIPv4Addresses_1 = __importDefault(require("./getIPv4Addresses"));
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
    let template = '';
    try {
        template = (0, compileReact_1.default)(fs_1.default.readFileSync(`${outputPath}/index.js`).toString());
    }
    catch (error) { }
    const html = `<!DOCTYPE html>
<html>
  <head>
    ${css.join('\n    ')}
    <meta charset="utf-8" />
    <meta content="viewport-fit=cover, width=device-width" name="viewport" />
    <script>window.updatedAt=${+new Date()};</script>
  </head>
  <body>
    ${template}
    ${js.join('\n    ')}
  </body>
</html>
`;
    fs_1.default.writeFileSync(HTML_PATH, html);
    // report(undefined, '\x1b[34m[HTML]\x1b[0m', sizeToReadable(html.length), `\x1b[32m${HTML_PATH}\x1b[0m`);
    return html;
}
exports.default = compileHtml;
