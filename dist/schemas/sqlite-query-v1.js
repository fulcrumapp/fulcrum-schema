'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Schema = {};

Schema.systemFormTableColumns = [{
  name: 'id',
  type: 'pk'
}, {
  name: 'record_id',
  type: 'integer',
  allowNull: false
}, {
  name: 'record_resource_id',
  type: 'string',
  allowNull: false
}, {
  name: 'project_id',
  type: 'integer'
}, {
  name: 'assigned_to_id',
  type: 'integer'
}, {
  name: 'status',
  type: 'string'
}, {
  name: 'latitude',
  type: 'double'
}, {
  name: 'longitude',
  type: 'double'
}, {
  name: 'created_at',
  type: 'timestamp',
  allowNull: false
}, {
  name: 'updated_at',
  type: 'timestamp',
  allowNull: false
}];

Schema.systemValuesTableColumns = [{
  name: 'id',
  type: 'pk'
}, {
  name: 'record_id',
  type: 'integer',
  allowNull: false
}, {
  name: 'parent_resource_id',
  type: 'string'
}, {
  name: 'key',
  type: 'string',
  allowNull: false
}, {
  name: 'text_value',
  type: 'string'
}, {
  name: 'number_value',
  type: 'double'
}];

Schema.systemRepeatableTableColumns = [{
  name: 'id',
  type: 'pk'
}, {
  name: 'record_id',
  type: 'integer',
  allowNull: false
}, {
  name: 'record_resource_id',
  type: 'string',
  allowNull: false
}, {
  name: 'resource_id',
  type: 'string',
  allowNull: false
}, {
  name: 'parent_resource_id',
  type: 'string'
}, {
  name: 'latitude',
  type: 'double'
}, {
  name: 'longitude',
  type: 'double'
}, {
  name: 'created_at',
  type: 'timestamp',
  allowNull: false
}, {
  name: 'updated_at',
  type: 'timestamp',
  allowNull: false
}];

Schema.systemFormViewColumns = null;

Schema.systemRepeatableViewColumns = null;

// V1 didn't emit `_caption` columns for media fields
Schema.includeMediaCaptions = false;

exports.default = Schema;
//# sourceMappingURL=sqlite-query-v1.js.map