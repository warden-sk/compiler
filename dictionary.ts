/*
 * Copyright 2023 Marek Kobida
 */

import allowedJsxAttributes from './allowedJsxAttributes';
import Dictionary from './helpers/dictionary';

const dictionary = new Dictionary([
  ...Object.keys(allowedJsxAttributes).reduce<string[]>(($, key) => [...$, key], []),
  ...Object.keys(allowedJsxAttributes).reduce<string[]>(
    ($, key) => [...$, ...allowedJsxAttributes[key as keyof typeof allowedJsxAttributes]],
    []
  ),
]);

export default dictionary;
