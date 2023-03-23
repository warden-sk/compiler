/*
 * Copyright 2023 Marek Kobida
 */

import allowedJSXAttributes from '../allowedJSXAttributes';
import type { EncodedClassName } from './decodeClassName';
import decodeResponsiveClassName from './decodeResponsiveClassName';
import dictionary from './dictionary';

function decodeJSXSpreadAttributes(attributes: { [key: string]: any }): EncodedClassName[] {
  return Object.keys(attributes).reduce<EncodedClassName[]>(($, key) => {
    const attribute = attributes[key];

    if (key === 'className') {
      return [...$, attribute];
    }

    if (key in allowedJSXAttributes) {
      return [...$, decodeResponsiveClassName(dictionary.getKey(key), attribute)];
    }

    return $;
  }, []);
}

export default decodeJSXSpreadAttributes;
