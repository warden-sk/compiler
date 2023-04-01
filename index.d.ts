interface Options {
    assets?: string[];
    outputPath?: string;
    publicPath?: string;
    reportErrors?: boolean;
    useServer?: boolean;
    useTransformers?: boolean;
}
declare function compile(filePath: string, options: Options): string;
export default compile;
