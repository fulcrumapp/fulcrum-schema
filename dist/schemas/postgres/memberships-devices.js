"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const table_definition_1 = __importDefault(require("../../table-definition"));
class MembershipsDevices extends table_definition_1.default {
    get name() {
        return 'query_memberships_devices';
    }
    defineTable() {
        this.pk('id', {});
        this.integer('row_id', { "allowNull": false });
        this.integer('user_id', { "allowNull": false });
        this.string('user_resource_id', {});
        this.integer('device_id', { "allowNull": false });
        this.string('device_resource_id', {});
        this.timestamp('created_at', { "allowNull": false });
        this.timestamp('updated_at', { "allowNull": false });
    }
    defineView() {
        this.alias('user_resource_id', 'user_id');
        this.alias('device_resource_id', 'device_id');
        this.alias('created_at', 'created_at');
        this.alias('updated_at', 'updated_at');
    }
    defineIndexes() {
        this.index({ "columns": ["row_id"], "unique": true });
        this.index({ "columns": ["user_resource_id"] });
        this.index({ "columns": ["device_resource_id"] });
        this.index({ "columns": ["updated_at"] });
    }
}
exports.default = MembershipsDevices;
//# sourceMappingURL=memberships-devices.js.map