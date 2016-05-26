import TableDefinition from '../../table-definition';

export default class Changesets extends TableDefinition {
  get name() {
    return 'changesets'
  }

  defineTable() {
    this.pk('id', {});
    this.integer('row_id', {"allowNull":false});
    this.string('row_resource_id', {"allowNull":false});
    this.integer('form_id', {"allowNull":false});
    this.string('form_resource_id', {});
    this.string('metadata', {});
    this.timestamp('closed_at', {});
    this.integer('created_by_id', {});
    this.string('created_by_resource_id', {});
    this.integer('updated_by_id', {});
    this.string('updated_by_resource_id', {});
    this.integer('closed_by_id', {});
    this.string('closed_by_resource_id', {});
    this.timestamp('created_at', {"allowNull":false});
    this.timestamp('updated_at', {"allowNull":false});
    this.double('min_lat', {});
    this.double('max_lat', {});
    this.double('min_lon', {});
    this.double('max_lon', {});
    this.integer('number_of_changes', {});
    this.integer('number_of_creates', {});
    this.integer('number_of_updates', {});
    this.integer('number_of_deletes', {});
    this.string('metadata_index_text', {});
    this.fts('metadata_index', {});
  }

  defineView() {
    this.alias('row_resource_id', '_changeset_id');
    this.alias('form_resource_id', '_form_id');
    this.alias('metadata', 'metadata');
    this.alias('metadata_index', '_metadata_index');
    this.alias('closed_at', 'closed_at');
    this.alias('created_by_resource_id', '_created_by_id');
    this.alias('updated_by_resource_id', '_updated_by_id');
    this.alias('closed_by_resource_id', '_closed_by_id');
    this.alias('created_at', 'created_at');
    this.alias('updated_at', 'updated_at');
    this.alias('min_lat', 'min_lat');
    this.alias('max_lat', 'max_lat');
    this.alias('min_lon', 'min_lon');
    this.alias('max_lon', 'max_lon');
    this.alias('number_of_changes', 'number_of_changes');
    this.alias('number_of_creates', 'number_of_creates');
    this.alias('number_of_updates', 'number_of_updates');
    this.alias('number_of_deletes', 'number_of_deletes');
  }

  defineIndexes() {
    this.index({"columns":["row_resource_id"],"unique":true});
    this.index({"columns":["row_id"],"unique":true});
    this.index({"columns":["form_id"]});
    this.index({"columns":["metadata_index"],"method":"gin"});
    this.index({"columns":["form_id","updated_at"]});
    this.index({"columns":["updated_at"]});
  }
}