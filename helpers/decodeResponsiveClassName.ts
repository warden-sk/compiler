/*
 * Copyright 2023 Marek Kobida
 */

import getDictionary from '../getDictionary';
import isObject from './isObject';

export type DecodedResponsiveClassName = string;

export type EncodedResponsiveClassName<T extends string> =
  | T
  | ''
  | 0
  | false
  | { [breakpointName: string]: T }
  | [T, { [breakpointName: string]: T }]
  | [T]
  | null
  | undefined;

function decodeResponsiveClassName(
  className: string,
  encodedResponsiveClassName: EncodedResponsiveClassName<string>,
): DecodedResponsiveClassName[] {
  const decodedResponsiveClassNames: DecodedResponsiveClassName[] = [];

  // T
  if (typeof encodedResponsiveClassName === 'string') {
    decodedResponsiveClassNames.push(`${className}${getDictionary.getKey(encodedResponsiveClassName)}`);
  }

  // [T]
  else if (Array.isArray(encodedResponsiveClassName)) {
    decodedResponsiveClassNames.push(`${className}${getDictionary.getKey(encodedResponsiveClassName[0])}`);

    // [T, { [breakpointName: string]: T }]
    if (encodedResponsiveClassName[1]) {
      for (const breakpointName in encodedResponsiveClassName[1]) {
        decodedResponsiveClassNames.push(
          `${breakpointName}${className}${getDictionary.getKey(encodedResponsiveClassName[1][breakpointName])}`,
        );
      }
    }
  }

  // { [breakpointName: string]: T }
  else if (isObject(encodedResponsiveClassName)) {
    for (const breakpointName in encodedResponsiveClassName) {
      decodedResponsiveClassNames.push(
        `${breakpointName}${className}${getDictionary.getKey(encodedResponsiveClassName[breakpointName])}`,
      );
    }
  }

  return decodedResponsiveClassNames;
}

export default decodeResponsiveClassName;
