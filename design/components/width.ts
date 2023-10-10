/*
 * Copyright 2023 Marek Kobida
 */

import createArrayOf from '../createArrayOf';
import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';
import getName from '../getName';
import percentage from '../percentage';

function width(columns: number): EnhancedCSSProperties {
  return forBreakpoints(([breakpointName]) => {
    const $ = getName(breakpointName, 'width');

    return {
      [$('0')]: {
        width: '0',
      },
      ...createArrayOf(columns).reduce((css, i) => {
        const f = `${i}/${columns}`;

        return {
          ...css,
          [$(f)]: {
            width: percentage(i, columns),
          },
        };
      }, {}),
      [$('100')]: {
        width: '100%',
      },
      [$('auto')]: {
        width: 'auto',
      },
    };
  });
}

export default width;
