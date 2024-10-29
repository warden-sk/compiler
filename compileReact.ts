/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 29.10.2024
 */

import invariant from 'common-helpers/validation/invariant';
import isArray from 'common-helpers/validation/isArray';
import isError from 'common-helpers/validation/isError';
import isObject from 'common-helpers/validation/isObject';
import isString from 'common-helpers/validation/isString';
import vm from 'node:vm';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

type T = {
  compiled: string;
  options?: {
    description?: string;
    icon?: string;
    iconType?: string; // MIME
    title?: string;
  };
};

function compileReact(code: string): T {
  const context = { TextEncoder, URL, exports, module: { exports }, require },
    script = new vm.Script(code);

  try {
    script.runInNewContext(context);

    const output = context.module.exports.default;

    if (isArray(output)) {
      invariant(React.isValidElement(output[0]), 'The output is not a valid `React` component.');
      invariant(isObject(output[1]), 'The output is not a valid `Object` type.');

      return { compiled: ReactDOMServer.renderToString(output[0]), options: output[1] };
    }

    invariant(React.isValidElement(output), 'The output is not a valid `React` component.');

    return { compiled: ReactDOMServer.renderToString(output) };
  } catch (error) {
    if (isError(error)) {
      return { compiled: error.message };
    }

    if (isString(error)) {
      return { compiled: error };
    }

    return { compiled: 'Error' };
  }
}

export type { T };

export default compileReact;
