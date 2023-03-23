/*
 * Copyright 2023 Marek Kobida
 */

import AllowedJSXAttributes from '../allowedJSXAttributes';

function filterJSXSpreadAttributes(attributes: { [key: string]: any }) {
  return Object.keys(attributes).reduce(($, key) => {
    const attribute = attributes[key];

    if (key === 'className') {
      return $;
    }

    if (key in AllowedJSXAttributes) {
      return $;
    }

    return { ...$, [key]: attribute };
  }, {});
}

export default filterJSXSpreadAttributes;
