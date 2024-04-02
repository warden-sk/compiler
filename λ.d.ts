export declare const decodeJSON: <T = unknown>(input: string) => T;
export declare const encodeJSON: (input: unknown) => string;
export declare const keys: <T>(of: T) => Exclude<keyof T, number | symbol>[];
