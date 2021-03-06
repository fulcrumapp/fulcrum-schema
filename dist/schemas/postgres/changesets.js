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

var Changesets = /*#__PURE__*/function (_TableDefinition) {
  _inheritsLoose(Changesets, _TableDefinition);

  function Changesets() {
    return _TableDefinition.apply(this, arguments) || this;
  }

  var _proto = Changesets.prototype;

  _proto.defineTable = function defineTable() {
    this.pk('id', {});
    this.integer('row_id', {
      "allowNull": false
    });
    this.string('row_resource_id', {
      "allowNull": false
    });
    this.integer('form_id', {
      "allowNull": false
    });
    this.string('form_resource_id', {});
    this.string('metadata', {});
    this.timestamp('closed_at', {});
    this.integer('created_by_id', {});
    this.string('created_by_resource_id', {});
    this.integer('updated_by_id', {});
    this.string('updated_by_resource_id', {});
    this.integer('closed_by_id', {});
    this.string('closed_by_resource_id', {});
    this.timestamp('created_at', {
      "allowNull": false
    });
    this.timestamp('updated_at', {
      "allowNull": false
    });
    this["double"]('min_lat', {});
    this["double"]('max_lat', {});
    this["double"]('min_lon', {});
    this["double"]('max_lon', {});
    this.integer('number_of_changes', {});
    this.integer('number_of_creates', {});
    this.integer('number_of_updates', {});
    this.integer('number_of_deletes', {});
    this.string('metadata_index_text', {});
    this.fts('metadata_index', {});
  };

  _proto.defineView = function defineView() {
    this.alias('row_resource_id', 'changeset_id');
    this.alias('form_resource_id', 'form_id');
    this.alias('metadata', 'metadata');
    this.alias('metadata_index', 'metadata_index');
    this.alias('closed_at', 'closed_at');
    this.alias('created_by_resource_id', 'created_by_id');
    this.alias('updated_by_resource_id', 'updated_by_id');
    this.alias('closed_by_resource_id', 'closed_by_id');
    this.alias('created_at', 'created_at');
    this.alias('updated_at', 'updated_at');
    this.alias('min_lat', 'min_lat');
    this.alias('max_lat', 'max_lat');
    this.alias('min_lon', 'min_lon');
    this.alias('max_lon', 'max_lon');
    this.alias('number_of_changes', 'number_of_changes');
    this.alias('number_of_creates', 'number_of_creates');
    this.alias('number_of_updates', 'number_of_updates');
    this.alias('number_of_deletes', 'number_of_deletes');
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
      "columns": ["form_id"]
    });
    this.index({
      "columns": ["metadata_index"],
      "method": "gin"
    });
    this.index({
      "columns": ["form_id", "updated_at"]
    });
    this.index({
      "columns": ["updated_at"]
    });
    this.index({
      "columns": ["form_resource_id", "updated_at"]
    });
    this.index({
      "columns": ["created_by_resource_id", "updated_at"]
    });
  };

  _createClass(Changesets, [{
    key: "name",
    get: function get() {
      return 'changesets';
    }
  }]);

  return Changesets;
}(_tableDefinition["default"]);

exports["default"] = Changesets;
//# sourceMappingURL=changesets.js.map