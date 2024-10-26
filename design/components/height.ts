/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */

import dictionary from '../../dictionary';
import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';

function height(): EnhancedCSSProperties {
  const $ = dictionary.getKey('height');

  return forBreakpoints(([breakpointName]) => ({
    [`.${breakpointName}${$}${dictionary.getKey('0')}`]: {
      height: '0',
    },
    [`.${breakpointName}${$}${dictionary.getKey('25')}`]: {
      height: '25%',
    },
    [`.${breakpointName}${$}${dictionary.getKey('50')}`]: {
      height: '50%',
    },
    [`.${breakpointName}${$}${dictionary.getKey('75')}`]: {
      height: '75%',
    },
    [`.${breakpointName}${$}${dictionary.getKey('100')}`]: {
      height: '100%',
    },
    [`.${breakpointName}${$}${dictionary.getKey('auto')}`]: {
      height: 'auto',
    },
  }));
}

export default height;
