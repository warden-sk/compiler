/*
 * Copyright 2023 Marek Kobida
 */

import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';

function container(): EnhancedCSSProperties {
  return forBreakpoints(breakpoint =>
    breakpoint[0]
      ? {
          '.container': {
            maxWidth: breakpoint[1],
          },
        }
      : {
          '.container': {
            width: '100%',
          },
        }
  );
}

export default container;
