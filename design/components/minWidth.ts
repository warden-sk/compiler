/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 06.05.2024
 */

import createArrayOf from '../createArrayOf';
import forBreakpoints from '../forBreakpoints';
import type { EnhancedCSSProperties } from '../forBreakpoints';
import getName from '../getName';
import percentage from '../percentage';

function minWidth(columns: number): EnhancedCSSProperties {
  return forBreakpoints(([breakpointName]) => {
    const $ = getName(breakpointName, 'minWidth');

    return {
      [$('0')]: {
        minWidth: '0',
      },
      ...createArrayOf(columns).reduce((css, i) => {
        const f = `${i}/${columns}`;

        return {
          ...css,
          [$(f)]: {
            minWidth: percentage(i, columns),
          },
        };
      }, {}),
      [$('100')]: {
        minWidth: '100%',
      },
      [$('auto')]: {
        minWidth: 'auto',
      },
    };
  });
}

export default minWidth;
