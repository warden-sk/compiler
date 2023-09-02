/*
 * Copyright 2023 Marek Kobida
 */

import type { EnhancedCSSProperties } from '../forBreakpoints';
import forBreakpoints from '../forBreakpoints';
import createArrayOf from '../createArrayOf';
import percentage from '../percentage';
import dictionary from '@warden-sk/babel-plugin/private/dictionary';

const sizes = [
  ['0', '0'], //       0
  ['1', '0.25rem'], // 4px
  ['2', '0.5rem'], //  8px
  ['3', '0.75rem'], // 12px
  ['4', '1rem'], //    16px
  ['5', '1.25rem'], // 20px
  ['6', '1.5rem'], //  24px
  ['7', '1.75rem'], // 28px
  ['8', '2rem'], //    32px
] as const;

function css(
  breakpointName: string,
  left: string,
  property: 'margin' | 'padding',
  right: '0' | 'auto' | `${string}rem`
): EnhancedCSSProperties {
  const $ = dictionary.getKey(property[0]);
  const b = dictionary.getKey(`${property[0]}B`);
  const l = dictionary.getKey(`${property[0]}L`);
  const r = dictionary.getKey(`${property[0]}R`);
  const t = dictionary.getKey(`${property[0]}T`);
  const x = dictionary.getKey(`${property[0]}X`);
  const y = dictionary.getKey(`${property[0]}Y`);

  return {
    [`.${breakpointName}${$}${dictionary.getKey(left)}`]: {
      [property]: right,
    },
    // "b", "y"
    [`.${breakpointName}${b}${dictionary.getKey(left)},.${breakpointName}${y}${dictionary.getKey(left)}`]: {
      [`${property}Bottom`]: right,
    },
    // "l", "x"
    [`.${breakpointName}${l}${dictionary.getKey(left)},.${breakpointName}${x}${dictionary.getKey(left)}`]: {
      [`${property}Left`]: right,
    },
    // "r", "x"
    [`.${breakpointName}${r}${dictionary.getKey(left)},.${breakpointName}${x}${dictionary.getKey(left)}`]: {
      [`${property}Right`]: right,
    },
    // "t", "y"
    [`.${breakpointName}${t}${dictionary.getKey(left)},.${breakpointName}${y}${dictionary.getKey(left)}`]: {
      [`${property}Top`]: right,
    },
  };
}

function spacing(columns: number): EnhancedCSSProperties {
  return forBreakpoints(([breakpointName]) => {
    return {
      ...['1', '2', '3', '4'].reduce(
        (_, left) => ({
          ..._,
          [`.${breakpointName}${dictionary.getKey('gridTemplateColumns')}${dictionary.getKey(left)}`]: {
            gridTemplateColumns: `repeat(${left}, minmax(0, 1fr))`,
          },
        }),
        {}
      ),
      // .gap-0
      ...sizes.reduce(
        (_, [left, right]) => ({
          ..._,
          [`.${breakpointName}${dictionary.getKey('gap')}${dictionary.getKey(left)}`]: {
            gap: right,
          },
          [`.${breakpointName}${dictionary.getKey('gapX')}${dictionary.getKey(left)}`]: {
            columnGap: right,
          },
          [`.${breakpointName}${dictionary.getKey('gapY')}${dictionary.getKey(left)}`]: {
            rowGap: right,
          },
        }),
        {}
      ),
      // .space-x-0
      ...sizes.reduce(
        (_, [left, right]) => ({
          ..._,
          [`.${breakpointName}${dictionary.getKey('spaceX')}${dictionary.getKey(left)} > * + *`]: {
            marginLeft: right,
          },
          [`.${breakpointName}${dictionary.getKey('spaceY')}${dictionary.getKey(left)} > * + *`]: {
            marginTop: right,
          },
        }),
        {}
      ),
      // .m-!1
      ...sizes.reduce(
        (_, [left, right]) =>
          right === '0'
            ? _
            : {
                ..._,
                ...css(breakpointName, `!${left}`, 'margin', `-${right}`),
              },
        {}
      ),
      // .m-0
      ...sizes.reduce(
        (_, [left, right]) => ({
          ..._,
          ...css(breakpointName, left, 'margin', right),
        }),
        {}
      ),
      // .m-auto
      ...css(breakpointName, 'auto', 'margin', 'auto'),
      // .m-l-1/12
      ...createArrayOf(columns).reduce(
        (css, i) => ({
          ...css,
          [`.${breakpointName}${dictionary.getKey('mL')}${dictionary.getKey(`${i + 1}/${columns}`)}`]: {
            marginLeft: percentage(i + 1, columns),
          },
        }),
        {}
      ),
      // .p-0
      ...sizes.reduce(
        (_, [left, right]) => ({
          ..._,
          ...css(breakpointName, left, 'padding', right),
        }),
        {}
      ),
    };
  });
}

export default spacing;
