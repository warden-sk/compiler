export type DecodedResponsiveClassName = string;
export type EncodedResponsiveClassName<T extends string> = T | '' | 0 | false | {
    [breakpointName: string]: T;
} | [T, {
    [breakpointName: string]: T;
}] | [T] | null | undefined;
declare function decodeResponsiveClassName(className: string, encodedResponsiveClassName: EncodedResponsiveClassName<string>): DecodedResponsiveClassName[];
export default decodeResponsiveClassName;
