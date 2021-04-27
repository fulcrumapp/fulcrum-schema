"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tableDefinition = _interopRequireDefault(require("../../table-definition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MembershipsDevices extends _tableDefinition.default {
  get name() {
    return 'query_memberships_devices';
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
    this.integer('device_id', {
      "allowNull": false
    });
    this.string('device_resource_id', {});
    this.timestamp('created_at', {
      "allowNull": false
    });
    this.timestamp('updated_at', {
      "allowNull": false
    });
  }

  defineView() {
    this.alias('user_resource_id', 'user_id');
    this.alias('device_resource_id', 'device_id');
    this.alias('created_at', 'created_at');
    this.alias('updated_at', 'updated_at');
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
      "columns": ["device_resource_id"]
    });
    this.index({
      "columns": ["updated_at"]
    });
  }

}

exports.default = MembershipsDevices;
//# sourceMappingURL=memberships-devices.js.map