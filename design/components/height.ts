/*
 * Copyright 2023 Marek Kobida
 */

import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';
import dictionary from '@warden-sk/babel-plugin/private/dictionary';

function height(): EnhancedCSSProperties {
  const $ = dictionary.getKey('height');

  return forBreakpoints(([breakpointName]) => ({
    // .height-0
    [`.${breakpointName}${$}${dictionary.getKey('0')}`]: {
      height: '0',
    },
    // .height-25
    [`.${breakpointName}${$}${dictionary.getKey('25')}`]: {
      height: '25%',
    },
    // .height-50
    [`.${breakpointName}${$}${dictionary.getKey('50')}`]: {
      height: '50%',
    },
    // .height-75
    [`.${breakpointName}${$}${dictionary.getKey('75')}`]: {
      height: '75%',
    },
    // .height-100
    [`.${breakpointName}${$}${dictionary.getKey('100')}`]: {
      height: '100%',
    },
    // .height-auto
    [`.${breakpointName}${$}${dictionary.getKey('auto')}`]: {
      height: 'auto',
    },
  }));
}

export default height;
