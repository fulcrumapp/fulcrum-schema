import TableDefinition from '../../table-definition';

export default class Devices extends TableDefinition {
  get name() {
    return 'query_devices'
  }

  defineTable() {
    this.pk('id', {});
    this.integer('row_id', {"allowNull":false});
    this.string('row_resource_id', {"allowNull":false});
    this.string('identifier', {"allowNull":false});
    this.string('platform', {});
    this.string('platform_version', {});
    this.string('manufacturer', {});
    this.string('model', {});
    this.string('application_version', {});
    this.string('application_build', {});
    this.string('ip_address', {});
    this.string('location', {});
    this.double('latitude', {});
    this.double('longitude', {});
    this.double('accuracy', {});
    this.string('locality', {});
    this.string('admin_area', {});
    this.string('postal_code', {});
    this.string('country', {});
    this.timestamp('created_at', {"allowNull":false});
    this.timestamp('updated_at', {"allowNull":false});
  }

  defineView() {
    this.alias('row_resource_id', 'device_id');
    this.alias('identifier', 'identifier');
    this.alias('platform', 'platform');
    this.alias('platform_version', 'platform_version');
    this.alias('manufacturer', 'manufacturer');
    this.alias('model', 'model');
    this.alias('application_version', 'application_version');
    this.alias('application_build', 'application_build');
    this.alias('ip_address', 'ip_address');
    this.alias('location', 'location');
    this.alias('latitude', 'latitude');
    this.alias('longitude', 'longitude');
    this.alias('accuracy', 'accuracy');
    this.alias('locality', 'locality');
    this.alias('admin_area', 'admin_area');
    this.alias('country', 'country');
    this.alias('created_at', 'created_at');
    this.alias('updated_at', 'updated_at');
  }

  defineIndexes() {
    this.index({"columns":["row_resource_id"],"unique":true});
    this.index({"columns":["row_id"],"unique":true});
    this.index({"columns":["identifier"]});
    this.index({"columns":["platform"]});
    this.index({"columns":["manufacturer"]});
    this.index({"columns":["updated_at"]});
  }
}
