/*
 * Copyright 2023 Marek Kobida
 */

import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';
import dictionary from '@warden-sk/babel-plugin/private/dictionary';

const sizes = [
  ['0', '0'], //         0
  ['1', '0.0625rem'], // 1px
  ['2', '0.125rem'], //  2px
] as const;

function css(breakpointName: string, left: string, right: string): EnhancedCSSProperties {
  const $ = dictionary.getKey('border');
  const b = dictionary.getKey(`borderBottom`);
  const l = dictionary.getKey(`borderLeft`);
  const r = dictionary.getKey(`borderRight`);
  const t = dictionary.getKey(`borderTop`);
  const x = dictionary.getKey(`borderX`);
  const y = dictionary.getKey(`borderY`);

  return {
    [`.${breakpointName}${$}${dictionary.getKey(left)}`]: {
      borderStyle: 'solid',
      borderWidth: right,
    },
    // "b", "y"
    [`.${breakpointName}${b}${dictionary.getKey(left)},.${breakpointName}${y}${dictionary.getKey(left)}`]: {
      borderBottomStyle: 'solid',
      borderBottomWidth: right,
    },
    // "l", "x"
    [`.${breakpointName}${l}${dictionary.getKey(left)},.${breakpointName}${x}${dictionary.getKey(left)}`]: {
      borderLeftStyle: 'solid',
      borderLeftWidth: right,
    },
    // "r", "x"
    [`.${breakpointName}${r}${dictionary.getKey(left)},.${breakpointName}${x}${dictionary.getKey(left)}`]: {
      borderRightStyle: 'solid',
      borderRightWidth: right,
    },
    // "t", "y"
    [`.${breakpointName}${t}${dictionary.getKey(left)},.${breakpointName}${y}${dictionary.getKey(left)}`]: {
      borderTopStyle: 'solid',
      borderTopWidth: right,
    },
  };
}

function border(): EnhancedCSSProperties {
  return forBreakpoints(([breakpointName]) => {
    return {
      ...sizes.reduce(
        (_, [left, right]) => ({
          ..._,
          ...css(breakpointName, left, right),
        }),
        {}
      ),
    };
  });
}

export default border;
