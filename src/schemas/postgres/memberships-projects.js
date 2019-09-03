import TableDefinition from '../../table-definition';

export default class MembershipsProjects extends TableDefinition {
  get name() {
    return 'query_memberships_projects'
  }

  defineTable() {
    this.pk('id', {});
    this.integer('row_id', {"allowNull":false});
    // this.string('row_resource_id', {"allowNull":false});
    this.integer('user_id', {"allowNull":false});
    this.string('user_resource_id', {});
    this.integer('project_id', {"allowNull":false});
    this.string('project_resource_id', {});
  }

  defineView() {
    // this.alias('row_resource_id', 'membership_project_id');
    this.alias('user_resource_id', 'user_id');
    this.alias('project_resource_id', 'project_id');
  }

  defineIndexes() {
    // this.index({"columns":["row_resource_id"],"unique":true});
    this.index({"columns":["row_id"],"unique":true});
    this.index({"columns":["user_resource_id"]});
    this.index({"columns":["project_resource_id"]});
  }
}
