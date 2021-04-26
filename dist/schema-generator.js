'use strict';

var _organizationSchema = require('./organization-schema');

var _organizationSchema2 = _interopRequireDefault(_organizationSchema);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _postgresSchema = require('./schemas/postgres-schema');

var _postgresSchema2 = _interopRequireDefault(_postgresSchema);

var _v = require('./schemas/v1');

var _v2 = _interopRequireDefault(_v);

var _v3 = require('./schemas/v2');

var _v4 = _interopRequireDefault(_v3);

var _metadata = require('./metadata');

var _metadata2 = _interopRequireDefault(_metadata);

var _sqldiff = require('sqldiff');

var _sqldiff2 = _interopRequireDefault(_sqldiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-polyfill');

var Postgres = _sqldiff2.default.Postgres,
    Sqlite = _sqldiff2.default.Sqlite,
    SchemaDiffer = _sqldiff2.default.SchemaDiffer;


var instance = Function('return this')(); // eslint-disable-line no-new-func

instance.dialect = 'postgres';
instance.version = 'v2';
instance.oldForm = null;
instance.newForm = null;
instance.tableSchema = null;
instance.tablePrefix = null;
instance.includeMetadata = false;

function generateSQL(differ, _ref) {
  var includeMetadata = _ref.includeMetadata,
      dialect = _ref.dialect,
      tablePrefix = _ref.tablePrefix,
      tableSchema = _ref.tableSchema;

  var Generator = {
    postgres: Postgres,
    sqlite: Sqlite
  }[dialect];

  var quote = {
    postgres: '"',
    sqlite: '`'
  }[dialect];

  var meta = new _metadata2.default(differ, { quote: quote, schema: tableSchema, includeColumns: true });

  var generator = new Generator(differ, { afterTransform: includeMetadata ? meta.build.bind(meta) : null });

  generator.tableSchema = tableSchema || '';
  generator.tablePrefix = tablePrefix || '';

  return generator.generate();
}

instance.compareOrganization = function () {
  var oldSchema = null;
  var newSchema = null;

  if (instance.oldOrganization) {
    oldSchema = new _organizationSchema2.default(_postgresSchema2.default);
  }

  if (instance.newOrganization) {
    newSchema = new _organizationSchema2.default(_postgresSchema2.default);
  }

  var differ = new SchemaDiffer(oldSchema, newSchema);

  return generateSQL(differ, true);
};

instance.compareFormSchemas = function (oldForm, newForm) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  try {
    var oldSchema = null;
    var newSchema = null;

    var schema = {
      v1: _v2.default,
      v2: _v4.default
    };

    if (oldForm) {
      oldSchema = new _schema2.default(oldForm, schema, null);
    }

    if (newForm) {
      newSchema = new _schema2.default(newForm, schema, null);
    }

    var differ = new SchemaDiffer(oldSchema, newSchema);

    return generateSQL(differ, options);
  } catch (err) {
    throw new Error(err.stack.toString());
  }
};

instance.compareForm = function () {
  return instance.compareFormSchemas(instance.oldForm, instance.newForm, {
    dialect: instance.dialect,
    tableSchema: instance.tableSchema,
    tablePrefix: instance.tablePrefix,
    includeMetadata: instance.includeMetadata
  });
};

module.exports = instance;
//# sourceMappingURL=schema-generator.js.map