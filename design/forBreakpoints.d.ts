import type * as CSS from 'csstype';
export declare const breakpoints: readonly [readonly ["\\#", "40rem"], readonly ["\\#\\#", "48rem"], readonly ["\\#\\#\\#", "64rem"], readonly ["\\#\\#\\#\\#", "80rem"]];
export type EnhancedCSSProperties = {
    [key: string]: CSS.Properties | EnhancedCSSProperties;
};
declare function forBreakpoints(on: (breakpoint: readonly [string, string]) => EnhancedCSSProperties): EnhancedCSSProperties;
export default forBreakpoints;
