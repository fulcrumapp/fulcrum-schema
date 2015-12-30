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
    name: 'project_resource_id',
    type: 'string'
  }, {
    name: 'assigned_to_id',
    type: 'integer'
  }, {
    name: 'assigned_to_resource_id',
    type: 'string'
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
  }, {
    name: 'version',
    type: 'integer'
  }, {
    name: 'created_by_id',
    type: 'integer'
  }, {
    name: 'created_by_resource_id',
    type: 'string'
  }, {
    name: 'updated_by_id',
    type: 'integer'
  }, {
    name: 'updated_by_resource_id',
    type: 'string'
  }, {
    name: 'server_created_at',
    type: 'timestamp'
  }, {
    name: 'server_updated_at',
    type: 'timestamp'
  }, {
    name: 'altitude',
    type: 'double'
  }, {
    name: 'speed',
    type: 'double'
  }, {
    name: 'course',
    type: 'double'
  }, {
    name: 'horizontal_accuracy',
    type: 'double'
  }, {
    name: 'vertical_accuracy',
    type: 'double'
  }, {
    name: 'changeset_id',
    type: 'integer'
  }, {
    name: 'changeset_resource_id',
    type: 'string'
  }, {
    name: 'title',
    type: 'string'
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
    name: 'record_project_id',
    type: 'integer'
  }, {
    name: 'record_project_resource_id',
    type: 'string'
  }, {
    name: 'record_assigned_to_id',
    type: 'integer'
  }, {
    name: 'record_assigned_to_resource_id',
    type: 'string'
  }, {
    name: 'record_status',
    type: 'string'
  }, {
    name: 'index', // TODO(zhm) make this work in the app
    type: 'integer'
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
  }, {
    name: 'version',
    type: 'integer'
  }, {
    name: 'created_by_id',
    type: 'integer'
  }, {
    name: 'created_by_resource_id',
    type: 'string'
  }, {
    name: 'updated_by_id',
    type: 'integer'
  }, {
    name: 'updated_by_resource_id',
    type: 'string'
  }, {
    name: 'record_index_text',
    type: 'string'
  }, {
    name: 'altitude',
    type: 'double'
  }, {
    name: 'speed',
    type: 'double'
  }, {
    name: 'course',
    type: 'double'
  }, {
    name: 'horizontal_accuracy',
    type: 'double'
  }, {
    name: 'vertical_accuracy',
    type: 'double'
  }, {
    name: 'title',
    type: 'string'
  }
];

Schema.systemFormViewColumns = {
  record_resource_id: 'id',
  project_resource_id: 'project_id',
  assigned_to_resource_id: 'assigned_to_id',
  status: 'status',
  latitude: 'latitude',
  longitude: 'longitude',
  created_at: 'created_at',
  updated_at: 'updated_at',
  version: 'version',
  created_by_resource_id: 'created_by_id',
  updated_by_resource_id: 'updated_by_id',
  server_created_at: 'server_created_at',
  server_updated_at: 'server_updated_at',
  geometry: 'geometry',
  altitude: 'altitude',
  speed: 'speed',
  course: 'course',
  horizontal_accuracy: 'horizontal_accuracy',
  vertical_accuracy: 'vertical_accuracy',
  changeset_resource_id: 'changeset_id',
  title: 'title'
};

Schema.systemRepeatableViewColumns = {
  resource_id: 'id',
  record_resource_id: 'record_id',
  parent_resource_id: 'parent_id',
  latitude: 'latitude',
  longitude: 'longitude',
  created_at: 'created_at',
  updated_at: 'updated_at',
  version: 'version',
  created_by_resource_id: 'created_by_id',
  updated_by_resource_id: 'updated_by_id',
  record_index_text: 'record_index_text',
  altitude: 'altitude',
  speed: 'speed',
  course: 'course',
  horizontal_accuracy: 'horizontal_accuracy',
  vertical_accuracy: 'vertical_accuracy',
  title: 'title'
};

export default Schema;
