declare class Cache {
    storage: Record<string, [Buffer, Date]>;
    get(l: string): [Buffer, Date];
    has(l: string): boolean;
    set(l: string, r: [Buffer, Date]): void;
}
export default Cache;
