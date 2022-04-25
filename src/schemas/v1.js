// The v1 schema is used by the iOS and Android apps

const Schema = {};

Schema.systemFormTableColumns = [
  {
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
  }
];

Schema.systemValuesTableColumns = [
  {
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
  }
];

Schema.systemRepeatableTableColumns = [
  {
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
  }
];

Schema.systemFormViewColumns = null;

Schema.systemRepeatableViewColumns = null;

Schema.systemFormTableIndexes = [
  { columns: [ 'record_id' ], method: 'btree' },
  { columns: [ 'record_resource_id' ], method: 'btree' }
];

Schema.systemRepeatableTableIndexes = [
  { columns: [ 'resource_id' ], method: 'btree' },
  { columns: [ 'record_id' ], method: 'btree' },
  { columns: [ 'record_resource_id' ], method: 'btree' },
  { columns: [ 'parent_resource_id' ], method: 'btree' }
];

Schema.systemValuesTableIndexes = [
  { columns: [ 'record_id' ], method: 'btree' },
  { columns: [ 'parent_resource_id' ], method: 'btree' }
];

// V1 didn't emit `_caption` columns for media fields
Schema.includeMediaCaptions = false;

export default Schema;
