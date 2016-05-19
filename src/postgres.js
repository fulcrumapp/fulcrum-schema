require('babel-polyfill');

import OrganizationSchema from './organization-schema';
import Schema from './schema';
import V2 from './schemas/postgres-query-v2';
import Metadata from './metadata';
import sqldiff from 'sqldiff';

const {Postgres, SchemaDiffer} = sqldiff;

const instance = Function('return this')(); // eslint-disable-line no-new-func

instance.oldForm = null;
instance.newForm = null;
instance.schema = null;

function generateSQL(differ) {
  const meta = new Metadata(differ, {quote: '"', schema: instance.schema});

  const gen = new Postgres(differ, {afterTransform: meta.build.bind(meta)});

  gen.tableSchema = instance.schema;

  return gen.generate();
}

instance.compareOrganization = () => {
  let oldSchema = null;
  let newSchema = null;

  if (instance.oldOrganization) {
    oldSchema = new OrganizationSchema(V2);
  }

  if (instance.newOrganization) {
    newSchema = new OrganizationSchema(V2);
  }

  const differ = new SchemaDiffer(oldSchema, newSchema);

  return generateSQL(differ);
};

instance.compareForms = () => {
  try {
    let oldSchema = null;
    let newSchema = null;

    if (instance.oldForm) {
      oldSchema = new Schema(instance.oldForm, V2, null);
    }

    if (instance.newForm) {
      newSchema = new Schema(instance.newForm, V2, null);
    }

    const differ = new SchemaDiffer(oldSchema, newSchema);

    return generateSQL(differ);
  } catch (err) {
    throw new Error(err.stack.toString());
  }
};

module.exports = instance;
