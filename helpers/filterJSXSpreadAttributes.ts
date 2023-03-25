/*
 * Copyright 2023 Marek Kobida
 */

import availableJsxAttributes from '../availableJsxAttributes';

function filterJSXSpreadAttributes(attributes: { [key: string]: any }) {
  return Object.keys(attributes).reduce(($, key) => {
    const attribute = attributes[key];

    if (key === 'className') {
      return $;
    }

    if (key in availableJsxAttributes) {
      return $;
    }

    return { ...$, [key]: attribute };
  }, {});
}

export default filterJSXSpreadAttributes;
