type T = {
    compiled: string;
    options?: {
        description?: string;
        icon?: string;
        iconType?: string;
        title?: string;
    };
};
declare function compileReact(code: string): T;
export type { T };
export default compileReact;
