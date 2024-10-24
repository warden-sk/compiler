declare class Dictionary {
    #private;
    constructor(keys: string[]);
    getDictionary(): Record<string, string>;
    getKey(key: string): string;
}
export default Dictionary;
