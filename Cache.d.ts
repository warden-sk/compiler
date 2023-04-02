/// <reference types="node" />
declare class Cache {
    storage: {
        [key: string]: [Buffer, Date];
    };
    get(l: string): [Buffer, Date];
    has(l: string): boolean;
    set(l: string, r: [Buffer, Date]): void;
}
export default Cache;
