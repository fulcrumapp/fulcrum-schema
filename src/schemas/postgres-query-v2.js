import _ from 'underscore';

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
    type: 'integer',
    allowNull: false
  }, {
    name: 'created_by_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'created_by_resource_id',
    type: 'string'
  }, {
    name: 'updated_by_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'updated_by_resource_id',
    type: 'string'
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
    name: 'record_resource_id',
    type: 'string'
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
    name: 'resource_id',
    type: 'string',
    allowNull: false
  }, {
    name: 'record_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'record_resource_id',
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
    type: 'integer',
    allowNull: false
  }, {
    name: 'created_by_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'created_by_resource_id',
    type: 'string'
  }, {
    name: 'updated_by_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'updated_by_resource_id',
    type: 'string'
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
    name: 'changeset_resource_id',
    type: 'string'
  }, {
    name: 'title',
    type: 'string'
  }
];

// - changesets
// - forms
// - choice lists
// - classification sets
// - projects
// - memberships
// - photos
// - videos
// - audio
// - signatures

Schema.systemChangesetsTable = [
  {
    name: 'id',
    type: 'pk'
  }, {
    name: 'row_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'row_resource_id',
    type: 'string',
    allowNull: false
  }, {
    name: 'form_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'form_resource_id',
    type: 'string'
  }, {
    name: 'metadata',
    type: 'string'
  }, {
    name: 'closed_at',
    type: 'timestamp'
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
    name: 'closed_by_id',
    type: 'integer'
  }, {
    name: 'closed_by_resource_id',
    type: 'string'
  }, {
    name: 'created_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'updated_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'min_lat',
    type: 'double'
  }, {
    name: 'max_lat',
    type: 'double'
  }, {
    name: 'min_lon',
    type: 'double'
  }, {
    name: 'max_lon',
    type: 'double'
  }, {
    name: 'number_of_changes',
    type: 'integer'
  }, {
    name: 'number_of_creates',
    type: 'integer'
  }, {
    name: 'number_of_updates',
    type: 'integer'
  }, {
    name: 'number_of_deletes',
    type: 'integer'
  }, {
    name: 'metadata_index_text',
    type: 'string'
  }, {
    name: 'metadata_index',
    type: 'fts'
  }
];

Schema.systemFormsTable = [
  {
    name: 'id',
    type: 'pk'
  }, {
    name: 'row_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'row_resource_id',
    type: 'string',
    allowNull: false
  }, {
    name: 'name',
    type: 'string',
    allowNull: false
  }, {
    name: 'description',
    type: 'string'
  }, {
    name: 'version',
    type: 'integer',
    allowNull: false
  }, {
    name: 'elements',
    type: 'string'
  }, {
    name: 'bounding_box',
    type: 'geometry'
  }, {
    name: 'record_count',
    type: 'integer',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'record_changed_at',
    type: 'timestamp'
  }, {
    name: 'recent_lat_longs',
    type: 'json'
  }, {
    name: 'status',
    type: 'string'
  }, {
    name: 'status_field',
    type: 'string'
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
    name: 'created_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'updated_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'photo_usage',
    type: 'integer'
  }, {
    name: 'photo_count',
    type: 'integer'
  }, {
    name: 'video_usage',
    type: 'integer'
  }, {
    name: 'video_count',
    type: 'integer'
  }, {
    name: 'audio_usage',
    type: 'integer'
  }, {
    name: 'audio_count',
    type: 'integer'
  }, {
    name: 'signature_usage',
    type: 'integer'
  }, {
    name: 'signature_count',
    type: 'integer'
  }, {
    name: 'media_usage',
    type: 'integer'
  }, {
    name: 'media_count',
    type: 'integer'
  }, {
    name: 'auto_assign',
    type: 'boolean',
    allowNull: false,
    defaultValues: 0
  }, {
    name: 'title_field_keys',
    type: 'array'
  }, {
    name: 'hidden_on_dashboard',
    type: 'boolean',
    allowNull: false
  }, {
    name: 'geometry_types',
    type: 'array'
  }, {
    name: 'geometry_required',
    type: 'boolean',
    allowNull: false
  }, {
    name: 'script',
    type: 'text'
  }, {
    name: 'image',
    type: 'text'
  }, {
    name: 'projects_enabled',
    type: 'boolean',
    allowNull: false
  }, {
    name: 'assignment_enabled',
    type: 'boolean',
    allowNull: false
  }
];

Schema.systemChoiceListsTable = [
  {
    name: 'id',
    type: 'pk'
  }, {
    name: 'row_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'row_resource_id',
    type: 'string',
    allowNull: false
  }, {
    name: 'name',
    type: 'string',
    allowNull: false
  }, {
    name: 'description',
    type: 'string'
  }, {
    name: 'version',
    type: 'integer',
    allowNull: false
  }, {
    name: 'items',
    type: 'string',
    allowNull: false
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
    name: 'created_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'updated_at',
    type: 'timestamp',
    allowNull: false
  }
];

Schema.systemClassificationSetsTable = [
  {
    name: 'id',
    type: 'pk'
  }, {
    name: 'row_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'row_resource_id',
    type: 'string',
    allowNull: false
  }, {
    name: 'name',
    type: 'string',
    allowNull: false
  }, {
    name: 'description',
    type: 'string'
  }, {
    name: 'version',
    type: 'integer',
    allowNull: false
  }, {
    name: 'items',
    type: 'string',
    allowNull: false
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
    name: 'created_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'updated_at',
    type: 'timestamp',
    allowNull: false
  }
];

Schema.systemProjectsTable = [
  {
    name: 'id',
    type: 'pk'
  }, {
    name: 'row_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'row_resource_id',
    type: 'string',
    allowNull: false
  }, {
    name: 'name',
    type: 'string',
    allowNull: false
  }, {
    name: 'description',
    type: 'string'
  }, {
    name: 'created_by_id',
    type: 'integer'
  }, {
    name: 'created_by_resource_id',
    type: 'string'
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

Schema.systemRolesTable = [
  {
    name: 'id',
    type: 'pk'
  }, {
    name: 'row_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'row_resource_id',
    type: 'string',
    allowNull: false
  }, {
    name: 'name',
    type: 'string',
    allowNull: false
  }, {
    name: 'description',
    type: 'string'
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
    name: 'created_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'updated_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'is_system',
    type: 'boolean',
    allowNull: false
  }, {
    name: 'is_default',
    type: 'boolean',
    allowNull: false
  }, {
    name: 'can_manage_subscription',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'can_update_organization',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'can_manage_members',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'can_manage_roles',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'can_manage_apps',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'can_manage_projects',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'can_manage_choice_lists',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'can_manage_classification_sets',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'can_create_records',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'can_update_records',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'can_delete_records',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'can_change_status',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'can_change_project',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'can_assign_records',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'can_import_records',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'can_export_records',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }, {
    name: 'can_run_reports',
    type: 'boolean',
    allowNull: false,
    defaultValue: 0
  }
];

Schema.systemMembershipsTable = [
  {
    name: 'id',
    type: 'pk'
  }, {
    name: 'row_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'row_resource_id',
    type: 'string',
    allowNull: false
  }, {
    name: 'user_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'user_resource_id',
    type: 'string'
  }, {
    name: 'first_name',
    type: 'string'
  }, {
    name: 'last_name',
    type: 'string'
  }, {
    name: 'name',
    type: 'string'
  }, {
    name: 'email',
    type: 'string'
  }, {
    name: 'role_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'role_resource_id',
    type: 'string',
    allowNull: false
  }, {
    name: 'role_name',
    type: 'string',
    allowNull: false
  }, {
    name: 'status',
    type: 'string'
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

Schema.systemPhotosTable = [
  {
    name: 'id',
    type: 'pk'
  }, {
    name: 'row_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'row_resource_id',
    type: 'string',
    allowNull: false
  }, {
    name: 'access_key',
    type: 'string',
    allowNull: false
  }, {
    name: 'record_id',
    type: 'integer'
  }, {
    name: 'record_resource_id',
    type: 'string'
  }, {
    name: 'form_id',
    type: 'integer'
  }, {
    name: 'form_resource_id',
    type: 'string'
  }, {
    name: 'exif',
    type: 'string'
  }, {
    name: 'file_size',
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
    name: 'created_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'updated_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'file',
    type: 'string'
  }, {
    name: 'content_type',
    type: 'string'
  }, {
    name: 'uploaded_at',
    type: 'timestamp'
  }, {
    name: 'stored_at',
    type: 'timestamp'
  }, {
    name: 'processed_at',
    type: 'timestamp'
  }, {
    name: 'geometry',
    type: 'geometry'
  }, {
    name: 'latitude',
    type: 'double'
  }, {
    name: 'longitude',
    type: 'double'
  }, {
    name: 'accuracy',
    type: 'double'
  }, {
    name: 'width',
    type: 'integer'
  }, {
    name: 'height',
    type: 'integer'
  }
];

Schema.systemVideosTable = [
  {
    name: 'id',
    type: 'pk'
  }, {
    name: 'row_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'row_resource_id',
    type: 'string',
    allowNull: false
  }, {
    name: 'access_key',
    type: 'string',
    allowNull: false
  }, {
    name: 'record_id',
    type: 'integer'
  }, {
    name: 'record_resource_id',
    type: 'string'
  }, {
    name: 'form_id',
    type: 'integer'
  }, {
    name: 'form_resource_id',
    type: 'string'
  }, {
    name: 'metadata',
    type: 'string'
  }, {
    name: 'file_size',
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
    name: 'created_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'updated_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'file',
    type: 'string'
  }, {
    name: 'content_type',
    type: 'string'
  }, {
    name: 'uploaded_at',
    type: 'timestamp'
  }, {
    name: 'stored_at',
    type: 'timestamp'
  }, {
    name: 'processed_at',
    type: 'timestamp'
  }, {
    name: 'small_processed_at',
    type: 'timestamp'
  }, {
    name: 'medium_processed_at',
    type: 'timestamp'
  }, {
    name: 'has_track',
    type: 'boolean'
  }, {
    name: 'track',
    type: 'string'
  }, {
    name: 'geometry',
    type: 'geometry'
  }, {
    name: 'width',
    type: 'integer'
  }, {
    name: 'height',
    type: 'integer'
  }, {
    name: 'duration',
    type: 'double'
  }
];

Schema.systemAudioTable = [
  {
    name: 'id',
    type: 'pk'
  }, {
    name: 'row_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'row_resource_id',
    type: 'string',
    allowNull: false
  }, {
    name: 'access_key',
    type: 'string',
    allowNull: false
  }, {
    name: 'record_id',
    type: 'integer'
  }, {
    name: 'record_resource_id',
    type: 'string'
  }, {
    name: 'form_id',
    type: 'integer'
  }, {
    name: 'form_resource_id',
    type: 'string'
  }, {
    name: 'metadata',
    type: 'string'
  }, {
    name: 'file_size',
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
    name: 'created_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'updated_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'file',
    type: 'string'
  }, {
    name: 'content_type',
    type: 'string'
  }, {
    name: 'uploaded_at',
    type: 'timestamp'
  }, {
    name: 'stored_at',
    type: 'timestamp'
  }, {
    name: 'processed_at',
    type: 'timestamp'
  }, {
    name: 'small_processed_at',
    type: 'timestamp'
  }, {
    name: 'medium_processed_at',
    type: 'timestamp'
  }, {
    name: 'has_track',
    type: 'boolean'
  }, {
    name: 'track',
    type: 'string'
  }, {
    name: 'geometry',
    type: 'geometry'
  }, {
    name: 'duration',
    type: 'double'
  }
];

Schema.systemSignaturesTable = [
  {
    name: 'id',
    type: 'pk'
  }, {
    name: 'row_id',
    type: 'integer',
    allowNull: false
  }, {
    name: 'row_resource_id',
    type: 'string',
    allowNull: false
  }, {
    name: 'access_key',
    type: 'string',
    allowNull: false
  }, {
    name: 'record_id',
    type: 'integer'
  }, {
    name: 'record_resource_id',
    type: 'string'
  }, {
    name: 'form_id',
    type: 'integer'
  }, {
    name: 'form_resource_id',
    type: 'string'
  }, {
    name: 'exif',
    type: 'string'
  }, {
    name: 'file_size',
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
    name: 'created_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'updated_at',
    type: 'timestamp',
    allowNull: false
  }, {
    name: 'file',
    type: 'string'
  }, {
    name: 'content_type',
    type: 'string'
  }, {
    name: 'uploaded_at',
    type: 'timestamp'
  }, {
    name: 'stored_at',
    type: 'timestamp'
  }, {
    name: 'processed_at',
    type: 'timestamp'
  }
];

Schema.systemFormViewColumns = {
  record_resource_id: 'record_id',
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

Schema.systemFormFullViewColumns = _.clone(Schema.systemFormViewColumns);
Schema.systemFormFullViewColumns.form_values = 'form_values';
Schema.systemFormFullViewColumns.record_index = 'record_index';
Schema.systemFormFullViewColumns.record_index_text = 'record_index_text';

Schema.systemRepeatableViewColumns = {
  resource_id: 'child_record_id',
  record_resource_id: 'record_id',
  parent_resource_id: 'parent_id',
  record_project_resource_id: 'record_project_id',
  record_assigned_to_resource_id: 'record_assigned_to_id',
  record_status: 'record_status',
  index: 'index',
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
  changeset_resource_id: 'changeset_id',
  title: 'title'
};

Schema.systemRepeatableFullViewColumns = _.clone(Schema.systemRepeatableViewColumns);
Schema.systemRepeatableFullViewColumns.form_values = 'form_values';
Schema.systemRepeatableFullViewColumns.record_index = 'record_index';
Schema.systemRepeatableFullViewColumns.record_index_text = 'record_index_text';

Schema.systemValuesViewColumns = {
  record_resource_id: 'record_id',
  parent_resource_id: 'child_record_id',
  key: 'key',
  text_value: 'text_value'
};

Schema.organizationViews = {};
Schema.organizationIndexes = {};

Schema.organizationViews.changesets = {
  row_resource_id: '_changeset_id',
  form_resource_id: '_form_id',
  metadata: 'metadata',
  metadata_index: '_metadata_index',
  closed_at: 'closed_at',
  created_by_resource_id: '_created_by_id',
  updated_by_resource_id: '_updated_by_id',
  closed_by_resource_id: '_closed_by_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  min_lat: 'min_lat',
  max_lat: 'max_lat',
  min_lon: 'min_lon',
  max_lon: 'max_lon',
  number_of_changes: 'number_of_changes',
  number_of_creates: 'number_of_creates',
  number_of_updates: 'number_of_updates',
  number_of_deletes: 'number_of_deletes'
};

Schema.organizationIndexes.changesets = [
  { columns: [ 'row_resource_id' ] },
  { columns: [ 'form_id' ] },
  { columns: [ 'metadata_index' ], method: 'gin' },
  { columns: [ 'form_id', 'updated_at' ] },
  { columns: [ 'updated_at' ] }
];

Schema.organizationViews.forms = {
  row_resource_id: '_form_id',
  name: 'name',
  description: 'description',
  version: 'version',
  elements: 'elements',
  bounding_box: 'bounding_box',
  status: 'status',
  status_field: 'status_field',
  created_by_resource_id: '_created_by_id',
  updated_by_resource_id: '_updated_by_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  auto_assign: 'auto_assign',
  title_field_keys: 'title_field_keys',
  hidden_on_dashboard: 'hidden_on_dashboard',
  geometry_types: 'geometry_types',
  geometry_required: 'geometry_required',
  script: 'script',
  projects_enabled: 'projects_enabled',
  assignment_enabled: 'assignment_enabled',
  image: 'image'
};

Schema.organizationIndexes.forms = [
  { columns: [ 'row_resource_id' ] },
  { columns: [ 'name' ] },
  { columns: [ 'updated_at' ] }
];

Schema.organizationViews.choice_lists = {
  row_resource_id: '_choice_list_id',
  name: 'name',
  description: 'description',
  version: 'version',
  items: 'items',
  created_by_resource_id: '_created_by_id',
  updated_by_resource_id: '_updated_by_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

Schema.organizationIndexes.choice_lists = [
  { columns: [ 'row_resource_id' ] },
  { columns: [ 'name' ] },
  { columns: [ 'updated_at' ] }
];

Schema.organizationViews.classification_sets = {
  row_resource_id: '_classification_set_id',
  name: 'name',
  description: 'description',
  version: 'version',
  items: 'items',
  created_by_resource_id: '_created_by_id',
  updated_by_resource_id: '_updated_by_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

Schema.organizationIndexes.classification_sets = [
  { columns: [ 'row_resource_id' ] },
  { columns: [ 'name' ] },
  { columns: [ 'updated_at' ] }
];

Schema.organizationViews.projects = {
  row_resource_id: '_project_id',
  name: 'name',
  description: 'description',
  created_by_resource_id: '_created_by_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

Schema.organizationIndexes.projects = [
  { columns: [ 'row_resource_id' ] },
  { columns: [ 'name' ] },
  { columns: [ 'updated_at' ] }
];

Schema.organizationViews.roles = {
  row_resource_id: '_role_id',
  name: 'name',
  description: 'description',
  created_by_resource_id: '_created_by_id',
  updated_by_resource_id: '_updated_by_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_system: 'is_system',
  is_default: 'is_default',
  can_manage_subscription: 'can_manage_subscription',
  can_update_organization: 'can_update_organization',
  can_manage_members: 'can_manage_members',
  can_manage_roles: 'can_manage_roles',
  can_manage_apps: 'can_manage_apps',
  can_manage_projects: 'can_manage_projects',
  can_manage_choice_lists: 'can_manage_choice_lists',
  can_manage_classification_sets: 'can_manage_classification_sets',
  can_create_records: 'can_create_records',
  can_update_records: 'can_update_records',
  can_delete_records: 'can_delete_records',
  can_change_status: 'can_change_status',
  can_change_project: 'can_change_project',
  can_assign_records: 'can_assign_records',
  can_import_records: 'can_import_records',
  can_export_records: 'can_export_records',
  can_run_reports: 'can_run_reports'
};

Schema.organizationIndexes.roles = [
  { columns: [ 'row_resource_id' ] },
  { columns: [ 'name' ] },
  { columns: [ 'updated_at' ] }
];

Schema.organizationViews.memberships = {
  row_resource_id: '_membership_id',
  user_resource_id: '_user_id',
  first_name: 'first_name',
  last_name: 'last_name',
  name: 'name',
  email: 'email',
  role_resource_id: '_role_id',
  role_name: 'role_name',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

Schema.organizationIndexes.memberships = [
  { columns: [ 'row_resource_id' ] },
  { columns: [ 'user_resource_id' ] },
  { columns: [ 'role_resource_id' ] },
  { columns: [ 'name' ] },
  { columns: [ 'updated_at' ] }
];

Schema.organizationViews.photos = {
  access_key: '_photo_id',
  exif: 'exif',
  file_size: 'file_size',
  record_resource_id: '_record_id',
  form_resource_id: '_form_id',
  created_by_resource_id: '_created_by_id',
  updated_by_resource_id: '_updated_by_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  file: 'file',
  content_type: 'content_type',
  uploaded_at: 'uploaded_at',
  stored_at: 'stored_at',
  processed_at: 'processed_at',
  geometry: 'geometry',
  latitude: 'latitude',
  longitude: 'longitude',
  accuracy: 'accuracy',
  width: 'width',
  height: 'height'
};

Schema.organizationIndexes.photos = [
  { columns: [ 'access_key' ] },
  { columns: [ 'record_resource_id' ] },
  { columns: [ 'form_resource_id' ] },
  { columns: [ 'created_by_resource_id' ] },
  { columns: [ 'geometry' ], method: 'gist' },
  { columns: [ 'updated_at' ] }
];

Schema.organizationViews.videos = {
  access_key: '_video_id',
  metadata: 'metadata',
  file_size: 'file_size',
  record_resource_id: '_record_id',
  form_resource_id: '_form_id',
  created_by_resource_id: '_created_by_id',
  updated_by_resource_id: '_updated_by_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  file: 'file',
  content_type: 'content_type',
  uploaded_at: 'uploaded_at',
  stored_at: 'stored_at',
  processed_at: 'processed_at',
  has_track: 'has_track',
  track: 'track',
  geometry: 'geometry',
  width: 'width',
  height: 'height',
  duration: 'duration'
};

Schema.organizationIndexes.videos = [
  { columns: [ 'access_key' ] },
  { columns: [ 'record_resource_id' ] },
  { columns: [ 'form_resource_id' ] },
  { columns: [ 'created_by_resource_id' ] },
  { columns: [ 'geometry' ], method: 'gist' },
  { columns: [ 'updated_at' ] }
];

Schema.organizationViews.audio = {
  access_key: '_audio_id',
  metadata: 'metadata',
  file_size: 'file_size',
  record_resource_id: '_record_id',
  form_resource_id: '_form_id',
  created_by_resource_id: 'created_by_id',
  updated_by_resource_id: 'updated_by_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  file: 'file',
  content_type: 'content_type',
  uploaded_at: 'uploaded_at',
  stored_at: 'stored_at',
  processed_at: 'processed_at',
  has_track: 'has_track',
  track: 'track',
  geometry: 'geometry',
  duration: 'duration'
};

Schema.organizationIndexes.audio = [
  { columns: [ 'access_key' ] },
  { columns: [ 'record_resource_id' ] },
  { columns: [ 'form_resource_id' ] },
  { columns: [ 'created_by_resource_id' ] },
  { columns: [ 'geometry' ], method: 'gist' },
  { columns: [ 'updated_at' ] }
];

Schema.organizationViews.signatures = {
  access_key: '_signature_id',
  file_size: 'file_size',
  record_resource_id: '_record_id',
  form_resource_id: '_form_id',
  created_by_resource_id: 'created_by_id',
  updated_by_resource_id: 'updated_by_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  file: 'file',
  content_type: 'content_type',
  uploaded_at: 'uploaded_at',
  stored_at: 'stored_at',
  processed_at: 'processed_at'
};

Schema.organizationIndexes.signatures = [
  { columns: [ 'access_key' ] },
  { columns: [ 'record_resource_id' ] },
  { columns: [ 'form_resource_id' ] },
  { columns: [ 'created_by_resource_id' ] },
  { columns: [ 'updated_at' ] }
];

Schema.systemFormTableIndexes = [
  { columns: [ 'record_resource_id' ], method: 'btree', unique: true },
  { columns: [ 'geometry' ], method: 'gist' },
  { columns: [ 'record_index' ], method: 'gin' }
];

Schema.systemRepeatableTableIndexes = [
  { columns: [ 'resource_id' ], method: 'btree', unique: true },
  { columns: [ 'record_resource_id' ], method: 'btree' },
  { columns: [ 'parent_resource_id' ], method: 'btree' },
  { columns: [ 'geometry' ], method: 'gist' },
  { columns: [ 'record_index' ], method: 'gin' }
];

Schema.systemValuesTableIndexes = [
  { columns: [ 'record_resource_id' ], method: 'btree' },
  { columns: [ 'parent_resource_id' ], method: 'btree' },
  { columns: [ 'text_value' ], method: 'btree' },
  { columns: [ 'key' ], method: 'btree' }
];

export default Schema;
