/*
 * Copyright 2023 Marek Kobida
 */

import dictionary from '../../getDictionary';
import createArrayOf from '../createArrayOf';
import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';
import percentage from '../percentage';

function width(columns: number): EnhancedCSSProperties {
  const $ = dictionary.getKey('width');

  return forBreakpoints(([breakpointName]) => ({
    // .width-0
    [`.${breakpointName}${$}${dictionary.getKey('0')}`]: {
      width: '0',
    },
    // .width-1/12
    ...createArrayOf(columns).reduce(
      (css, i) => ({
        ...css,
        [`.${breakpointName}${$}${dictionary.getKey(`${i + 1}/${columns}`)}`]: {
          width: percentage(i + 1, columns),
        },
      }),
      {},
    ),
    // .width-100
    [`.${breakpointName}${$}${dictionary.getKey('100')}`]: {
      width: '100%',
    },
    // .width-auto
    [`.${breakpointName}${$}${dictionary.getKey('auto')}`]: {
      width: 'auto',
    },
    // .width-px
    [`.${breakpointName}${$}${dictionary.getKey('px')}`]: {
      width: '1px',
    },
  }));
}

export default width;
