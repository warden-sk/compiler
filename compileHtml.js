"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
async function compileHtml({ assets, name, outputPath, publicPath, template }) {
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
    const updatedCode = template(`${code}\nmodule.exports = xyz;`);
    if (typeof updatedCode === 'string') {
        const html = `<!DOCTYPE html>
<html>
  <head>
    ${css.join('\n    ')}
    <meta charset="utf-8" />
    <meta content="viewport-fit=cover, width=device-width" name="viewport" />
    <script>window.updatedAt=${+new Date()};</script>
    <title>${name}</title>
  </head>
  <body>
    ${template(`${code}\nmodule.exports = xyz;`)}
    ${js.join('\n    ')}
  </body>
</html>
`;
        await fs_1.default.promises.writeFile(`${outputPath}/index.html`, html);
    }
}
exports.default = compileHtml;
