/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 26.10.2024
 */

import * as λ from '@warden-sk/helpers/λ';
import availableJsxAttributes from './availableJsxAttributes';
import Dictionary from './helpers/dictionary';

const dictionary = new Dictionary(
  λ.keys(availableJsxAttributes).reduce<string[]>(($, key) => [...$, key, ...availableJsxAttributes[key]], []),
);

export default dictionary;
