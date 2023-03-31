interface Options {
    assets?: string[];
    outputPath: string;
    publicPath?: string;
}
declare function compileHtml({ assets, outputPath, publicPath }: Options): string;
export default compileHtml;
