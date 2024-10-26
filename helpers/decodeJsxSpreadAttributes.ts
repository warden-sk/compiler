/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */

import availableJsxAttributes from '../availableJsxAttributes';
import dictionary from '../dictionary';
import type { EncodedClassName } from './decodeClassName';
import decodeResponsiveClassName from './decodeResponsiveClassName';

function decodeJsxSpreadAttributes(attributes: Record<string, any>): EncodedClassName[] {
  return Object.keys(attributes).reduce<EncodedClassName[]>(($, key) => {
    const attribute = attributes[key];

    if (key === 'className') {
      return [...$, attribute];
    }

    if (key in availableJsxAttributes) {
      return [...$, decodeResponsiveClassName(dictionary.getKey(key), attribute)];
    }

    return $;
  }, []);
}

export default decodeJsxSpreadAttributes;
