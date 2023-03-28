declare class Dictionary {
    #private;
    constructor(keys: string[]);
    getDictionary(): {
        [key: string]: string;
    };
    getKey(key: string): string;
}
export default Dictionary;
