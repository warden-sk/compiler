/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */

import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';

function container(): EnhancedCSSProperties {
  return forBreakpoints(breakpoint =>
    breakpoint[0] ?
      {
        '.container': {
          maxWidth: breakpoint[1],
        },
      }
    : {
        '.container': {
          width: '100%',
        },
      },
  );
}

export default container;
