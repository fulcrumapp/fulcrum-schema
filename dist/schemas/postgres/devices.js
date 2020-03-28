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

var Devices = function (_TableDefinition) {
  _inherits(Devices, _TableDefinition);

  function Devices() {
    _classCallCheck(this, Devices);

    return _possibleConstructorReturn(this, (Devices.__proto__ || Object.getPrototypeOf(Devices)).apply(this, arguments));
  }

  _createClass(Devices, [{
    key: 'defineTable',
    value: function defineTable() {
      this.pk('id', {});
      this.integer('row_id', { "allowNull": false });
      this.string('row_resource_id', { "allowNull": false });
      this.string('identifier', { "allowNull": false });
      this.string('platform', {});
      this.string('platform_version', {});
      this.string('manufacturer', {});
      this.string('model', {});
      this.string('application_version', {});
      this.string('application_build', {});
      this.string('ip_address', {});
      this.string('location', {});
      this.double('latitude', {});
      this.double('longitude', {});
      this.double('accuracy', {});
      this.string('locality', {});
      this.string('admin_area', {});
      this.string('postal_code', {});
      this.string('country', {});
      this.timestamp('created_at', { "allowNull": false });
      this.timestamp('updated_at', { "allowNull": false });
    }
  }, {
    key: 'defineView',
    value: function defineView() {
      this.alias('row_resource_id', 'device_id');
      this.alias('identifier', 'identifier');
      this.alias('platform', 'platform');
      this.alias('platform_version', 'platform_version');
      this.alias('manufacturer', 'manufacturer');
      this.alias('model', 'model');
      this.alias('application_version', 'application_version');
      this.alias('application_build', 'application_build');
      this.alias('ip_address', 'ip_address');
      this.alias('location', 'location');
      this.alias('latitude', 'latitude');
      this.alias('longitude', 'longitude');
      this.alias('accuracy', 'accuracy');
      this.alias('locality', 'locality');
      this.alias('admin_area', 'admin_area');
      this.alias('country', 'country');
      this.alias('created_at', 'created_at');
      this.alias('updated_at', 'updated_at');
    }
  }, {
    key: 'defineIndexes',
    value: function defineIndexes() {
      this.index({ "columns": ["row_resource_id"], "unique": true });
      this.index({ "columns": ["row_id"], "unique": true });
      this.index({ "columns": ["identifier"] });
      this.index({ "columns": ["platform"] });
      this.index({ "columns": ["manufacturer"] });
      this.index({ "columns": ["updated_at"] });
    }
  }, {
    key: 'name',
    get: function get() {
      return 'query_devices';
    }
  }]);

  return Devices;
}(_tableDefinition2.default);

exports.default = Devices;
//# sourceMappingURL=devices.js.map