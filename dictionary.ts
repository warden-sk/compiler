/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */

import availableJsxAttributes from './availableJsxAttributes';
import Dictionary from './helpers/dictionary';
import * as λ from './λ';

const dictionary = new Dictionary(
  λ.keys(availableJsxAttributes).reduce<string[]>(($, key) => [...$, key, ...availableJsxAttributes[key]], []),
);

export default dictionary;
