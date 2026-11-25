import fs from 'fs';
import path from 'path';
import chai from 'chai';
import fulcrumSchema, {
  OrganizationSchema,
  OrganizationSchemaV2,
  Schema,
  FormSchemaV6,
  Metadata,
  METADATA_VIEW_COLUMNS,
  compareOrganization,
  compareFormSchemas,
  compareForms
} from '../src/fulcrum-schema';

chai.should();

describe('root fulcrum-schema exports', () => {
  it('preserves all existing module exports and default properties', () => {
    fulcrumSchema.dialect.should.eql('postgres');
    fulcrumSchema.version.should.eql('v7');
    chai.expect(fulcrumSchema.oldForm).to.equal(null);
    chai.expect(fulcrumSchema.newForm).to.equal(null);
    chai.expect(fulcrumSchema.tableSchema).to.equal(null);
    chai.expect(fulcrumSchema.tablePrefix).to.equal(null);
    fulcrumSchema.includeMetadata.should.eql(false);

    fulcrumSchema.compareOrganization.should.equal(compareOrganization);
    fulcrumSchema.compareFormSchemas.should.equal(compareFormSchemas);
    fulcrumSchema.compareForms.should.equal(compareForms);
    fulcrumSchema.default.should.equal(fulcrumSchema);
  });

  it('exports schema primitives cleanly from the root entrypoint', () => {
    fulcrumSchema.OrganizationSchema.should.equal(OrganizationSchema);
    fulcrumSchema.OrganizationSchemaV2.should.equal(OrganizationSchemaV2);
    fulcrumSchema.Schema.should.equal(Schema);
    fulcrumSchema.FormSchemaV6.should.equal(FormSchemaV6);
    fulcrumSchema.Metadata.should.equal(Metadata);
    fulcrumSchema.METADATA_VIEW_COLUMNS.should.equal(METADATA_VIEW_COLUMNS);
    Metadata.VIEW_COLUMNS.should.equal(METADATA_VIEW_COLUMNS);

    OrganizationSchema.should.be.a('function');
    OrganizationSchemaV2.should.be.an('array');
    OrganizationSchemaV2.length.should.be.greaterThan(0);
    Schema.should.be.a('function');
    FormSchemaV6.should.be.an('object');
    FormSchemaV6.systemFormTableColumns.should.be.an('array');
    Metadata.should.be.a('function');
  });

  it('constructs OrganizationSchema from exported OrganizationSchemaV2', () => {
    const orgSchema = new OrganizationSchema(OrganizationSchemaV2);
    const tableNames = orgSchema.tables.map((table) => table.name);
    const viewNames = orgSchema.views.map((view) => view.name);

    tableNames.should.include('forms');
    tableNames.should.include('record_links');
    viewNames.should.include('forms_view');
    viewNames.should.include('record_links_view');
  });

  it('constructs Schema from exported FormSchemaV6', () => {
    const form = JSON.parse(fs.readFileSync(path.join('test', 'fixtures', 'form-v2.json'))).form;
    form.row_id = 67777;

    const formSchema = new Schema(form, FormSchemaV6);
    const viewNames = formSchema.views.map((view) => view.name);

    formSchema.formTable.name.should.eql('form_67777');
    viewNames.should.include('form_67777_view');
  });

  it('exposes immutable METADATA_VIEW_COLUMNS descriptors for tables_view and columns_view', () => {
    Object.isFrozen(METADATA_VIEW_COLUMNS).should.eql(true);
    Object.isFrozen(METADATA_VIEW_COLUMNS.tables).should.eql(true);
    Object.isFrozen(METADATA_VIEW_COLUMNS.columns).should.eql(true);

    METADATA_VIEW_COLUMNS.tables.should.eql([
      { name: 'name', type: 'text', nullable: true, source: 'alias' },
      { name: 'type', type: 'text', nullable: true, source: 'type' },
      { name: 'parent', type: 'text', nullable: true, source: 'parent' },
      { name: 'form_id', type: 'text', nullable: true, source: 'form_id' },
      { name: 'field', type: 'text', nullable: true, source: 'field' },
      { name: 'field_type', type: 'text', nullable: true, source: 'field_type' },
      { name: 'data_name', type: 'text', nullable: true, source: 'data_name' }
    ]);

    METADATA_VIEW_COLUMNS.columns.should.eql([
      { name: 'table_name', type: 'text', nullable: true, source: 'table_alias' },
      { name: 'name', type: 'text', nullable: true, source: 'name' },
      { name: 'ordinal', type: 'bigint', nullable: true, source: 'ordinal' },
      { name: 'type', type: 'text', nullable: true, source: 'type' },
      { name: 'nullable', type: 'boolean', nullable: true, source: 'nullable' },
      { name: 'form_id', type: 'text', nullable: true, source: 'form_id' },
      { name: 'field', type: 'text', nullable: true, source: 'field' },
      { name: 'field_type', type: 'text', nullable: true, source: 'field_type' },
      { name: 'data_name', type: 'text', nullable: true, source: 'data_name' },
      { name: 'part', type: 'text', nullable: true, source: 'part' }
    ]);

    for (const column of METADATA_VIEW_COLUMNS.tables) {
      Object.isFrozen(column).should.eql(true);
    }

    for (const column of METADATA_VIEW_COLUMNS.columns) {
      Object.isFrozen(column).should.eql(true);
    }
  });
});
