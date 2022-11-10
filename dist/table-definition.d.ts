export default class TableDefinition {
    columns: any[];
    viewColumns: {};
    indexes: any[];
    column(name: any, type: any, options: any): void;
    pk(): void;
    integer(name: any, options: any): void;
    string(name: any, options: any): void;
    timestamp(name: any, options: any): void;
    boolean(name: any, options: any): void;
    double(name: any, options: any): void;
    text(name: any, options: any): void;
    array(name: any, options: any): void;
    fts(name: any, options: any): void;
    geometry(name: any, options: any): void;
    json(name: any, options: any): void;
    jsonb(name: any, options: any): void;
    alias(source: any, to: any): void;
    index(options: any): void;
    define(): null;
}
