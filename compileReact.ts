/*
 * Copyright 2023 Marek Kobida
 */

import vm from 'node:vm';
import ReactDOMServer from 'react-dom/server';

function compileReact(code: string): [string, string][] | string {
  const context = { URL, exports, module: { exports }, require } as const;

  const script = new vm.Script(code);

  try {
    script.runInNewContext(context);

    const $ = context.module.exports.default;

    if (Array.isArray($)) {
      return $.map(([l, r]) => [l, ReactDOMServer.renderToString(r)]);
    }

    return ReactDOMServer.renderToString($);
  } catch (error) {
    return error instanceof Error ? error.message : 'Error';
  }
}

export default compileReact;
