"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tableDefinition = _interopRequireDefault(require("../../table-definition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RecordSeries = /*#__PURE__*/function (_TableDefinition) {
  _inheritsLoose(RecordSeries, _TableDefinition);

  function RecordSeries() {
    return _TableDefinition.apply(this, arguments) || this;
  }

  var _proto = RecordSeries.prototype;

  _proto.defineTable = function defineTable() {
    this.pk('id', {});
    this.integer('row_id', {
      'allowNull': false
    });
    this.string('row_resource_id', {
      'allowNull': false
    });
    this.integer('form_id', {
      'allowNull': false
    });
    this.string('form_resource_id', {
      'allowNull': false
    });
    this.jsonb('template', {});
    this.string('rrule', {});
    this["boolean"]('enabled', {
      'allowNull': false
    });
    this.integer('assigned_to_id', {});
    this.string('assigned_to_resource_id', {});
    this.integer('project_by_id', {});
    this.string('project_resource_id', {});
    this.integer('created_by_id', {});
    this.string('created_by_resource_id', {});
    this.integer('updated_by_id', {});
    this.string('updated_by_resource_id', {});
    this.timestamp('created_at', {
      'allowNull': false
    });
    this.timestamp('updated_at', {
      'allowNull': false
    });
  };

  _proto.defineView = function defineView() {
    this.alias('row_resource_id', 'record_link_id');
    this.alias('form_resource_id', 'form_id');
    this.alias('template', 'template');
    this.alias('rrule', 'rrule');
    this.alias('enabled', 'enabled');
    this.alias('assigned_to_resource_id', 'assigned_to_id');
    this.alias('project_resource_id', 'project_id');
    this.alias('created_by_resource_id', 'created_by_id');
    this.alias('updated_by_resource_id', 'updated_by_id');
    this.alias('created_at', 'created_at');
    this.alias('updated_at', 'updated_at');
  };

  _proto.defineIndexes = function defineIndexes() {
    this.index({
      'columns': ['row_resource_id'],
      'unique': true
    });
    this.index({
      'columns': ['row_id'],
      'unique': true
    });
    this.index({
      'columns': ['form_id', 'key']
    });
    this.index({
      'columns': ['form_resource_id', 'record_resource_id']
    });
    this.index({
      'columns': ['linked_form_resource_id']
    });
    this.index({
      'columns': ['linked_form_resource_id', 'linked_record_resource_id']
    });
    this.index({
      'columns': ['record_resource_id']
    });
    this.index({
      'columns': ['linked_record_resource_id']
    });
  };

  _createClass(RecordSeries, [{
    key: "name",
    get: function get() {
      return 'record_series';
    }
  }]);

  return RecordSeries;
}(_tableDefinition["default"]);

exports["default"] = RecordSeries;
//# sourceMappingURL=record-series.js.map