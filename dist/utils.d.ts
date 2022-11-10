export default class Utils {
    static tableName(schema: any, prefix: any, quote: any, table: any): string;
    static escapeIdentifier(identifier: any): any;
    static escapedSchema(schema: any, quote: any): string;
    static escape(identifier: any, quote: any): any;
    static flattenElements(elements: any, recurseRepeatables: any, assignParent: any, parent: any): any[];
}
