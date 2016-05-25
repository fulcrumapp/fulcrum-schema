import TableDefinition from '../../table-definition';

export default class Forms extends TableDefinition {
  get name() {
    return 'forms'
  }

  defineTable() {
    this.pk('id', {});
    this.integer('row_id', {"allowNull":false});
    this.string('row_resource_id', {"allowNull":false});
    this.string('name', {"allowNull":false});
    this.string('description', {});
    this.integer('version', {"allowNull":false});
    this.string('elements', {});
    this.geometry('bounding_box', {});
    this.integer('record_count', {"allowNull":false,"defaultValue":0});
    this.timestamp('record_changed_at', {});
    this.json('recent_lat_longs', {});
    this.string('status', {});
    this.string('status_field', {});
    this.integer('created_by_id', {});
    this.string('created_by_resource_id', {});
    this.integer('updated_by_id', {});
    this.string('updated_by_resource_id', {});
    this.timestamp('created_at', {"allowNull":false});
    this.timestamp('updated_at', {"allowNull":false});
    this.integer('photo_usage', {});
    this.integer('photo_count', {});
    this.integer('video_usage', {});
    this.integer('video_count', {});
    this.integer('audio_usage', {});
    this.integer('audio_count', {});
    this.integer('signature_usage', {});
    this.integer('signature_count', {});
    this.integer('media_usage', {});
    this.integer('media_count', {});
    this.boolean('auto_assign', {"allowNull":false});
    this.array('title_field_keys', {});
    this.boolean('hidden_on_dashboard', {"allowNull":false});
    this.array('geometry_types', {});
    this.boolean('geometry_required', {"allowNull":false});
    this.text('script', {});
    this.text('image', {});
    this.boolean('projects_enabled', {"allowNull":false});
    this.boolean('assignment_enabled', {"allowNull":false});
  }

  defineView() {
    this.alias('row_resource_id', '_form_id');
    this.alias('name', 'name');
    this.alias('description', 'description');
    this.alias('version', 'version');
    this.alias('elements', 'elements');
    this.alias('bounding_box', 'bounding_box');
    this.alias('status', 'status');
    this.alias('status_field', 'status_field');
    this.alias('created_by_resource_id', '_created_by_id');
    this.alias('updated_by_resource_id', '_updated_by_id');
    this.alias('created_at', 'created_at');
    this.alias('updated_at', 'updated_at');
    this.alias('auto_assign', 'auto_assign');
    this.alias('title_field_keys', 'title_field_keys');
    this.alias('hidden_on_dashboard', 'hidden_on_dashboard');
    this.alias('geometry_types', 'geometry_types');
    this.alias('geometry_required', 'geometry_required');
    this.alias('script', 'script');
    this.alias('projects_enabled', 'projects_enabled');
    this.alias('assignment_enabled', 'assignment_enabled');
    this.alias('image', 'image');
  }

  defineIndexes() {
    this.index({"columns":["name"]});
    this.index({"columns":["row_resource_id"]});
    this.index({"columns":["updated_at"]});
  }
}