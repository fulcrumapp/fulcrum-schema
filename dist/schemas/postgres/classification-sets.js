"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const table_definition_1 = __importDefault(require("../../table-definition"));
class ClassificationSets extends table_definition_1.default {
    get name() {
        return 'classification_sets';
    }
    defineTable() {
        this.pk('id', {});
        this.integer('row_id', { "allowNull": false });
        this.string('row_resource_id', { "allowNull": false });
        this.string('name', { "allowNull": false });
        this.string('description', {});
        this.integer('version', { "allowNull": false });
        this.string('items', { "allowNull": false });
        this.integer('created_by_id', {});
        this.string('created_by_resource_id', {});
        this.integer('updated_by_id', {});
        this.string('updated_by_resource_id', {});
        this.timestamp('created_at', { "allowNull": false });
        this.timestamp('updated_at', { "allowNull": false });
        this.string('system_type', {});
    }
    defineView() {
        this.alias('row_resource_id', 'classification_set_id');
        this.alias('name', 'name');
        this.alias('description', 'description');
        this.alias('version', 'version');
        this.alias('items', 'items');
        this.alias('created_by_resource_id', 'created_by_id');
        this.alias('updated_by_resource_id', 'updated_by_id');
        this.alias('created_at', 'created_at');
        this.alias('updated_at', 'updated_at');
        this.alias('system_type', 'system_type');
    }
    defineIndexes() {
        this.index({ "columns": ["row_resource_id"], "unique": true });
        this.index({ "columns": ["row_id"], "unique": true });
        this.index({ "columns": ["name"] });
        this.index({ "columns": ["updated_at"] });
    }
}
exports.default = ClassificationSets;
//# sourceMappingURL=classification-sets.js.map