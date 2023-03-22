/*
 * Copyright 2023 Marek Kobida
 */

import fs from 'fs';

const assetsToHtml = (assets: string[], pattern: RegExp, template: (asset: string) => string): string[] => {
  return assets
    .filter(asset => pattern.test(asset))
    .map(assetToUrl)
    .map(template);
};

const assetToUrl = (asset: string): string => {
  const url = /^https?:\/\//.test(asset) ? new URL(asset) : new URL(`file://${asset}`);

  url.searchParams.set('date', (+new Date()).toString());

  return url.toString();
};

interface P {
  assets: string[];
  name: string;
  outputPath: string;
  template: (code: string) => [string, string][] | string;
}

async function htmlPlugin({ assets, name, outputPath, template }: P) {
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

export default htmlPlugin;