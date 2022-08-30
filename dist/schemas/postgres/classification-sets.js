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

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ClassificationSets = /*#__PURE__*/function (_TableDefinition) {
  _inheritsLoose(ClassificationSets, _TableDefinition);

  function ClassificationSets() {
    return _TableDefinition.apply(this, arguments) || this;
  }

  var _proto = ClassificationSets.prototype;

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
    this.string('items', {
      "allowNull": false
    });
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
    this.string('system_type', {});
  };

  _proto.defineView = function defineView() {
    this.alias('row_resource_id', 'classification_set_id');
    this.alias('name', 'name');
    this.alias('description', 'description');
    this.alias('version', 'version');
    this.alias('items', 'items');
    this.alias('created_by_resource_id', 'created_by_id');
    this.alias('updated_by_resource_id', 'updated_by_id');
    this.alias('created_at', 'created_at');
    this.alias('updated_at', 'updated_at');
    this.alias('system_type', 'system_type');
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

  _createClass(ClassificationSets, [{
    key: "name",
    get: function get() {
      return 'classification_sets';
    }
  }]);

  return ClassificationSets;
}(_tableDefinition["default"]);

exports["default"] = ClassificationSets;
//# sourceMappingURL=classification-sets.js.map