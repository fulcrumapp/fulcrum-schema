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

var Memberships = function (_TableDefinition) {
  _inherits(Memberships, _TableDefinition);

  function Memberships() {
    _classCallCheck(this, Memberships);

    return _possibleConstructorReturn(this, (Memberships.__proto__ || Object.getPrototypeOf(Memberships)).apply(this, arguments));
  }

  _createClass(Memberships, [{
    key: 'defineTable',
    value: function defineTable() {
      this.pk('id', {});
      this.integer('row_id', { "allowNull": false });
      this.string('row_resource_id', { "allowNull": false });
      this.integer('user_id', { "allowNull": false });
      this.string('user_resource_id', {});
      this.string('first_name', {});
      this.string('last_name', {});
      this.string('name', {});
      this.string('email', {});
      this.integer('role_id', { "allowNull": false });
      this.string('role_resource_id', { "allowNull": false });
      this.string('role_name', { "allowNull": false });
      this.string('status', {});
      this.timestamp('created_at', { "allowNull": false });
      this.timestamp('updated_at', { "allowNull": false });
    }
  }, {
    key: 'defineView',
    value: function defineView() {
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
    }
  }, {
    key: 'defineIndexes',
    value: function defineIndexes() {
      this.index({ "columns": ["row_resource_id"], "unique": true });
      this.index({ "columns": ["row_id"], "unique": true });
      this.index({ "columns": ["user_resource_id"] });
      this.index({ "columns": ["role_resource_id"] });
      this.index({ "columns": ["name"] });
      this.index({ "columns": ["updated_at"] });
    }
  }, {
    key: 'name',
    get: function get() {
      return 'memberships';
    }
  }]);

  return Memberships;
}(_tableDefinition2.default);

exports.default = Memberships;
//# sourceMappingURL=memberships.js.map