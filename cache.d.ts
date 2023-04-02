/// <reference types="node" />
declare class Cache {
    storage: {
        [key: string]: [Buffer, Date];
    };
    get(l: string): [Buffer, Date];
    has(l: string): boolean;
    set(l: string, r: [Buffer, Date]): void;
}
declare const _default: Cache;
export default _default;
