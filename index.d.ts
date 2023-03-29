interface Options {
    assets?: string[];
    outputPath?: string;
    publicPath?: string;
    transpileOnly?: boolean;
    useTransformers?: boolean;
}
declare function compile(filePath: string, options: Options): string;
export default compile;
