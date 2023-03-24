/*
 * Copyright 2023 Marek Kobida
 */

import allowedJsxAttributes from '../allowedJsxAttributes';
import dictionary from '../dictionary';
import type { EncodedClassName } from './decodeClassName';
import decodeResponsiveClassName from './decodeResponsiveClassName';

function decodeJSXSpreadAttributes(attributes: { [key: string]: any }): EncodedClassName[] {
  return Object.keys(attributes).reduce<EncodedClassName[]>(($, key) => {
    const attribute = attributes[key];

    if (key === 'className') {
      return [...$, attribute];
    }

    if (key in allowedJsxAttributes) {
      return [...$, decodeResponsiveClassName(dictionary.getKey(key), attribute)];
    }

    return $;
  }, []);
}

export default decodeJSXSpreadAttributes;
