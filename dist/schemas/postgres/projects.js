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

var Projects = /*#__PURE__*/function (_TableDefinition) {
  _inheritsLoose(Projects, _TableDefinition);

  function Projects() {
    return _TableDefinition.apply(this, arguments) || this;
  }

  var _proto = Projects.prototype;

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
    this.integer('created_by_id', {});
    this.string('created_by_resource_id', {});
    this.timestamp('created_at', {
      "allowNull": false
    });
    this.timestamp('updated_at', {
      "allowNull": false
    });
  };

  _proto.defineView = function defineView() {
    this.alias('row_resource_id', 'project_id');
    this.alias('name', 'name');
    this.alias('description', 'description');
    this.alias('created_by_resource_id', 'created_by_id');
    this.alias('created_at', 'created_at');
    this.alias('updated_at', 'updated_at');
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

  _createClass(Projects, [{
    key: "name",
    get: function get() {
      return 'projects';
    }
  }]);

  return Projects;
}(_tableDefinition["default"]);

exports["default"] = Projects;
//# sourceMappingURL=projects.js.map