require('babel-polyfill');

import OrganizationSchema from './organization-schema';
import Schema from './schema';
import OrganizationSchemaV2 from './schemas/postgres-schema';
import FormSchemaV2 from './schemas/v2';
import Metadata from './metadata';
import sqldiff from 'sqldiff';

const { Postgres, SchemaDiffer } = sqldiff;

const instance = Function('return this')(); // eslint-disable-line no-new-func

instance.oldForm = null;
instance.newForm = null;
instance.schema = null;
instance.tablePrefix = null;

function generateSQL(differ, includeMetadata) {
  const meta = new Metadata(differ, { quote: '"', schema: instance.schema, includeColumns: true });

  const gen = new Postgres(differ, { afterTransform: includeMetadata ? meta.build.bind(meta) : null });

  gen.tableSchema = instance.schema || '';
  gen.tablePrefix = instance.tablePrefix || '';

  return gen.generate();
}

instance.compareOrganization = () => {
  let oldSchema = null;
  let newSchema = null;

  if (instance.oldOrganization) {
    oldSchema = new OrganizationSchema(OrganizationSchemaV2);
  }

  if (instance.newOrganization) {
    newSchema = new OrganizationSchema(OrganizationSchemaV2);
  }

  const differ = new SchemaDiffer(oldSchema, newSchema);

  return generateSQL(differ, true);
};

const compareForms = () => {
  try {
    let oldSchema = null;
    let newSchema = null;

    if (instance.oldForm) {
      oldSchema = new Schema(instance.oldForm, FormSchemaV2, null);
    }

    if (instance.newForm) {
      newSchema = new Schema(instance.newForm, FormSchemaV2, null);
    }

    const differ = new SchemaDiffer(oldSchema, newSchema);

    return generateSQL(differ, true);
  } catch (err) {
    throw new Error(err.stack.toString());
  }
};

const compareFormSchemas = (oldForm, newForm, options = {}) => {
  instance.oldForm = oldForm;
  instance.newForm = newForm;
  instance.schema = options.schema;
  instance.tablePrefix = options.tablePrefix;

  return instance.compareForms();
};

instance.compareForms;
instance.compareFormSchemas;

module.exports = instance;
