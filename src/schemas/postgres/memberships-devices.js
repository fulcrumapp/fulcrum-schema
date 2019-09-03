import TableDefinition from '../../table-definition';

export default class MembershipsDevices extends TableDefinition {
  get name() {
    return 'query_memberships_devices'
  }

  defineTable() {
    this.pk('id', {});
    this.integer('row_id', {"allowNull":false});
    this.integer('user_id', {"allowNull":false});
    this.string('user_resource_id', {});
    this.integer('device_id', {"allowNull":false});
    this.string('device_resource_id', {});
    this.timestamp('created_at', {"allowNull":false});
    this.timestamp('updated_at', {"allowNull":false});
  }

  defineView() {
    this.alias('user_resource_id', 'user_id');
    this.alias('device_resource_id', 'device_id');
    this.alias('created_at', 'created_at');
    this.alias('updated_at', 'updated_at');
  }

  defineIndexes() {
    this.index({"columns":["row_id"],"unique":true});
    this.index({"columns":["user_resource_id"]});
    this.index({"columns":["device_resource_id"]});
    this.index({"columns":["updated_at"]});
  }
}
