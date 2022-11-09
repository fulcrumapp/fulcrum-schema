export default class Metadata {
    constructor(diff: any, options: any);
    options: any;
    includeColumns: any;
    useAliases: any;
    build(generator: any, changes: any): void;
    diff: any;
    changes: any;
    oldViews: any;
    newViews: any;
    shouldEmitMetadata(): boolean;
    viewName(name: any): any;
    buildStatements(): any[];
}
