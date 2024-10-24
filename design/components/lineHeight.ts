/*
 * Copyright 2023 Marek Kobida
 */

import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';
import getName from '../getName';

const lineHeights = [
  ['1', '1'],
  ['2', '1.25'],
  ['3', '1.5'],
  ['4', '1.75'],
  ['5', '2'],
] as const;

function lineHeight(): EnhancedCSSProperties {
  return forBreakpoints(([breakpointName]) => {
    const $ = getName(breakpointName, 'lineHeight');

    return lineHeights.reduce(
      (css, [left, right]) => ({
        ...css,
        [$(left)]: {
          lineHeight: right,
        },
      }),
      {},
    );
  });
}

export default lineHeight;
