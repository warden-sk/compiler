interface Options {
    cssOutputPath: string;
    transpileOnly: boolean;
    useTransformers: boolean;
}
declare function compile(filePath: string, options: Options): string;
export default compile;
