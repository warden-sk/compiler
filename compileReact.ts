/*
 * Copyright 2023 Marek Kobida
 */

import vm from 'node:vm';
import ReactDOMServer from 'react-dom/server';

type T = { compiled: string; options?: { description?: string; title?: string } };

function compileReact(code: string): T {
  const context = { TextEncoder, URL, exports, module: { exports }, require } as const;

  const script = new vm.Script(code);

  try {
    script.runInNewContext(context);

    const $ = context.module.exports.default;

    if (Array.isArray($)) {
      return { compiled: ReactDOMServer.renderToString($[0]), options: $[1] };
    }

    return { compiled: ReactDOMServer.renderToString($) };
  } catch (error) {
    if (error instanceof Error) {
      return { compiled: error.message };
    }

    if (typeof error === 'string') {
      return { compiled: error };
    }

    return { compiled: 'Error' };
  }
}

export type { T };

export default compileReact;
