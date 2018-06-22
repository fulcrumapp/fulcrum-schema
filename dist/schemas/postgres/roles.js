'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tableDefinition = require('../../table-definition');

var _tableDefinition2 = _interopRequireDefault(_tableDefinition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Roles = function (_TableDefinition) {
  _inherits(Roles, _TableDefinition);

  function Roles() {
    _classCallCheck(this, Roles);

    return _possibleConstructorReturn(this, (Roles.__proto__ || Object.getPrototypeOf(Roles)).apply(this, arguments));
  }

  _createClass(Roles, [{
    key: 'defineTable',
    value: function defineTable() {
      this.pk('id', {});
      this.integer('row_id', { "allowNull": false });
      this.string('row_resource_id', { "allowNull": false });
      this.string('name', { "allowNull": false });
      this.string('description', {});
      this.integer('created_by_id', {});
      this.string('created_by_resource_id', {});
      this.integer('updated_by_id', {});
      this.string('updated_by_resource_id', {});
      this.timestamp('created_at', { "allowNull": false });
      this.timestamp('updated_at', { "allowNull": false });
      this.boolean('is_system', { "allowNull": false });
      this.boolean('is_default', { "allowNull": false });
      this.boolean('can_manage_subscription', { "allowNull": false, "defaultValue": false });
      this.boolean('can_update_organization', { "allowNull": false, "defaultValue": false });
      this.boolean('can_manage_members', { "allowNull": false, "defaultValue": false });
      this.boolean('can_manage_roles', { "allowNull": false, "defaultValue": false });
      this.boolean('can_manage_apps', { "allowNull": false, "defaultValue": false });
      this.boolean('can_manage_projects', { "allowNull": false, "defaultValue": false });
      this.boolean('can_manage_choice_lists', { "allowNull": false, "defaultValue": false });
      this.boolean('can_manage_classification_sets', { "allowNull": false, "defaultValue": false });
      this.boolean('can_create_records', { "allowNull": false, "defaultValue": false });
      this.boolean('can_update_records', { "allowNull": false, "defaultValue": false });
      this.boolean('can_delete_records', { "allowNull": false, "defaultValue": false });
      this.boolean('can_change_status', { "allowNull": false, "defaultValue": false });
      this.boolean('can_change_project', { "allowNull": false, "defaultValue": false });
      this.boolean('can_assign_records', { "allowNull": false, "defaultValue": false });
      this.boolean('can_import_records', { "allowNull": false, "defaultValue": false });
      this.boolean('can_export_records', { "allowNull": false, "defaultValue": false });
      this.boolean('can_run_reports', { "allowNull": false, "defaultValue": false });
      this.boolean('can_manage_authorizations', { "allowNull": false, "defaultValue": false });
    }
  }, {
    key: 'defineView',
    value: function defineView() {
      this.alias('row_resource_id', 'role_id');
      this.alias('name', 'name');
      this.alias('description', 'description');
      this.alias('created_by_resource_id', 'created_by_id');
      this.alias('updated_by_resource_id', 'updated_by_id');
      this.alias('created_at', 'created_at');
      this.alias('updated_at', 'updated_at');
      this.alias('is_system', 'is_system');
      this.alias('is_default', 'is_default');
      this.alias('can_manage_subscription', 'can_manage_subscription');
      this.alias('can_update_organization', 'can_update_organization');
      this.alias('can_manage_members', 'can_manage_members');
      this.alias('can_manage_roles', 'can_manage_roles');
      this.alias('can_manage_apps', 'can_manage_apps');
      this.alias('can_manage_projects', 'can_manage_projects');
      this.alias('can_manage_choice_lists', 'can_manage_choice_lists');
      this.alias('can_manage_classification_sets', 'can_manage_classification_sets');
      this.alias('can_create_records', 'can_create_records');
      this.alias('can_update_records', 'can_update_records');
      this.alias('can_delete_records', 'can_delete_records');
      this.alias('can_change_status', 'can_change_status');
      this.alias('can_change_project', 'can_change_project');
      this.alias('can_assign_records', 'can_assign_records');
      this.alias('can_import_records', 'can_import_records');
      this.alias('can_export_records', 'can_export_records');
      this.alias('can_run_reports', 'can_run_reports');
      this.alias('can_manage_authorizations', 'can_manage_authorizations');
    }
  }, {
    key: 'defineIndexes',
    value: function defineIndexes() {
      this.index({ "columns": ["row_resource_id"], "unique": true });
      this.index({ "columns": ["row_id"], "unique": true });
      this.index({ "columns": ["name"] });
      this.index({ "columns": ["updated_at"] });
    }
  }, {
    key: 'name',
    get: function get() {
      return 'roles';
    }
  }]);

  return Roles;
}(_tableDefinition2.default);

exports.default = Roles;
//# sourceMappingURL=roles.js.map