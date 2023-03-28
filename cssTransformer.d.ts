import ts from 'typescript';
interface Options {
    cssOutputPath?: string;
}
declare const cssTransformer: (options: Options) => ts.TransformerFactory<ts.SourceFile>;
export default cssTransformer;
