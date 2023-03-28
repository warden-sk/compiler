export type DecodedClassName = string | undefined;
export type EncodedClassName = EncodedClassName[] | Falsy | boolean | number | string | {
    [decodedClassName: string]: Falsy | boolean;
};
type Falsy = '' | 0 | false | null | undefined;
declare function decodeClassName(...encodedClassNames: EncodedClassName[]): DecodedClassName;
export default decodeClassName;
