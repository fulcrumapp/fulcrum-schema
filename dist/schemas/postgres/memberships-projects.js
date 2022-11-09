"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const table_definition_1 = __importDefault(require("../../table-definition"));
class MembershipsProjects extends table_definition_1.default {
    get name() {
        return 'query_memberships_projects';
    }
    defineTable() {
        this.pk('id', {});
        this.integer('row_id', { "allowNull": false });
        this.integer('user_id', { "allowNull": false });
        this.string('user_resource_id', {});
        this.integer('project_id', { "allowNull": false });
        this.string('project_resource_id', {});
    }
    defineView() {
        this.alias('user_resource_id', 'user_id');
        this.alias('project_resource_id', 'project_id');
    }
    defineIndexes() {
        this.index({ "columns": ["row_id"], "unique": true });
        this.index({ "columns": ["user_resource_id"] });
        this.index({ "columns": ["project_resource_id"] });
    }
}
exports.default = MembershipsProjects;
//# sourceMappingURL=memberships-projects.js.map