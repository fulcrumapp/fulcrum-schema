export default class OrganizationSchema {
    constructor(schema: any, options: any);
    schema: any;
    options: any;
    buildSchema(): void;
    tables: any[] | undefined;
    tableDefinitions: {} | undefined;
    views: any[] | undefined;
    buildTable(tableDefinition: any): void;
    buildViews(): void;
}
