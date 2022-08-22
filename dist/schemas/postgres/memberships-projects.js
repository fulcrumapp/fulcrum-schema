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

var MembershipsProjects = /*#__PURE__*/function (_TableDefinition) {
  _inheritsLoose(MembershipsProjects, _TableDefinition);

  function MembershipsProjects() {
    return _TableDefinition.apply(this, arguments) || this;
  }

  var _proto = MembershipsProjects.prototype;

  _proto.defineTable = function defineTable() {
    this.pk('id', {});
    this.integer('row_id', {
      "allowNull": false
    });
    this.integer('user_id', {
      "allowNull": false
    });
    this.string('user_resource_id', {});
    this.integer('project_id', {
      "allowNull": false
    });
    this.string('project_resource_id', {});
  };

  _proto.defineView = function defineView() {
    this.alias('user_resource_id', 'user_id');
    this.alias('project_resource_id', 'project_id');
  };

  _proto.defineIndexes = function defineIndexes() {
    this.index({
      "columns": ["row_id"],
      "unique": true
    });
    this.index({
      "columns": ["user_resource_id"]
    });
    this.index({
      "columns": ["project_resource_id"]
    });
  };

  _createClass(MembershipsProjects, [{
    key: "name",
    get: function get() {
      return 'query_memberships_projects';
    }
  }]);

  return MembershipsProjects;
}(_tableDefinition["default"]);

exports["default"] = MembershipsProjects;
//# sourceMappingURL=memberships-projects.js.map