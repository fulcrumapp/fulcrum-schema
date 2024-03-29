"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const table_definition_1 = __importDefault(require("../../table-definition"));
class Roles extends table_definition_1.default {
    get name() {
        return 'roles';
    }
    defineTable() {
        this.pk('id', {});
        this.integer('row_id', { "allowNull": false });
        this.string('row_resource_id', { "allowNull": false });
        this.string('name', { "allowNull": false });
        this.string('description', {});
        this.integer('created_by_id', {});
        this.string('created_by_resource_id', {});
        this.integer('updated_by_id', {});
        this.string('updated_by_resource_id', {});
        this.timestamp('created_at', { "allowNull": false });
        this.timestamp('updated_at', { "allowNull": false });
        this.boolean('is_system', { "allowNull": false });
        this.boolean('is_default', { "allowNull": false });
        this.boolean('can_manage_subscription', { "allowNull": false, "defaultValue": false });
        this.boolean('can_update_organization', { "allowNull": false, "defaultValue": false });
        this.boolean('can_manage_members', { "allowNull": false, "defaultValue": false });
        this.boolean('can_manage_roles', { "allowNull": false, "defaultValue": false });
        this.boolean('can_manage_apps', { "allowNull": false, "defaultValue": false });
        this.boolean('can_manage_projects', { "allowNull": false, "defaultValue": false });
        this.boolean('can_manage_choice_lists', { "allowNull": false, "defaultValue": false });
        this.boolean('can_manage_classification_sets', { "allowNull": false, "defaultValue": false });
        this.boolean('can_create_records', { "allowNull": false, "defaultValue": false });
        this.boolean('can_update_records', { "allowNull": false, "defaultValue": false });
        this.boolean('can_delete_records', { "allowNull": false, "defaultValue": false });
        this.boolean('can_change_status', { "allowNull": false, "defaultValue": false });
        this.boolean('can_change_project', { "allowNull": false, "defaultValue": false });
        this.boolean('can_assign_records', { "allowNull": false, "defaultValue": false });
        this.boolean('can_import_records', { "allowNull": false, "defaultValue": false });
        this.boolean('can_export_records', { "allowNull": false, "defaultValue": false });
        this.boolean('can_run_reports', { "allowNull": false, "defaultValue": false });
        this.boolean('can_manage_authorizations', { "allowNull": false, "defaultValue": false });
    }
    defineView() {
        this.alias('row_resource_id', 'role_id');
        this.alias('name', 'name');
        this.alias('description', 'description');
        this.alias('created_by_resource_id', 'created_by_id');
        this.alias('updated_by_resource_id', 'updated_by_id');
        this.alias('created_at', 'created_at');
        this.alias('updated_at', 'updated_at');
        this.alias('is_system', 'is_system');
        this.alias('is_default', 'is_default');
        this.alias('can_manage_subscription', 'can_manage_subscription');
        this.alias('can_update_organization', 'can_update_organization');
        this.alias('can_manage_members', 'can_manage_members');
        this.alias('can_manage_roles', 'can_manage_roles');
        this.alias('can_manage_apps', 'can_manage_apps');
        this.alias('can_manage_projects', 'can_manage_projects');
        this.alias('can_manage_choice_lists', 'can_manage_choice_lists');
        this.alias('can_manage_classification_sets', 'can_manage_classification_sets');
        this.alias('can_create_records', 'can_create_records');
        this.alias('can_update_records', 'can_update_records');
        this.alias('can_delete_records', 'can_delete_records');
        this.alias('can_change_status', 'can_change_status');
        this.alias('can_change_project', 'can_change_project');
        this.alias('can_assign_records', 'can_assign_records');
        this.alias('can_import_records', 'can_import_records');
        this.alias('can_export_records', 'can_export_records');
        this.alias('can_run_reports', 'can_run_reports');
        this.alias('can_manage_authorizations', 'can_manage_authorizations');
    }
    defineIndexes() {
        this.index({ "columns": ["row_resource_id"], "unique": true });
        this.index({ "columns": ["row_id"], "unique": true });
        this.index({ "columns": ["name"] });
        this.index({ "columns": ["updated_at"] });
    }
}
exports.default = Roles;
//# sourceMappingURL=roles.js.map