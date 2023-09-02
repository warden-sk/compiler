/*
 * Copyright 2023 Marek Kobida
 */

import dictionary from '@warden-sk/babel-plugin/private/dictionary';
import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';

const sizes = [
  ['0', '0'], //        0
  ['1', '0.125rem'], // 2px
  ['2', '0.25rem'], //  4px
  ['3', '0.5rem'], //   8px
  ['50', '50%'], //     50%
] as const;

function borderRadius(): EnhancedCSSProperties {
  const $ = dictionary.getKey('borderRadius');
  const b = dictionary.getKey('borderBottomRadius');
  const l = dictionary.getKey('borderLeftRadius');
  const r = dictionary.getKey('borderRightRadius');
  const t = dictionary.getKey('borderTopRadius');

  return forBreakpoints(([breakpointName]) => {
    return {
      ...sizes.reduce(
        (_, [left, right]) => ({
          ..._,
          [`.${breakpointName}${$}${dictionary.getKey(left)}`]: {
            borderRadius: right,
          },
          [`.${breakpointName}${b}${dictionary.getKey(left)}`]: {
            borderBottomLeftRadius: right,
            borderBottomRightRadius: right,
          },
          [`.${breakpointName}${l}${dictionary.getKey(left)}`]: {
            borderBottomLeftRadius: right,
            borderTopLeftRadius: right,
          },
          [`.${breakpointName}${r}${dictionary.getKey(left)}`]: {
            borderBottomRightRadius: right,
            borderTopRightRadius: right,
          },
          [`.${breakpointName}${t}${dictionary.getKey(left)}`]: {
            borderTopLeftRadius: right,
            borderTopRightRadius: right,
          },
        }),
        {}
      ),
    };
  });
}

export default borderRadius;
