/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 03.04.2024
 */

import availableJsxAttributes from './availableJsxAttributes';
import Dictionary from './helpers/dictionary';
import * as λ from './λ';

const getDictionary = new Dictionary([
  ...λ.keys(availableJsxAttributes).reduce<string[]>(($, key) => [...$, key], []),
  ...λ.keys(availableJsxAttributes).reduce<string[]>(($, key) => [...$, ...availableJsxAttributes[key]], []),
]);

export default getDictionary;
