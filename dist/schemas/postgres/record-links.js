"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const table_definition_1 = __importDefault(require("../../table-definition"));
class RecordLinks extends table_definition_1.default {
    get name() {
        return 'record_links';
    }
    defineTable() {
        this.pk('id', {});
        this.integer('row_id', { 'allowNull': false });
        this.string('row_resource_id', { 'allowNull': false });
        this.string('key', { 'allowNull': false });
        this.integer('form_id', { 'allowNull': false });
        this.string('form_resource_id', { 'allowNull': false });
        this.integer('record_id', {});
        this.string('record_resource_id', {});
        this.integer('linked_form_id', {});
        this.string('linked_form_resource_id', {});
        this.integer('linked_record_id', {});
        this.string('linked_record_resource_id', {});
        this.timestamp('created_at', { 'allowNull': false });
        this.timestamp('updated_at', { 'allowNull': false });
    }
    defineView() {
        this.alias('row_resource_id', 'record_link_id');
        this.alias('key', 'key');
        this.alias('form_resource_id', 'form_id');
        this.alias('record_resource_id', 'record_id');
        this.alias('linked_form_resource_id', 'linked_form_id');
        this.alias('linked_record_resource_id', 'linked_record_id');
        this.alias('created_at', 'created_at');
        this.alias('updated_at', 'updated_at');
    }
    defineIndexes() {
        this.index({ 'columns': ['row_resource_id'], 'unique': true });
        this.index({ 'columns': ['row_id'], 'unique': true });
        this.index({ 'columns': ['form_id', 'key'] });
        this.index({ 'columns': ['form_resource_id', 'record_resource_id'] });
        this.index({ 'columns': ['linked_form_resource_id'] });
        this.index({ 'columns': ['linked_form_resource_id', 'linked_record_resource_id'] });
        this.index({ 'columns': ['record_resource_id'] });
        this.index({ 'columns': ['linked_record_resource_id'] });
    }
}
exports.default = RecordLinks;
//# sourceMappingURL=record-links.js.map