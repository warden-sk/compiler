interface Options {
    assets?: string[];
    outputPath?: string;
    publicPath?: string;
    reportErrors?: boolean;
    template?: string;
    useTransformers?: boolean;
}
declare function compile(filePath: string, options: Options): string;
export default compile;
