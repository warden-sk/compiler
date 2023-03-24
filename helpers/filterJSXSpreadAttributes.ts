/*
 * Copyright 2023 Marek Kobida
 */

import allowedJsxAttributes from '../allowedJsxAttributes';

function filterJSXSpreadAttributes(attributes: { [key: string]: any }) {
  return Object.keys(attributes).reduce(($, key) => {
    const attribute = attributes[key];

    if (key === 'className') {
      return $;
    }

    if (key in allowedJsxAttributes) {
      return $;
    }

    return { ...$, [key]: attribute };
  }, {});
}

export default filterJSXSpreadAttributes;
