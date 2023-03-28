interface Options {
    assets: string[];
    outputPath: string;
    publicPath?: string;
}
declare function compileHtml({ assets, outputPath, publicPath }: Options): Promise<void>;
export default compileHtml;
