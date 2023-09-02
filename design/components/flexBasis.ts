/*
 * Copyright 2023 Marek Kobida
 */

import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';
import createArrayOf from '../createArrayOf';
import percentage from '../percentage';
import dictionary from '@warden-sk/babel-plugin/private/dictionary';

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
        [`.${breakpointName}${$}${dictionary.getKey(`${i + 1}/${columns}`)}`]: {
          flexBasis: percentage(i + 1, columns),
        },
      }),
      {}
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
