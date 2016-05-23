import TableDefinition from '../../table-definition';

export default class ClassificationSets extends TableDefinition {
  get name() {
    return 'classification_sets'
  }

  define() {
    this.pk('id', {});
    this.integer('row_id', {"allowNull":false});
    this.string('row_resource_id', {"allowNull":false});
    this.string('name', {"allowNull":false});
    this.string('description', {});
    this.integer('version', {"allowNull":false});
    this.string('items', {"allowNull":false});
    this.integer('created_by_id', {});
    this.string('created_by_resource_id', {});
    this.integer('updated_by_id', {});
    this.string('updated_by_resource_id', {});
    this.timestamp('created_at', {"allowNull":false});
    this.timestamp('updated_at', {"allowNull":false});
  }

  view() {
    this.alias('row_resource_id', '_classification_set_id');
    this.alias('name', 'name');
    this.alias('description', 'description');
    this.alias('version', 'version');
    this.alias('items', 'items');
    this.alias('created_by_resource_id', '_created_by_id');
    this.alias('updated_by_resource_id', '_updated_by_id');
    this.alias('created_at', 'created_at');
    this.alias('updated_at', 'updated_at');
  }
}