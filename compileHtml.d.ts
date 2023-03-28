interface Options {
    assets: string[];
    name: string;
    outputPath: string;
    publicPath?: string;
    template: (code: string) => [string, string][] | string;
}
declare function compileHtml({ assets, name, outputPath, publicPath, template }: Options): Promise<void>;
export default compileHtml;
