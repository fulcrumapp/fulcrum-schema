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

var MembershipsForms = function (_TableDefinition) {
  _inherits(MembershipsForms, _TableDefinition);

  function MembershipsForms() {
    _classCallCheck(this, MembershipsForms);

    return _possibleConstructorReturn(this, (MembershipsForms.__proto__ || Object.getPrototypeOf(MembershipsForms)).apply(this, arguments));
  }

  _createClass(MembershipsForms, [{
    key: 'defineTable',
    value: function defineTable() {
      this.pk('id', {});
      this.integer('row_id', { "allowNull": false });
      this.integer('user_id', { "allowNull": false });
      this.string('user_resource_id', {});
      this.integer('form_id', { "allowNull": false });
      this.string('form_resource_id', {});
    }
  }, {
    key: 'defineView',
    value: function defineView() {
      this.alias('user_resource_id', 'user_id');
      this.alias('form_resource_id', 'form_id');
    }
  }, {
    key: 'defineIndexes',
    value: function defineIndexes() {
      this.index({ "columns": ["row_id"], "unique": true });
      this.index({ "columns": ["user_resource_id"] });
      this.index({ "columns": ["form_resource_id"] });
    }
  }, {
    key: 'name',
    get: function get() {
      return 'query_memberships_forms';
    }
  }]);

  return MembershipsForms;
}(_tableDefinition2.default);

exports.default = MembershipsForms;
//# sourceMappingURL=memberships-forms.js.map