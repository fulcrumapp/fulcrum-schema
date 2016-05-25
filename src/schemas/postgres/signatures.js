import TableDefinition from '../../table-definition';

export default class Signatures extends TableDefinition {
  get name() {
    return 'signatures'
  }

  defineTable() {
    this.pk('id', {});
    this.integer('row_id', {"allowNull":false});
    this.string('row_resource_id', {"allowNull":false});
    this.string('access_key', {"allowNull":false});
    this.integer('record_id', {});
    this.string('record_resource_id', {});
    this.integer('form_id', {});
    this.string('form_resource_id', {});
    this.string('exif', {});
    this.integer('file_size', {});
    this.integer('created_by_id', {});
    this.string('created_by_resource_id', {});
    this.integer('updated_by_id', {});
    this.string('updated_by_resource_id', {});
    this.timestamp('created_at', {"allowNull":false});
    this.timestamp('updated_at', {"allowNull":false});
    this.string('file', {});
    this.string('content_type', {});
    this.timestamp('uploaded_at', {});
    this.timestamp('stored_at', {});
    this.timestamp('processed_at', {});
  }

  defineView() {
    this.alias('access_key', '_signature_id');
    this.alias('file_size', 'file_size');
    this.alias('record_resource_id', '_record_id');
    this.alias('form_resource_id', '_form_id');
    this.alias('created_by_resource_id', 'created_by_id');
    this.alias('updated_by_resource_id', 'updated_by_id');
    this.alias('created_at', 'created_at');
    this.alias('updated_at', 'updated_at');
    this.alias('file', 'file');
    this.alias('content_type', 'content_type');
    this.alias('uploaded_at', 'uploaded_at');
    this.alias('stored_at', 'stored_at');
    this.alias('processed_at', 'processed_at');
  }

  defineIndexes() {
  }
}