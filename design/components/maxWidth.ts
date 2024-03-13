/*
 * Copyright 2023 Marek Kobida
 */

import { breakpoints } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';
import getName from '../getName';
import type { EnhancedCSSProperties } from '../forBreakpoints';

function maxWidth(): EnhancedCSSProperties {
  return forBreakpoints(([breakpointName]) => {
    const $ = getName(breakpointName, 'maxWidth');

    return {
      ...breakpoints.reduce((css, [left, right]) => {
        return {
          ...css,
          [$(left.replace(/\\/, ''))]: {
            maxWidth: right,
          },
        };
      }, {}),
    };
  });
}

export default maxWidth;
