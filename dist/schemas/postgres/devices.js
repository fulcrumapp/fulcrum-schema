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

var Devices = /*#__PURE__*/function (_TableDefinition) {
  _inheritsLoose(Devices, _TableDefinition);

  function Devices() {
    return _TableDefinition.apply(this, arguments) || this;
  }

  var _proto = Devices.prototype;

  _proto.defineTable = function defineTable() {
    this.pk('id', {});
    this.integer('row_id', {
      "allowNull": false
    });
    this.string('row_resource_id', {
      "allowNull": false
    });
    this.string('identifier', {
      "allowNull": false
    });
    this.string('platform', {});
    this.string('platform_version', {});
    this.string('manufacturer', {});
    this.string('model', {});
    this.string('application_version', {});
    this.string('application_build', {});
    this.string('ip_address', {});
    this.string('location', {});
    this["double"]('latitude', {});
    this["double"]('longitude', {});
    this["double"]('accuracy', {});
    this.string('locality', {});
    this.string('admin_area', {});
    this.string('postal_code', {});
    this.string('country', {});
    this.timestamp('created_at', {
      "allowNull": false
    });
    this.timestamp('updated_at', {
      "allowNull": false
    });
  };

  _proto.defineView = function defineView() {
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
      "columns": ["identifier"]
    });
    this.index({
      "columns": ["platform"]
    });
    this.index({
      "columns": ["manufacturer"]
    });
    this.index({
      "columns": ["updated_at"]
    });
  };

  _createClass(Devices, [{
    key: "name",
    get: function get() {
      return 'query_devices';
    }
  }]);

  return Devices;
}(_tableDefinition["default"]);

exports["default"] = Devices;
//# sourceMappingURL=devices.js.map