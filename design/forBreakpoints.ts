/*
 * Copyright 2023 Marek Kobida
 */

import type * as CSS from 'csstype';

export const breakpoints = [
  ['\\#', '40rem'], //          640px
  ['\\#\\#', '48rem'], //       768px
  ['\\#\\#\\#', '64rem'], //    1024px
  ['\\#\\#\\#\\#', '80rem'], // 1280px
] as const;

// {
//   'body': {
//     margin: 0,
//   },
//   '@media print': {
//     'body': {
//       margin: 0,
//     },
//   },
// }
export interface EnhancedCSSProperties {
  [key: string]: CSS.Properties | EnhancedCSSProperties;
}

function forBreakpoints(on: (breakpoint: readonly [string, string]) => EnhancedCSSProperties): EnhancedCSSProperties {
  return breakpoints.reduce(
    (_, breakpoint) => ({
      ..._,
      [`@media(min-width:${breakpoint[1]})`]: on(breakpoint),
    }),
    on(['', ''])
  );
}

export default forBreakpoints;
