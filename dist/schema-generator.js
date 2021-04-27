"use strict";

var _organizationSchema = _interopRequireDefault(require("./organization-schema"));

var _schema = _interopRequireDefault(require("./schema"));

var _postgresSchema = _interopRequireDefault(require("./schemas/postgres-schema"));

var _v = _interopRequireDefault(require("./schemas/v1"));

var _v2 = _interopRequireDefault(require("./schemas/v2"));

var _metadata = _interopRequireDefault(require("./metadata"));

var _sqldiff = _interopRequireDefault(require("sqldiff"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('@babel/polyfill');

const {
  Postgres,
  SQLite,
  SchemaDiffer
} = _sqldiff.default;
const instance = Function('return this')(); // eslint-disable-line no-new-func

instance.dialect = 'postgres';
instance.version = 'v2';
instance.oldForm = null;
instance.newForm = null;
instance.tableSchema = null;
instance.tablePrefix = null;
instance.includeMetadata = false;

function generateSQL(differ, {
  includeMetadata,
  dialect,
  tablePrefix,
  tableSchema
}) {
  const Generator = {
    postgres: Postgres,
    sqlite: SQLite
  }[dialect];
  const quote = {
    postgres: '"',
    sqlite: '`'
  }[dialect];
  const meta = new _metadata.default(differ, {
    quote,
    schema: tableSchema,
    includeColumns: true
  });
  const generator = new Generator(differ, {
    afterTransform: includeMetadata ? meta.build.bind(meta) : null
  });
  generator.tableSchema = tableSchema || '';
  generator.tablePrefix = tablePrefix || '';
  return generator.generate();
}

instance.compareOrganization = () => {
  let oldSchema = null;
  let newSchema = null;

  if (instance.oldOrganization) {
    oldSchema = new _organizationSchema.default(_postgresSchema.default);
  }

  if (instance.newOrganization) {
    newSchema = new _organizationSchema.default(_postgresSchema.default);
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
    const schema = {
      v1: _v.default,
      v2: _v2.default
    }[options.version];

    if (oldForm) {
      oldSchema = new _schema.default(oldForm, schema, null);
    }

    if (newForm) {
      newSchema = new _schema.default(newForm, schema, null);
    }

    const differ = new SchemaDiffer(oldSchema, newSchema);
    return generateSQL(differ, options);
  } catch (err) {
    throw new Error(err.stack.toString());
  }
};

instance.compareForm = () => {
  return instance.compareFormSchemas(instance.oldForm, instance.newForm, {
    version: instance.version,
    dialect: instance.dialect,
    tableSchema: instance.tableSchema,
    tablePrefix: instance.tablePrefix,
    includeMetadata: instance.includeMetadata
  });
};

module.exports = instance;
//# sourceMappingURL=schema-generator.js.map