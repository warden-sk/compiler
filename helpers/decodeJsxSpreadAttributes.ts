/*
 * Copyright 2023 Marek Kobida
 */

import availableJsxAttributes from '../availableJsxAttributes';
import getDictionary from '../getDictionary';
import type { EncodedClassName } from './decodeClassName';
import decodeResponsiveClassName from './decodeResponsiveClassName';

function decodeJsxSpreadAttributes(attributes: Record<string, any>): EncodedClassName[] {
  return Object.keys(attributes).reduce<EncodedClassName[]>(($, key) => {
    const attribute = attributes[key];

    if (key === 'className') {
      return [...$, attribute];
    }

    if (key in availableJsxAttributes) {
      return [...$, decodeResponsiveClassName(getDictionary.getKey(key), attribute)];
    }

    return $;
  }, []);
}

export default decodeJsxSpreadAttributes;
