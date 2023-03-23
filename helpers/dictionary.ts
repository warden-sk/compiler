/*
 * Copyright 2023 Marek Kobida
 */

import allowedJSXAttributes from '../allowedJSXAttributes';
import Dictionary from './dict';

const dictionary = new Dictionary([
  ...Object.keys(allowedJSXAttributes).reduce<string[]>(($, key) => [...$, key], []),
  ...Object.keys(allowedJSXAttributes).reduce<string[]>(
    ($, key) => [...$, ...allowedJSXAttributes[key as keyof typeof allowedJSXAttributes]],
    []
  ),
]);

export default dictionary;
