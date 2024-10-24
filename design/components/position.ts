/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */

import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';
import getName from '../getName';

function position(): EnhancedCSSProperties {
  return forBreakpoints(([breakpointName]) => {
    // (1/2) BOTTOM, LEFT, RIGHT, TOP
    const $1 = ['bottom', 'left', 'right', 'top'] /**/
      .reduce((css, key) => {
        const $ = getName(breakpointName, key);

        return {
          ...css,
          [$('0')]: {
            [key]: '0',
          },
          [$('50')]: {
            [key]: '50%',
          },
          [$('100')]: {
            [key]: '100%',
          },
        };
      }, {});

    // (2/2) POSITION / dokončiť / `t.Position`
    const $2 = ['absolute', 'fixed', 'relative', 'static', 'sticky'] /**/
      .reduce((css, key) => {
        const $ = getName(breakpointName, 'position');

        return {
          ...css,
          [$(key)]: {
            position: key,
          },
        };
      }, {});

    return { ...$1, ...$2 };
  });
}

export default position;
