export type DecodedClassName = string | undefined;
export type EncodedClassName = EncodedClassName[] | Falsy | Record<string, Falsy | boolean> | boolean | number | string;
type Falsy = '' | 0 | false | null | undefined;
declare function decodeClassName(...encodedClassNames: EncodedClassName[]): DecodedClassName;
export default decodeClassName;
