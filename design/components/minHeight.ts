/*
 * Copyright 2023 Marek Kobida
 */

import dictionary from '../../getDictionary';
import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';

function minHeight(): EnhancedCSSProperties {
  const $ = dictionary.getKey('minHeight');

  return forBreakpoints(([breakpointName]) => ({
    [`.${breakpointName}${$}${dictionary.getKey('25')}`]: {
      minHeight: '25%',
    },
    [`.${breakpointName}${$}${dictionary.getKey('50')}`]: {
      minHeight: '50%',
    },
    [`.${breakpointName}${$}${dictionary.getKey('75')}`]: {
      minHeight: '75%',
    },
    [`.${breakpointName}${$}${dictionary.getKey('100')}`]: {
      minHeight: '100%',
    },
  }));
}

export default minHeight;
