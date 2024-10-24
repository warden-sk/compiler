export type DecodedResponsiveClassName = string;
export type EncodedResponsiveClassName<T extends string> = Record<string, T> | T | '' | 0 | false | [T, Record<string, T>] | [T] | null | undefined;
declare function decodeResponsiveClassName(className: string, encodedResponsiveClassName: EncodedResponsiveClassName<string>): DecodedResponsiveClassName[];
export default decodeResponsiveClassName;
