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
const report_1 = __importDefault(require("./helpers/report"));
const sizeToReadable_1 = __importDefault(require("./helpers/sizeToReadable"));
async function compileHtml({ assets, outputPath, publicPath }) {
    const assetsToHtml = (assets, pattern, template) => {
        return assets
            .filter(asset => pattern.test(asset))
            .map(assetToUrl)
            .map(template);
    };
    const assetToUrl = (asset) => {
        const updatedPublicPath = publicPath ? publicPath : `file://${outputPath}`;
        const url = /^https?:\/\//.test(asset) ? new URL(asset) : new URL(`${updatedPublicPath}/${asset}`);
        url.searchParams.set('date', (+new Date()).toString());
        return url.toString();
    };
    const css = assetsToHtml(assets, /\.css/, url => `<link href="${url}" rel="stylesheet" />`);
    const js = assetsToHtml(assets, /\.js/, url => `<script src="${url}"></script>`);
    const code = (await fs_1.default.promises.readFile(`${outputPath}/index.js`)).toString();
    const HTML_PATH = `${outputPath}/index.html`;
    const html = `<!DOCTYPE html>
<html>
  <head>
    ${css.join('\n    ')}
    <meta charset="utf-8" />
    <meta content="viewport-fit=cover, width=device-width" name="viewport" />
    <script>window.updatedAt=${+new Date()};</script>
  </head>
  <body>
    ${(0, compileReact_1.default)(code)}
    ${js.join('\n    ')}
  </body>
</html>
`;
    await fs_1.default.promises.writeFile(HTML_PATH, html);
    (0, report_1.default)(undefined, '🟢', HTML_PATH, (0, sizeToReadable_1.default)(html.length));
}
exports.default = compileHtml;
