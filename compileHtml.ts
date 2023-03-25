/*
 * Copyright 2023 Marek Kobida
 */

import fs from 'fs';

interface Options {
  assets: string[];
  name: string;
  outputPath: string;
  publicPath?: string;
  template: (code: string) => [string, string][] | string;
}

async function compileHtml({ assets, name, outputPath, publicPath, template }: Options) {
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

    await fs.promises.writeFile(`${outputPath}/index.html`, html);
  }
}

export default compileHtml;
