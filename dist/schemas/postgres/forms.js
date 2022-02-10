"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tableDefinition = _interopRequireDefault(require("../../table-definition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Forms = /*#__PURE__*/function (_TableDefinition) {
  _inheritsLoose(Forms, _TableDefinition);

  function Forms() {
    return _TableDefinition.apply(this, arguments) || this;
  }

  var _proto = Forms.prototype;

  _proto.defineTable = function defineTable() {
    this.pk('id', {});
    this.integer('row_id', {
      "allowNull": false
    });
    this.string('row_resource_id', {
      "allowNull": false
    });
    this.string('name', {
      "allowNull": false
    });
    this.string('description', {});
    this.integer('version', {
      "allowNull": false
    });
    this.string('elements', {});
    this.geometry('bounding_box', {});
    this.integer('record_count', {
      "allowNull": false,
      "defaultValue": 0
    });
    this.timestamp('record_changed_at', {});
    this.json('recent_lat_longs', {});
    this.string('status', {});
    this.string('status_field', {});
    this.integer('created_by_id', {});
    this.string('created_by_resource_id', {});
    this.integer('updated_by_id', {});
    this.string('updated_by_resource_id', {});
    this.timestamp('created_at', {
      "allowNull": false
    });
    this.timestamp('updated_at', {
      "allowNull": false
    });
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
    this["boolean"]('auto_assign', {
      "allowNull": false
    });
    this.json('title_field_keys', {});
    this["boolean"]('hidden_on_dashboard', {
      "allowNull": false
    });
    this.json('geometry_types', {});
    this["boolean"]('geometry_required', {
      "allowNull": false
    });
    this.text('script', {});
    this.text('image', {});
    this["boolean"]('projects_enabled', {
      'allowNull': false
    });
    this["boolean"]('assignment_enabled', {
      'allowNull': false
    });
    this.text('system_type', {});
  };

  _proto.defineView = function defineView() {
    this.alias('row_resource_id', 'form_id');
    this.alias('name', 'name');
    this.alias('description', 'description');
    this.alias('version', 'version');
    this.alias('elements', 'elements');
    this.alias('bounding_box', 'bounding_box');
    this.alias('status', 'status');
    this.alias('status_field', 'status_field');
    this.alias('created_by_resource_id', 'created_by_id');
    this.alias('updated_by_resource_id', 'updated_by_id');
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
  };

  _proto.defineIndexes = function defineIndexes() {
    this.index({
      "columns": ["row_resource_id"],
      "unique": true
    });
    this.index({
      "columns": ["row_id"],
      "unique": true
    });
    this.index({
      "columns": ["name"]
    });
    this.index({
      "columns": ["updated_at"]
    });
  };

  _createClass(Forms, [{
    key: "name",
    get: function get() {
      return 'forms';
    }
  }]);

  return Forms;
}(_tableDefinition["default"]);

exports["default"] = Forms;
//# sourceMappingURL=forms.js.map