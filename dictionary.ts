/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 29.10.2024
 */

import * as λ from 'common-helpers/λ';
import availableJsxAttributes from './availableJsxAttributes';
import Dictionary from './helpers/dictionary';

const dictionary = new Dictionary(
  λ.keys(availableJsxAttributes).reduce<string[]>(($, key) => [...$, key, ...availableJsxAttributes[key]], []),
);

export default dictionary;
