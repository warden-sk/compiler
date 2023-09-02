/*
 * Copyright 2023 Marek Kobida
 */

import type * as CSS from 'csstype';
import type { EnhancedCSSProperties } from './forBreakpoints';

function encodePropertyName(propertyName: string): string {
  return propertyName.replace(/[A-Z]/g, character => `-${character.toLowerCase()}`);
}

function toString(properties: CSS.Properties | EnhancedCSSProperties, $ = false): string {
  let css = '';

  for (const propertyName in properties) {
    const property = properties[propertyName as 'alignContent'];

    if (typeof property === 'number' || typeof property === 'string') {
      css += `${encodePropertyName(propertyName)}:${property}${$ ? ' !important;' : ';'}`;
    }

    // @media
    if (typeof property === 'object') {
      const $$ = propertyName.replace(/!/g, '\\!').replace(/\$/g, '\\$').replace(/\//g, '\\/').replace(/_/g, '\\_');

      css += `${$$}{${toString(property, $)}}`;
    }
  }

  return css;
}

export default toString;
