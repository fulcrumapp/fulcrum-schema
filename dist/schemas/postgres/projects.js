"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tableDefinition = _interopRequireDefault(require("../../table-definition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Projects extends _tableDefinition.default {
  get name() {
    return 'projects';
  }

  defineTable() {
    this.pk('id', {});
    this.integer('row_id', {
      "allowNull": false
    });
    this.string('row_resource_id', {
      "allowNull": false
    });
    this.string('name', {
      "allowNull": false
    });
    this.string('description', {});
    this.integer('created_by_id', {});
    this.string('created_by_resource_id', {});
    this.timestamp('created_at', {
      "allowNull": false
    });
    this.timestamp('updated_at', {
      "allowNull": false
    });
  }

  defineView() {
    this.alias('row_resource_id', 'project_id');
    this.alias('name', 'name');
    this.alias('description', 'description');
    this.alias('created_by_resource_id', 'created_by_id');
    this.alias('created_at', 'created_at');
    this.alias('updated_at', 'updated_at');
  }

  defineIndexes() {
    this.index({
      "columns": ["row_resource_id"],
      "unique": true
    });
    this.index({
      "columns": ["row_id"],
      "unique": true
    });
    this.index({
      "columns": ["name"]
    });
    this.index({
      "columns": ["updated_at"]
    });
  }

}

exports.default = Projects;
//# sourceMappingURL=projects.js.map