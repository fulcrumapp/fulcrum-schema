"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import pgformat from 'pg-format';
const util_1 = require("util");
const utils_1 = __importDefault(require("./utils"));
const sqldiff_1 = __importDefault(require("sqldiff"));
function pgvalue(value) {
    if (value == null) {
        return 'NULL';
    }
    return "'" + value.toString().replace(/'/g, "''") + "'";
}
class Metadata {
    constructor(diff, options) {
        this.options = options || {};
        this.includeColumns = this.options.includeColumns == null ? true : this.options.includeColumns;
        this.useAliases = this.options.useAliases == null ? true : this.options.useAliases;
    }
    build(generator, changes) {
        this.diff = generator.differ;
        this.changes = changes;
        this.oldViews = this.diff.oldSchema ? this.diff.oldSchema.views : [];
        this.oldViews = this.oldViews || [];
        this.newViews = this.diff.newSchema ? this.diff.newSchema.views : [];
        this.newViews = this.newViews || [];
        if (this.shouldEmitMetadata()) {
            Array.prototype.push.apply(changes, this.buildStatements());
        }
    }
    shouldEmitMetadata() {
        const oldName = this.diff.oldSchema && this.diff.oldSchema.form ? this.diff.oldSchema.form.name : null;
        const newName = this.diff.newSchema && this.diff.newSchema.form ? this.diff.newSchema.form.name : null;
        // emit the metadata statements if there are already some changes being emitted or
        // the form name changed.
        return (this.changes.length > 0 || oldName !== newName);
    }
    viewName(name) {
        return (this.options.tablePrefix || '') + name;
    }
    buildStatements() {
        const statements = [];
        const METADATA = false;
        const schemaChangesTableName = utils_1.default.tableName(this.options.schema, this.options.prefix, this.options.quote, 'schema_changes');
        const systemTablesName = utils_1.default.tableName(this.options.schema, this.options.prefix, this.options.quote, 'tables');
        const systemTablesViewName = utils_1.default.tableName(this.options.schema, this.options.prefix, this.options.quote, 'tables_view');
        const systemColumnsName = utils_1.default.tableName(this.options.schema, this.options.prefix, this.options.quote, 'columns');
        const systemColumnsViewName = utils_1.default.tableName(this.options.schema, this.options.prefix, this.options.quote, 'columns_view');
        if (METADATA) {
            statements.push((0, util_1.format)('CREATE TABLE IF NOT EXISTS %s (name text NOT NULL, created_at timestamp with time zone NOT NULL, sql TEXT NOT NULL);', schemaChangesTableName));
            statements.push((0, util_1.format)('CREATE UNIQUE INDEX ON %s (name);', schemaChangesTableName));
            statements.push((0, util_1.format)('CREATE TABLE IF NOT EXISTS %s (name text, alias text, type text, parent text, form_id text, field text, field_type text, data_name text);', systemTablesName));
            statements.push((0, util_1.format)('CREATE OR REPLACE VIEW %s AS SELECT alias AS name, type, parent, form_id, field, field_type, data_name FROM %s;', systemTablesViewName, systemTablesName));
            statements.push((0, util_1.format)('CREATE INDEX idx_tables_name ON %s (name);', systemTablesName));
            statements.push((0, util_1.format)('CREATE INDEX idx_tables_alias ON %s (alias);', systemTablesName));
            if (this.includeColumns) {
                // field type
                statements.push((0, util_1.format)('CREATE TABLE IF NOT EXISTS %s (table_name text, table_alias text, name text, ordinal bigint, type text, nullable boolean, form_id text, field text, field_type text, data_name text, part text, data text);', systemColumnsName));
                statements.push((0, util_1.format)('CREATE OR REPLACE VIEW %s AS SELECT table_alias AS table_name, name, ordinal, type, nullable, form_id, field, field_type, data_name, part FROM %s;', systemColumnsViewName, systemColumnsName));
                statements.push((0, util_1.format)('CREATE INDEX idx_columns_table_name ON %s (table_name);', systemColumnsName));
                statements.push((0, util_1.format)('CREATE INDEX idx_columns_table_alias ON %s (table_alias);', systemColumnsName));
            }
        }
        // drop old metadata
        for (const view of this.oldViews) {
            statements.push((0, util_1.format)('DELETE FROM %s WHERE name = %s;', systemTablesName, pgvalue(view.name)));
            if (this.includeColumns) {
                statements.push((0, util_1.format)('DELETE FROM %s WHERE table_name = %s;', systemColumnsName, pgvalue(view.name)));
            }
        }
        // create new metadata
        for (const view of this.newViews) {
            const viewName = this.viewName(view.name);
            const viewAlias = view.alias || view.table.alias;
            const viewType = view.type || view.table.type;
            // skip the _full and 'values' tables
            if (viewType === 'values' || view.variant != null) {
                continue;
            }
            statements.push((0, util_1.format)('DELETE FROM %s WHERE name = %s;', systemTablesName, pgvalue(viewName)));
            if (this.includeColumns) {
                statements.push((0, util_1.format)('DELETE FROM %s WHERE table_name = %s;', systemColumnsName, pgvalue(viewName)));
            }
            let element = view.element || view.table.element;
            let parentViewName = null;
            const { parent } = view.table;
            if (parent) {
                if (this.useAliases) {
                    parentViewName = parent.alias;
                }
                else {
                    parentViewName = this.newViews.find(v => v.table === parent && v.variant == null).name;
                }
            }
            statements.push((0, util_1.format)('INSERT INTO %s (name, alias, type, parent, form_id, field, field_type, data_name) SELECT %s, %s, %s, %s, %s, %s, %s, %s;', systemTablesName, pgvalue(viewName), pgvalue(viewAlias), pgvalue(viewType), pgvalue(parentViewName), pgvalue(view.table.form_id), pgvalue(element ? element.key : null), pgvalue(element ? element.type : null), pgvalue(element ? element.data_name : null)));
            if (this.includeColumns) {
                for (let i = 0; i < view.columns.length; ++i) {
                    const column = view.columns[i];
                    // statements.push(format('DELETE FROM %s WHERE table_name = %s AND name = %s;',
                    //                        systemColumnsName,
                    //                        pgvalue(viewName),
                    //                        pgvalue(column.alias)));
                    let field = null;
                    let fieldType = null;
                    let dataName = null;
                    let part = null;
                    let data = null;
                    element = column.column.element;
                    if (element) {
                        field = element.key;
                        fieldType = element.type;
                        dataName = element.data_name;
                        part = column.column.suffix ? column.column.suffix.replace(/^_/, '') : null;
                        data = element.format ? JSON.stringify({ format: element.format }) : null;
                    }
                    statements.push((0, util_1.format)('INSERT INTO %s (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)\n' +
                        'SELECT %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s;', systemColumnsName, pgvalue(viewName), pgvalue(viewAlias), pgvalue(column.alias), pgvalue(i + 1), pgvalue(column.column.type), pgvalue(column.column.allowNull ? 1 : 0), pgvalue(view.table.form_id), pgvalue(field), pgvalue(fieldType), pgvalue(dataName), pgvalue(part), pgvalue(data)));
                }
            }
        }
        return statements.map(s => {
            return new sqldiff_1.default.SchemaChange('raw', { sql: s });
        });
    }
}
exports.default = Metadata;
//# sourceMappingURL=metadata.js.map