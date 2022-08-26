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

var Memberships = /*#__PURE__*/function (_TableDefinition) {
  _inheritsLoose(Memberships, _TableDefinition);

  function Memberships() {
    return _TableDefinition.apply(this, arguments) || this;
  }

  var _proto = Memberships.prototype;

  _proto.defineTable = function defineTable() {
    this.pk('id', {});
    this.integer('row_id', {
      "allowNull": false
    });
    this.string('row_resource_id', {
      "allowNull": false
    });
    this.integer('user_id', {
      "allowNull": false
    });
    this.string('user_resource_id', {});
    this.string('first_name', {});
    this.string('last_name', {});
    this.string('name', {});
    this.string('email', {});
    this.integer('role_id', {
      "allowNull": false
    });
    this.string('role_resource_id', {
      "allowNull": false
    });
    this.string('role_name', {
      "allowNull": false
    });
    this.string('status', {});
    this.timestamp('created_at', {
      "allowNull": false
    });
    this.timestamp('updated_at', {
      "allowNull": false
    });
    this["boolean"]('is_managed', {});
  };

  _proto.defineView = function defineView() {
    this.alias('row_resource_id', 'membership_id');
    this.alias('user_resource_id', 'user_id');
    this.alias('first_name', 'first_name');
    this.alias('last_name', 'last_name');
    this.alias('name', 'name');
    this.alias('email', 'email');
    this.alias('role_resource_id', 'role_id');
    this.alias('role_name', 'role_name');
    this.alias('status', 'status');
    this.alias('created_at', 'created_at');
    this.alias('updated_at', 'updated_at');
    this.alias('is_managed', 'is_managed');
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
      "columns": ["user_resource_id"]
    });
    this.index({
      "columns": ["role_resource_id"]
    });
    this.index({
      "columns": ["name"]
    });
    this.index({
      "columns": ["updated_at"]
    });
  };

  _createClass(Memberships, [{
    key: "name",
    get: function get() {
      return 'memberships';
    }
  }]);

  return Memberships;
}(_tableDefinition["default"]);

exports["default"] = Memberships;
//# sourceMappingURL=memberships.js.map