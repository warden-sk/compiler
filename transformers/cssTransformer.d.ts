import ts from 'typescript';
import type Cache from '../Cache';
type Options = {
    cache?: Cache;
    outputPath: string;
};
declare const cssTransformer: (options: Options) => ts.TransformerFactory<ts.SourceFile>;
export default cssTransformer;
