/*
 * Copyright 2023 Marek Kobida
 */

import availableJsxAttributes from './availableJsxAttributes';
import Dictionary from './helpers/dictionary';

const getDictionary = new Dictionary([
  ...Object.keys(availableJsxAttributes).reduce<string[]>(($, key) => [...$, key], []),
  ...Object.keys(availableJsxAttributes).reduce<string[]>(
    ($, key) => [...$, ...availableJsxAttributes[key as keyof typeof availableJsxAttributes]],
    []
  ),
]);

export default getDictionary;
