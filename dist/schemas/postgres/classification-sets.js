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

var ClassificationSets = function (_TableDefinition) {
  _inherits(ClassificationSets, _TableDefinition);

  function ClassificationSets() {
    _classCallCheck(this, ClassificationSets);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ClassificationSets).apply(this, arguments));
  }

  _createClass(ClassificationSets, [{
    key: 'define',
    value: function define() {
      this.pk('id');
      this.integer('row_id', { allowNull: false });
      this.string('row_resource_id', { allowNull: false });
      this.string('name');
      this.string('description');
      this.integer('version', { allowNull: false });
      this.string('items');
      this.integer('created_by_id');
      this.string('created_by_resource_id');
      this.integer('updated_by_id');
      this.string('updated_by_resource_id');
      this.timestamp('created_at', { allowNull: false });
      this.timestamp('updated_at', { allowNull: false });
    }
  }, {
    key: 'view',
    value: function view() {
      this.alias('row_resource_id', '_classification_set_id');
      this.alias('name', 'name');
      this.alias('description', 'description');
      this.alias('version', 'version');
      this.alias('items', 'items');
      this.alias('created_by_resource_id', '_created_by_id');
      this.alias('updated_by_resource_id', '_updated_by_id');
      this.alias('created_at', 'created_at');
      this.alias('updated_at', 'updated_at');
    }
  }, {
    key: 'name',
    get: function get() {
      return 'classification_sets';
    }
  }]);

  return ClassificationSets;
}(_tableDefinition2.default);

exports.default = ClassificationSets;
//# sourceMappingURL=classification-sets.js.map