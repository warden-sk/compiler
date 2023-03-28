declare function isObject(input: unknown): input is {
    [key: string]: unknown;
};
export default isObject;
