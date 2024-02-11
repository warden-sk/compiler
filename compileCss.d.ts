import type Cache from './Cache';
type Options = {
    cache?: Cache;
    outputPath: string;
    path: string;
};
declare function compileCss(options: Options): void;
export default compileCss;
