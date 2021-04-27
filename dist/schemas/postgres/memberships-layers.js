"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tableDefinition = _interopRequireDefault(require("../../table-definition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MembershipsLayers extends _tableDefinition.default {
  get name() {
    return 'query_memberships_layers';
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
    this.integer('layer_id', {
      "allowNull": false
    });
    this.string('layer_resource_id', {});
  }

  defineView() {
    this.alias('user_resource_id', 'user_id');
    this.alias('layer_resource_id', 'layer_id');
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
      "columns": ["layer_resource_id"]
    });
  }

}

exports.default = MembershipsLayers;
//# sourceMappingURL=memberships-layers.js.map