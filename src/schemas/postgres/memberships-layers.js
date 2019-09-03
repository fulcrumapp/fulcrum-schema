import TableDefinition from '../../table-definition';

export default class MembershipsLayers extends TableDefinition {
  get name() {
    return 'query_memberships_layers'
  }

  defineTable() {
    this.pk('id', {});
    this.integer('row_id', {"allowNull":false});
    // this.string('row_resource_id', {"allowNull":false});
    this.integer('user_id', {"allowNull":false});
    this.string('user_resource_id', {});
    this.integer('layer_id', {"allowNull":false});
    this.string('layer_resource_id', {});
  }

  defineView() {
    // this.alias('row_resource_id', 'membership_layer_id');
    this.alias('user_resource_id', 'user_id');
    this.alias('layer_resource_id', 'layer_id');
  }

  defineIndexes() {
    // this.index({"columns":["row_resource_id"],"unique":true});
    this.index({"columns":["row_id"],"unique":true});
    this.index({"columns":["user_resource_id"]});
    this.index({"columns":["layer_resource_id"]});
  }
}
