/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */

import dictionary from '../../dictionary';
import createArrayOf from '../createArrayOf';
import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';
import percentage from '../percentage';

function flexBasis(columns: number): EnhancedCSSProperties {
  const $ = dictionary.getKey('flexBasis');

  return forBreakpoints(([breakpointName]) => ({
    // .flex-basis-0
    [`.${breakpointName}${$}${dictionary.getKey('0')}`]: {
      flexBasis: '0',
    },
    // .flex-basis-1/12
    ...createArrayOf(columns).reduce(
      (css, i) => ({
        ...css,
        [`.${breakpointName}${$}${dictionary.getKey(`${i}/${columns}`)}`]: {
          flexBasis: percentage(i, columns),
        },
      }),
      {},
    ),
    // .flex-basis-100
    [`.${breakpointName}${$}${dictionary.getKey('100')}`]: {
      flexBasis: '100%',
    },
    // .flex-basis-auto
    [`.${breakpointName}${$}${dictionary.getKey('auto')}`]: {
      flexBasis: 'auto',
    },
  }));
}

export default flexBasis;
