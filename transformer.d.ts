import ts from 'typescript';
declare const transformer: () => ts.TransformerFactory<ts.SourceFile>;
export default transformer;
