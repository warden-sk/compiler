/*
 * Copyright 2023 Marek Kobida
 */

import vm from 'node:vm';
import ReactDOMServer from 'react-dom/server';

function compileReact(code: string): [string, string][] | string {
  const context = { TextEncoder, URL, exports, module: { exports }, require } as const;

  const script = new vm.Script(code);

  try {
    script.runInNewContext(context);

    const $ = context.module.exports.default;

    if (Array.isArray($)) {
      return $.map(([l, r]) => [l, ReactDOMServer.renderToString(r)]);
    }

    return ReactDOMServer.renderToString($);
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'string') {
      return error;
    }

    return 'Error';
  }
}

export default compileReact;
