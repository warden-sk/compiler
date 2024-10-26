/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */

import dictionary from '../../dictionary';
import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';

function order(): EnhancedCSSProperties {
  const $ = dictionary.getKey('order');

  return forBreakpoints(([breakpointName]) => ({
    [`.${breakpointName}${$}${dictionary.getKey('first')}`]: {
      order: '-999',
    },
    [`.${breakpointName}${$}${dictionary.getKey('last')}`]: {
      order: '999',
    },
  }));
}

export default order;
