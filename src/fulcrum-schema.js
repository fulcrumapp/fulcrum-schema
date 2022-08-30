require('@babel/polyfill');

import OrganizationSchema from './organization-schema';
import Schema from './schema';
import OrganizationSchemaV2 from './schemas/postgres-schema';
import FormSchemaV1 from './schemas/v1';
import FormSchemaV2 from './schemas/v2';
import FormSchemaV3 from './schemas/v3';
import FormSchemaV4 from './schemas/v4';
import Metadata from './metadata';
import sqldiff from 'sqldiff';

const { Postgres, SQLite, SchemaDiffer } = sqldiff;

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

  const meta = new Metadata(differ, { quote, schema: tableSchema, includeColumns: true });

  const generator = new Generator(differ, { afterTransform: includeMetadata ? meta.build.bind(meta) : null });

  generator.tableSchema = tableSchema || '';
  generator.tablePrefix = tablePrefix || '';

  return generator.generate();
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
      v1: FormSchemaV1,
      v2: FormSchemaV2,
      v3: FormSchemaV3,
      v4: FormSchemaV4
    };

    if (oldForm) {
      const columns = schemas[options.version || oldForm.schema_version];
      oldSchema = new Schema(oldForm, columns, null);
    }

    if (newForm) {
      const columns = schemas[options.version || newForm.schema_version];
      newSchema = new Schema(newForm, columns, null);
    }

    const differ = new SchemaDiffer(oldSchema, newSchema);

    return generateSQL(differ, options);
  } catch (err) {
    throw new Error(err.stack.toString());
  }
};

instance.compareForms = () => {
  return instance.compareFormSchemas(
    instance.oldForm,
    instance.newForm,
    {
      version: instance.version,
      dialect: instance.dialect,
      tableSchema: instance.tableSchema,
      tablePrefix: instance.tablePrefix,
      includeMetadata: instance.includeMetadata
    }
  );
};

module.exports = instance;
