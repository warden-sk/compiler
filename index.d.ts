import type Cache from './Cache';
type Options = {
    assets?: string[];
    cache?: Cache;
    outputPath?: string;
    publicPath?: string;
    reportErrors?: boolean;
    useTransformers?: boolean;
};
declare function compile(filePath: string, options: Options): string;
export default compile;
