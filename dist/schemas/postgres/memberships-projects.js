"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tableDefinition = _interopRequireDefault(require("../../table-definition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MembershipsProjects extends _tableDefinition.default {
  get name() {
    return 'query_memberships_projects';
  }

  defineTable() {
    this.pk('id', {});
    this.integer('row_id', {
      "allowNull": false
    });
    this.integer('user_id', {
      "allowNull": false
    });
    this.string('user_resource_id', {});
    this.integer('project_id', {
      "allowNull": false
    });
    this.string('project_resource_id', {});
  }

  defineView() {
    this.alias('user_resource_id', 'user_id');
    this.alias('project_resource_id', 'project_id');
  }

  defineIndexes() {
    this.index({
      "columns": ["row_id"],
      "unique": true
    });
    this.index({
      "columns": ["user_resource_id"]
    });
    this.index({
      "columns": ["project_resource_id"]
    });
  }

}

exports.default = MembershipsProjects;
//# sourceMappingURL=memberships-projects.js.map