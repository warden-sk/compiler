import ts from 'typescript';
interface Options {
    outputPath?: string;
}
declare const cssTransformer: (options: Options) => ts.TransformerFactory<ts.SourceFile>;
export default cssTransformer;
