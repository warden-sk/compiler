/*
 * Copyright 2023 Marek Kobida
 */

import dictionary from '../getDictionary';

function getName(breakpointName: string, key: string) {
  return (value: string) => {
    return `.${breakpointName}${dictionary.getKey(key)}${dictionary.getKey(value)}`;
  };
}

export default getName;
