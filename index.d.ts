import type Cache from './Cache';
interface Options {
    assets?: string[];
    cache?: Cache;
    outputPath?: string;
    publicPath?: string;
    reportErrors?: boolean;
    useServer?: boolean;
    useTransformers?: boolean;
}
declare function compile(filePath: string, options: Options): string;
export default compile;
