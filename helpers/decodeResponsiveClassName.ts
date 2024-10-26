/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 26.10.2024
 */

import isObject from '@warden-sk/helpers/validation/isObject';
import dictionary from '../dictionary';

export type DecodedResponsiveClassName = string;

export type EncodedResponsiveClassName<T extends string> =
  | Record<string, T>
  | T
  | ''
  | 0
  | false
  | [T, Record<string, T>]
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
    decodedResponsiveClassNames.push(`${className}${dictionary.getKey(encodedResponsiveClassName)}`);
  }

  // [T]
  else if (Array.isArray(encodedResponsiveClassName)) {
    decodedResponsiveClassNames.push(`${className}${dictionary.getKey(encodedResponsiveClassName[0])}`);

    // [T, { [breakpointName: string]: T }]
    if (encodedResponsiveClassName[1]) {
      for (const breakpointName in encodedResponsiveClassName[1]) {
        decodedResponsiveClassNames.push(
          `${breakpointName}${className}${dictionary.getKey(encodedResponsiveClassName[1][breakpointName])}`,
        );
      }
    }
  }

  // { [breakpointName: string]: T }
  else if (isObject(encodedResponsiveClassName)) {
    for (const breakpointName in encodedResponsiveClassName) {
      decodedResponsiveClassNames.push(
        `${breakpointName}${className}${dictionary.getKey(encodedResponsiveClassName[breakpointName])}`,
      );
    }
  }

  return decodedResponsiveClassNames;
}

export default decodeResponsiveClassName;
