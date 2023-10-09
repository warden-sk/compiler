/*
 * Copyright 2023 Marek Kobida
 */

import dictionary from '../../getDictionary';
import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';

const lineHeights = [
  ['1', '1'],
  ['2', '1.25'],
  ['3', '1.5'],
  ['4', '1.75'],
  ['5', '2'],
] as const;

function lineHeight(): EnhancedCSSProperties {
  const $ = dictionary.getKey('lineHeight');

  return forBreakpoints(([breakpointName]) =>
    lineHeights.reduce(
      (css, [left, right]) => ({
        ...css,
        [`.${breakpointName}${$}${dictionary.getKey(left)}`]: {
          lineHeight: right,
        },
      }),
      {},
    ),
  );
}

export default lineHeight;
