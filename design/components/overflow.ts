/*
 * Copyright 2023 Marek Kobida
 */

import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';
import getName from '../getName';

function overflow(): EnhancedCSSProperties {
  return forBreakpoints(([breakpointName]) => {
    const $ = getName(breakpointName, 'overflow');

    return {
      [$('auto')]: {
        overflow: 'auto',
      },
      [$('hidden')]: {
        overflow: 'hidden',
      },
    };
  });
}

export default overflow;
