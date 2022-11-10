"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const organization_schema_1 = __importDefault(require("./organization-schema"));
const schema_1 = __importDefault(require("./schema"));
const postgres_schema_1 = __importDefault(require("./schemas/postgres-schema"));
const v1_1 = __importDefault(require("./schemas/v1"));
const v2_1 = __importDefault(require("./schemas/v2"));
const v3_1 = __importDefault(require("./schemas/v3"));
const v4_1 = __importDefault(require("./schemas/v4"));
const metadata_1 = __importDefault(require("./metadata"));
const sqldiff_1 = __importDefault(require("sqldiff"));
const { Postgres, SQLite, SchemaDiffer } = sqldiff_1.default;
const instance = Function('return this')(); // eslint-disable-line no-new-func
instance.dialect = 'postgres';
instance.version = 'v2';
instance.oldForm = null;
instance.newForm = null;
instance.tableSchema = null;
instance.tablePrefix = null;
instance.includeMetadata = false;
function generateSQL(differ, { includeMetadata, dialect, tablePrefix, tableSchema }) {
    const Generator = {
        postgres: Postgres,
        sqlite: SQLite
    }[dialect];
    const quote = {
        postgres: '"',
        sqlite: '`'
    }[dialect];
    const meta = new metadata_1.default(differ, { quote, schema: tableSchema, includeColumns: true });
    const generator = new Generator(differ, { afterTransform: includeMetadata ? meta.build.bind(meta) : null });
    generator.tableSchema = tableSchema || '';
    generator.tablePrefix = tablePrefix || '';
    return generator.generate();
}
instance.compareOrganization = () => {
    let oldSchema = null;
    let newSchema = null;
    if (instance.oldOrganization) {
        oldSchema = new organization_schema_1.default(postgres_schema_1.default);
    }
    if (instance.newOrganization) {
        newSchema = new organization_schema_1.default(postgres_schema_1.default);
    }
    const differ = new SchemaDiffer(oldSchema, newSchema);
    return generateSQL(differ, {
        version: instance.version,
        dialect: instance.dialect,
        tableSchema: instance.tableSchema,
        tablePrefix: instance.tablePrefix,
        includeMetadata: true
    });
};
instance.compareFormSchemas = (oldForm, newForm, options = {}) => {
    try {
        let oldSchema = null;
        let newSchema = null;
        const schemas = {
            v1: v1_1.default,
            v2: v2_1.default,
            v3: v3_1.default,
            v4: v4_1.default
        };
        if (oldForm) {
            const columns = schemas[options.version || oldForm.schema_version];
            oldSchema = new schema_1.default(oldForm, columns, null);
        }
        if (newForm) {
            const columns = schemas[options.version || newForm.schema_version];
            newSchema = new schema_1.default(newForm, columns, null);
        }
        const differ = new SchemaDiffer(oldSchema, newSchema);
        return generateSQL(differ, options);
    }
    catch (err) {
        throw new Error(err.stack.toString());
    }
};
instance.compareForms = () => {
    return instance.compareFormSchemas(instance.oldForm, instance.newForm, {
        version: instance.version,
        dialect: instance.dialect,
        tableSchema: instance.tableSchema,
        tablePrefix: instance.tablePrefix,
        includeMetadata: instance.includeMetadata
    });
};
module.exports = instance;
//# sourceMappingURL=fulcrum-schema.js.map