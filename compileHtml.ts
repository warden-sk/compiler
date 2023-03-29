/*
 * Copyright 2023 Marek Kobida
 */

import fs from 'fs';
import report from './helpers/report';
import sizeToReadable from './helpers/sizeToReadable';

interface Options {
  assets?: string[];
  outputPath?: string;
  publicPath?: string;
  template?: string;
}

function compileHtml({ assets = [], outputPath, publicPath, template }: Options): string {
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
    ${template}
    ${js.join('\n    ')}
  </body>
</html>
`;

  fs.writeFileSync(HTML_PATH, html);

  report(undefined, '🟢', '\x1b[33m[HTML]\x1b[0m', HTML_PATH, sizeToReadable(html.length));

  return html;
}

export default compileHtml;
