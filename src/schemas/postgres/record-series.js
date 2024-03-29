import TableDefinition from '../../table-definition';

export default class RecordLinks extends TableDefinition {
  get name() {
    return 'record_series';
  }

  defineTable() {
    this.pk('id', {});
    this.integer('row_id', {'allowNull': false});
    this.string('row_resource_id', {'allowNull': false});
    this.string('enabled', {'allowNull': false});
    this.string('rrule', {});
    this.jsonb('template', {});
    this.integer('form_id', {'allowNull': false});
    this.string('form_resource_id', {'allowNull': false});
    this.integer('assigned_to_id', {});
    this.string('assigned_to_resource_id', {});
    this.integer('project_id', {});
    this.string('project_resource_id', {});
    this.integer('created_by_id', {});
    this.string('created_by_resource_id', {});
    this.integer('updated_by_id', {});
    this.string('updated_by_resource_id', {});
    this.timestamp('created_at', {'allowNull': false});
    this.timestamp('updated_at', {'allowNull': false});
  }

  defineView() {
    this.alias('row_resource_id', 'record_link_id');
    this.alias('enabled', 'enabled');
    this.alias('rrule', 'rrule');
    this.alias('template', 'template');
    this.alias('form_resource_id', 'form_id');
    this.alias('assigned_to_id', 'assigned_to_id');
    this.alias('project_resource_id', 'project_id');
    this.alias('created_by_resource_id', 'created_by_id');
    this.alias('updated_by_resource_id', 'updated_by_id');
    this.alias('created_at', 'created_at');
    this.alias('updated_at', 'updated_at');
  }

  defineIndexes() {
    this.index({'columns': [ 'row_resource_id' ], 'unique': true});
    this.index({'columns': [ 'row_id' ], 'unique': true});
  }
}
