/*
 * Copyright 2023 Marek Kobida
 */

import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';
import dictionary from '@warden-sk/babel-plugin/private/dictionary';

const fontSizes = [
  ['1', '0.75rem'], //  12px
  ['2', '0.875rem'], // 14px
  ['3', '1rem'], //     16px
  ['4', '1.125rem'], // 18px
  ['5', '1.25rem'], //  20px
  ['6', '1.5rem'], //   24px
  ['7', '1.75rem'], //  28px
  ['8', '2rem'], //     32px
  ['9', '2.25rem'], //  36px
  ['10', '2.5rem'], //  40px
  ['11', '2.75rem'], // 44px
  ['12', '3rem'], //    48px
] as const;

function fontSize(): EnhancedCSSProperties {
  const $ = dictionary.getKey('fontSize');

  return forBreakpoints(([breakpointName]) =>
    fontSizes.reduce(
      (css, [left, right]) => ({
        ...css,
        [`.${breakpointName}${$}${dictionary.getKey(left)}`]: {
          fontSize: right,
        },
      }),
      {}
    )
  );
}

export default fontSize;
