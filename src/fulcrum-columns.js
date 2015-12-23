const FORM_SYSTEM_COLUMNS = [
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

const FORM_SYSTEM_COLUMNS_FULL = [
  {
    name: 'version',
    type: 'integer',
    allowNull: false
  }, {
    name: 'created_by_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'updated_by_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'server_created_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'server_updated_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'record_index_text',
    type: 'string'
  }, {
    name: 'record_index',
    type: 'fts'
  }, {
    name: 'geometry',
    type: 'geometry'
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
    name: 'form_values',
    type: 'text'
  }, {
    name: 'changeset_id',
    type: 'integer'
  }, {
    name: 'title',
    type: 'string'
  }
];

const FORM_VALUE_COLUMNS = [
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

const FORM_VIEW_SYSTEM_COLUMNS = {
  record_resource_id: 'id',
  project_id: 'project_id',
  assigned_to_id: 'assigned_to_id',
  status: 'status',
  latitude: 'latitude',
  longitude: 'longitude',
  created_at: 'created_at',
  updated_at: 'updated_at',
  version: 'version',
  created_by_id: 'created_by_id',
  updated_by_id: 'updated_by_id',
  server_created_at: 'server_created_at',
  server_updated_at: 'server_updated_at',
  record_index_text: 'record_index_text',
  record_index: 'record_index',
  geometry: 'geometry',
  altitude: 'altitude',
  speed: 'speed',
  course: 'course',
  horizontal_accuracy: 'horizontal_accuracy',
  vertical_accuracy: 'vertical_accuracy',
  form_values: 'form_values',
  changeset_id: 'changeset_id',
  title: 'title'
};

const REPEATABLE_VIEW_SYSTEM_COLUMNS = {
  resource_id: 'id',
  record_resource_id: 'record_id',
  parent_resource_id: 'parent_id',
  latitude: 'latitude',
  longitude: 'longitude',
  created_at: 'created_at',
  updated_at: 'updated_at',
  version: 'version',
  created_by_id: 'created_by_id',
  updated_by_id: 'updated_by_id',
  server_created_at: 'server_created_at',
  server_updated_at: 'server_updated_at',
  record_index_text: 'record_index_text',
  record_index: 'record_index',
  geometry: 'geometry',
  altitude: 'altitude',
  speed: 'speed',
  course: 'course',
  horizontal_accuracy: 'horizontal_accuracy',
  vertical_accuracy: 'vertical_accuracy',
  form_values: 'form_values',
  changeset_id: 'changeset_id',
  title: 'title'
};

const REPEATABLE_COLUMNS = [
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

const REPEATABLE_COLUMNS_FULL = [
  {
    name: 'version',
    type: 'integer',
    allowNull: false
  }, {
    name: 'created_by_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'updated_by_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'server_created_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'server_updated_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'record_index_text',
    type: 'string'
  }, {
    name: 'record_index',
    type: 'fts'
  }, {
    name: 'geometry',
    type: 'geometry'
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
    name: 'form_values',
    type: 'text'
  }, {
    name: 'changeset_id',
    type: 'integer'
  }, {
    name: 'title',
    type: 'string'
  }
];

const api = {
  FORM_SYSTEM_COLUMNS: FORM_SYSTEM_COLUMNS,
  FORM_SYSTEM_COLUMNS_FULL: FORM_SYSTEM_COLUMNS_FULL,
  FORM_VALUE_COLUMNS: FORM_VALUE_COLUMNS,
  FORM_VIEW_SYSTEM_COLUMNS: FORM_VIEW_SYSTEM_COLUMNS,
  REPEATABLE_VIEW_SYSTEM_COLUMNS: REPEATABLE_VIEW_SYSTEM_COLUMNS,
  REPEATABLE_COLUMNS: REPEATABLE_COLUMNS,
  REPEATABLE_COLUMNS_FULL: REPEATABLE_COLUMNS_FULL
};

export default api;
