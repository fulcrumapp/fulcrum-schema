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

var MembershipsProjects = function (_TableDefinition) {
  _inherits(MembershipsProjects, _TableDefinition);

  function MembershipsProjects() {
    _classCallCheck(this, MembershipsProjects);

    return _possibleConstructorReturn(this, (MembershipsProjects.__proto__ || Object.getPrototypeOf(MembershipsProjects)).apply(this, arguments));
  }

  _createClass(MembershipsProjects, [{
    key: 'defineTable',
    value: function defineTable() {
      this.pk('id', {});
      this.integer('row_id', { "allowNull": false });
      this.integer('user_id', { "allowNull": false });
      this.string('user_resource_id', {});
      this.integer('project_id', { "allowNull": false });
      this.string('project_resource_id', {});
    }
  }, {
    key: 'defineView',
    value: function defineView() {
      this.alias('user_resource_id', 'user_id');
      this.alias('project_resource_id', 'project_id');
    }
  }, {
    key: 'defineIndexes',
    value: function defineIndexes() {
      this.index({ "columns": ["row_id"], "unique": true });
      this.index({ "columns": ["user_resource_id"] });
      this.index({ "columns": ["project_resource_id"] });
    }
  }, {
    key: 'name',
    get: function get() {
      return 'query_memberships_projects';
    }
  }]);

  return MembershipsProjects;
}(_tableDefinition2.default);

exports.default = MembershipsProjects;
//# sourceMappingURL=memberships-projects.js.map