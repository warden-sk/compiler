/*
 * Copyright 2023 Marek Kobida
 */

import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';
import dictionary from '@warden-sk/babel-plugin/private/dictionary';

function opacity(): EnhancedCSSProperties {
  const $ = dictionary.getKey('opacity');

  return forBreakpoints(([breakpointName]) => ({
    // .opacity-0
    [`.${breakpointName}${$}${dictionary.getKey('0')}`]: {
      opacity: '0',
    },
    // .opacity-25
    [`.${breakpointName}${$}${dictionary.getKey('25')}`]: {
      opacity: '0.25',
    },
    // .opacity-50
    [`.${breakpointName}${$}${dictionary.getKey('50')}`]: {
      opacity: '0.5',
    },
    // .opacity-75
    [`.${breakpointName}${$}${dictionary.getKey('75')}`]: {
      opacity: '0.75',
    },
    // .opacity-100
    [`.${breakpointName}${$}${dictionary.getKey('100')}`]: {
      opacity: '1',
    },
  }));
}

export default opacity;
