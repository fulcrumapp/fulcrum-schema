'use strict';

var _organizationSchema = require('./organization-schema');

var _organizationSchema2 = _interopRequireDefault(_organizationSchema);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _postgresSchema = require('./schemas/postgres-schema');

var _postgresSchema2 = _interopRequireDefault(_postgresSchema);

var _v = require('./schemas/v2');

var _v2 = _interopRequireDefault(_v);

var _metadata = require('./metadata');

var _metadata2 = _interopRequireDefault(_metadata);

var _sqldiff = require('sqldiff');

var _sqldiff2 = _interopRequireDefault(_sqldiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-polyfill');

var Postgres = _sqldiff2.default.Postgres,
    SchemaDiffer = _sqldiff2.default.SchemaDiffer;


var instance = Function('return this')(); // eslint-disable-line no-new-func

instance.oldForm = null;
instance.newForm = null;
instance.schema = null;
instance.tablePrefix = null;

function generateSQL(differ, includeMetadata) {
  var meta = new _metadata2.default(differ, { quote: '"', schema: instance.schema, includeColumns: true });

  var gen = new Postgres(differ, { afterTransform: includeMetadata ? meta.build.bind(meta) : null });

  gen.tableSchema = instance.schema || '';
  gen.tablePrefix = instance.tablePrefix || '';

  return gen.generate();
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

var compareForms = function compareForms() {
  try {
    var oldSchema = null;
    var newSchema = null;

    if (instance.oldForm) {
      oldSchema = new _schema2.default(instance.oldForm, _v2.default, null);
    }

    if (instance.newForm) {
      newSchema = new _schema2.default(instance.newForm, _v2.default, null);
    }

    var differ = new SchemaDiffer(oldSchema, newSchema);

    return generateSQL(differ, true);
  } catch (err) {
    throw new Error(err.stack.toString());
  }
};

var compareFormSchemas = function compareFormSchemas(oldForm, newForm) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  instance.oldForm = oldForm;
  instance.newForm = newForm;
  instance.schema = options.schema;
  instance.tablePrefix = options.tablePrefix;

  return instance.compareForms();
};

instance.compareForms;
instance.compareFormSchemas;

module.exports = instance;
//# sourceMappingURL=postgres.js.map