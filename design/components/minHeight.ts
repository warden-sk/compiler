/*
 * Copyright 2023 Marek Kobida
 */

import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';
import getName from '../getName';

function minHeight(): EnhancedCSSProperties {
  return forBreakpoints(([breakpointName]) => {
    const $ = getName(breakpointName, 'minHeight');

    return {
      [$('25')]: {
        minHeight: '25%',
      },
      [$('50')]: {
        minHeight: '50%',
      },
      [$('75')]: {
        minHeight: '75%',
      },
      [$('100')]: {
        minHeight: '100%',
      },
    };
  });
}

export default minHeight;
