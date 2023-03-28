/*
 * Copyright 2023 Marek Kobida
 */

import fs from 'fs';
import compileReact from './compileReact';

interface Options {
  assets: string[];
  outputPath: string;
  publicPath?: string;
}

async function compileHtml({ assets, outputPath, publicPath }: Options) {
  const assetsToHtml = (assets: string[], pattern: RegExp, template: (asset: string) => string): string[] => {
    return assets
      .filter(asset => pattern.test(asset))
      .map(assetToUrl)
      .map(template);
  };

  const assetToUrl = (asset: string): string => {
    const updatedPublicPath = publicPath ? publicPath : `file://${outputPath}`;

    const url = /^https?:\/\//.test(asset) ? new URL(asset) : new URL(`${updatedPublicPath}/${asset}`);

    url.searchParams.set('date', (+new Date()).toString());

    return url.toString();
  };

  const css = assetsToHtml(assets, /\.css/, url => `<link href="${url}" rel="stylesheet" />`);
  const js = assetsToHtml(assets, /\.js/, url => `<script src="${url}"></script>`);

  const code = (await fs.promises.readFile(`${outputPath}/index.js`)).toString();

  const html = `<!DOCTYPE html>
<html>
  <head>
    ${css.join('\n    ')}
    <meta charset="utf-8" />
    <meta content="viewport-fit=cover, width=device-width" name="viewport" />
    <script>window.updatedAt=${+new Date()};</script>
  </head>
  <body>
    ${compileReact(code)}
    ${js.join('\n    ')}
  </body>
</html>
`;

  await fs.promises.writeFile(`${outputPath}/index.html`, html);
}

export default compileHtml;
