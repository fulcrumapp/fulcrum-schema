import TableDefinition from '../../table-definition';

export default class MembershipsForms extends TableDefinition {
  get name() {
    return 'query_memberships_forms'
  }

  defineTable() {
    this.pk('id', {});
    this.integer('row_id', {"allowNull":false});
    this.integer('user_id', {"allowNull":false});
    this.string('user_resource_id', {});
    this.integer('form_id', {"allowNull":false});
    this.string('form_resource_id', {});
  }

  defineView() {
    this.alias('user_resource_id', 'user_id');
    this.alias('form_resource_id', 'form_id');
  }

  defineIndexes() {
    this.index({"columns":["row_id"],"unique":true});
    this.index({"columns":["user_resource_id"]});
    this.index({"columns":["form_resource_id"]});
  }
}
