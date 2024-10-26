/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */

import dictionary from '../dictionary';

function getName(breakpointName: string, key: string) {
  return (value: string) => {
    return `.${breakpointName}${dictionary.getKey(key)}${dictionary.getKey(value)}`;
  };
}

export default getName;
