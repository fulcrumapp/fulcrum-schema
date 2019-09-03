import TableDefinition from '../../table-definition';

export default class Memberships extends TableDefinition {
  get name() {
    return 'memberships'
  }

  defineTable() {
    this.pk('id', {});
    this.integer('row_id', {"allowNull":false});
    this.string('row_resource_id', {"allowNull":false});
    this.integer('user_id', {"allowNull":false});
    this.string('user_resource_id', {});
    this.string('first_name', {});
    this.string('last_name', {});
    this.string('name', {});
    this.string('email', {});
    this.integer('role_id', {"allowNull":false});
    this.string('role_resource_id', {"allowNull":false});
    this.string('role_name', {"allowNull":false});
    this.string('status', {});
    this.timestamp('created_at', {"allowNull":false});
    this.timestamp('updated_at', {"allowNull":false});
  }

  defineView() {
    this.alias('row_resource_id', 'membership_id');
    this.alias('user_resource_id', 'user_id');
    this.alias('first_name', 'first_name');
    this.alias('last_name', 'last_name');
    this.alias('name', 'name');
    this.alias('email', 'email');
    this.alias('role_resource_id', 'role_id');
    this.alias('role_name', 'role_name');
    this.alias('status', 'status');
    this.alias('created_at', 'created_at');
    this.alias('updated_at', 'updated_at');
  }

  defineIndexes() {
    this.index({"columns":["row_resource_id"],"unique":true});
    this.index({"columns":["row_id"],"unique":true});
    this.index({"columns":["user_resource_id"]});
    this.index({"columns":["role_resource_id"]});
    this.index({"columns":["name"]});
    this.index({"columns":["updated_at"]});
  }
}
