'use strict';

var _organizationSchema = require('./organization-schema');

var _organizationSchema2 = _interopRequireDefault(_organizationSchema);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _postgresQueryV = require('./schemas/postgres-query-v2');

var _postgresQueryV2 = _interopRequireDefault(_postgresQueryV);

var _metadata = require('./metadata');

var _metadata2 = _interopRequireDefault(_metadata);

var _sqldiff = require('sqldiff');

var _sqldiff2 = _interopRequireDefault(_sqldiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Postgres = _sqldiff2.default.Postgres;
const SchemaDiffer = _sqldiff2.default.SchemaDiffer;

let instance = Function('return this')(); // eslint-disable-line no-new-func

instance.oldForm = null;
instance.newForm = null;
instance.schema = null;

function generateSQL(differ) {
  const meta = new _metadata2.default(differ, { quote: '"', schema: instance.schema });

  const gen = new Postgres(differ, { afterTransform: meta.build.bind(meta) });

  gen.tableSchema = instance.schema;

  return gen.generate();
}

instance.compareOrganization = function () {
  let oldSchema = null;
  let newSchema = null;

  if (instance.oldOrganization) {
    oldSchema = new _organizationSchema2.default(_postgresQueryV2.default);
  }

  if (instance.newOrganization) {
    newSchema = new _organizationSchema2.default(_postgresQueryV2.default);
  }

  const differ = new SchemaDiffer(oldSchema, newSchema);

  return generateSQL(differ);
};

instance.compareForms = function () {
  try {
    let oldSchema = null;
    let newSchema = null;

    if (instance.oldForm) {
      oldSchema = new _schema2.default(instance.oldForm, _postgresQueryV2.default, null);
    }

    if (instance.newForm) {
      newSchema = new _schema2.default(instance.newForm, _postgresQueryV2.default, null);
    }

    const differ = new SchemaDiffer(oldSchema, newSchema);

    return generateSQL(differ);
  } catch (err) {
    throw new Error(err.stack.toString());
  }
};

module.exports = instance;
//# sourceMappingURL=postgres.js.map