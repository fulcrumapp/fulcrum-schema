"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const table_definition_1 = __importDefault(require("../../table-definition"));
class MembershipsForms extends table_definition_1.default {
    get name() {
        return 'query_memberships_forms';
    }
    defineTable() {
        this.pk('id', {});
        this.integer('row_id', { "allowNull": false });
        this.integer('user_id', { "allowNull": false });
        this.string('user_resource_id', {});
        this.integer('form_id', { "allowNull": false });
        this.string('form_resource_id', {});
    }
    defineView() {
        this.alias('user_resource_id', 'user_id');
        this.alias('form_resource_id', 'form_id');
    }
    defineIndexes() {
        this.index({ "columns": ["row_id"], "unique": true });
        this.index({ "columns": ["user_resource_id"] });
        this.index({ "columns": ["form_resource_id"] });
    }
}
exports.default = MembershipsForms;
//# sourceMappingURL=memberships-forms.js.map