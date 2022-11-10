"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const table_definition_1 = __importDefault(require("../../table-definition"));
class MembershipsLayers extends table_definition_1.default {
    get name() {
        return 'query_memberships_layers';
    }
    defineTable() {
        this.pk('id', {});
        this.integer('row_id', { "allowNull": false });
        this.integer('user_id', { "allowNull": false });
        this.string('user_resource_id', {});
        this.integer('layer_id', { "allowNull": false });
        this.string('layer_resource_id', {});
    }
    defineView() {
        this.alias('user_resource_id', 'user_id');
        this.alias('layer_resource_id', 'layer_id');
    }
    defineIndexes() {
        this.index({ "columns": ["row_id"], "unique": true });
        this.index({ "columns": ["user_resource_id"] });
        this.index({ "columns": ["layer_resource_id"] });
    }
}
exports.default = MembershipsLayers;
//# sourceMappingURL=memberships-layers.js.map