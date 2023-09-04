/*
 * Copyright 2023 Marek Kobida
 */

import fs from 'node:fs';
import compileReact from './compileReact';
import getIPv4Addresses from './helpers/getIPv4Addresses';

interface Options {
  assets?: string[];
  outputPath: string;
  publicPath?: string;
}

function compileHtml({ assets = [], outputPath, publicPath }: Options): string {
  const assetsToHtml = (assets: string[], pattern: RegExp, template: (asset: string) => string): string[] => {
    return assets
      .filter(asset => pattern.test(asset))
      .map(assetToUrl)
      .map(template);
  };

  const assetToUrl = (asset: string): string => {
    const IPv4Addresses = getIPv4Addresses();

    const lastIPv4Address = IPv4Addresses[IPv4Addresses.length - 1];

    const updatedPublicPath = publicPath ? publicPath : `http://${lastIPv4Address}`;

    const url = /^https?:\/\//.test(asset) ? new URL(asset) : new URL(`${updatedPublicPath}/${asset}`);

    url.searchParams.set('date', (+new Date()).toString());

    return url.toString();
  };

  const css = assetsToHtml(assets, /\.css/, url => `<link href="${url}" rel="stylesheet" />`);
  const js = assetsToHtml(assets, /\.js/, url => `<script src="${url}"></script>`);

  const HTML_PATH = `${outputPath}/index.html`;

  let template: [string, string][] | string = '';

  try {
    template = compileReact(fs.readFileSync(`${outputPath}/index.js`).toString());
  } catch (error) {}

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

  fs.writeFileSync(HTML_PATH, html);

  return html;
}

export default compileHtml;
