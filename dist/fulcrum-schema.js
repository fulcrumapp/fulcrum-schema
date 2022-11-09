"use strict";

var _organizationSchema = _interopRequireDefault(require("./organization-schema"));
var _schema = _interopRequireDefault(require("./schema"));
var _postgresSchema = _interopRequireDefault(require("./schemas/postgres-schema"));
var _v = _interopRequireDefault(require("./schemas/v1"));
var _v2 = _interopRequireDefault(require("./schemas/v2"));
var _v3 = _interopRequireDefault(require("./schemas/v3"));
var _v4 = _interopRequireDefault(require("./schemas/v4"));
var _metadata = _interopRequireDefault(require("./metadata"));
var _sqldiff = _interopRequireDefault(require("sqldiff"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Postgres = _sqldiff["default"].Postgres,
  SQLite = _sqldiff["default"].SQLite,
  SchemaDiffer = _sqldiff["default"].SchemaDiffer;
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
    sqlite: SQLite
  }[dialect];
  var quote = {
    postgres: '"',
    sqlite: '`'
  }[dialect];
  var meta = new _metadata["default"](differ, {
    quote: quote,
    schema: tableSchema,
    includeColumns: true
  });
  var generator = new Generator(differ, {
    afterTransform: includeMetadata ? meta.build.bind(meta) : null
  });
  generator.tableSchema = tableSchema || '';
  generator.tablePrefix = tablePrefix || '';
  return generator.generate();
}
instance.compareOrganization = function () {
  var oldSchema = null;
  var newSchema = null;
  if (instance.oldOrganization) {
    oldSchema = new _organizationSchema["default"](_postgresSchema["default"]);
  }
  if (instance.newOrganization) {
    newSchema = new _organizationSchema["default"](_postgresSchema["default"]);
  }
  var differ = new SchemaDiffer(oldSchema, newSchema);
  return generateSQL(differ, {
    version: instance.version,
    dialect: instance.dialect,
    tableSchema: instance.tableSchema,
    tablePrefix: instance.tablePrefix,
    includeMetadata: true
  });
};
instance.compareFormSchemas = function (oldForm, newForm, options) {
  if (options === void 0) {
    options = {};
  }
  try {
    var oldSchema = null;
    var newSchema = null;
    var schemas = {
      v1: _v["default"],
      v2: _v2["default"],
      v3: _v3["default"],
      v4: _v4["default"]
    };
    if (oldForm) {
      var columns = schemas[options.version || oldForm.schema_version];
      oldSchema = new _schema["default"](oldForm, columns, null);
    }
    if (newForm) {
      var _columns = schemas[options.version || newForm.schema_version];
      newSchema = new _schema["default"](newForm, _columns, null);
    }
    var differ = new SchemaDiffer(oldSchema, newSchema);
    return generateSQL(differ, options);
  } catch (err) {
    throw new Error(err.stack.toString());
  }
};
instance.compareForms = function () {
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