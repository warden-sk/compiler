interface Options {
    assets?: string[];
    outputPath?: string;
    publicPath?: string;
    template?: string;
}
declare function compileHtml({ assets, outputPath, publicPath, template }: Options): string;
export default compileHtml;
