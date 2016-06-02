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

var Photos = function (_TableDefinition) {
  _inherits(Photos, _TableDefinition);

  function Photos() {
    _classCallCheck(this, Photos);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Photos).apply(this, arguments));
  }

  _createClass(Photos, [{
    key: 'defineTable',
    value: function defineTable() {
      this.pk('id', {});
      this.integer('row_id', { "allowNull": false });
      this.string('row_resource_id', { "allowNull": false });
      this.string('access_key', { "allowNull": false });
      this.integer('record_id', {});
      this.string('record_resource_id', {});
      this.integer('form_id', {});
      this.string('form_resource_id', {});
      this.string('exif', {});
      this.integer('file_size', {});
      this.integer('created_by_id', {});
      this.string('created_by_resource_id', {});
      this.integer('updated_by_id', {});
      this.string('updated_by_resource_id', {});
      this.timestamp('created_at', { "allowNull": false });
      this.timestamp('updated_at', { "allowNull": false });
      this.string('file', {});
      this.string('content_type', {});
      this.timestamp('uploaded_at', {});
      this.timestamp('stored_at', {});
      this.timestamp('processed_at', {});
      this.geometry('geometry', {});
      this.double('latitude', {});
      this.double('longitude', {});
      this.double('accuracy', {});
      this.integer('width', {});
      this.integer('height', {});
    }
  }, {
    key: 'defineView',
    value: function defineView() {
      this.alias('access_key', '_photo_id');
      this.alias('exif', 'exif');
      this.alias('file_size', 'file_size');
      this.alias('record_resource_id', '_record_id');
      this.alias('form_resource_id', '_form_id');
      this.alias('created_by_resource_id', '_created_by_id');
      this.alias('updated_by_resource_id', '_updated_by_id');
      this.alias('created_at', 'created_at');
      this.alias('updated_at', 'updated_at');
      this.alias('file', 'file');
      this.alias('content_type', 'content_type');
      this.alias('uploaded_at', 'uploaded_at');
      this.alias('stored_at', 'stored_at');
      this.alias('processed_at', 'processed_at');
      this.alias('geometry', 'geometry');
      this.alias('latitude', 'latitude');
      this.alias('longitude', 'longitude');
      this.alias('accuracy', 'accuracy');
      this.alias('width', 'width');
      this.alias('height', 'height');
    }
  }, {
    key: 'defineIndexes',
    value: function defineIndexes() {
      this.index({ "columns": ["row_resource_id"], "unique": true });
      this.index({ "columns": ["row_id"], "unique": true });
      this.index({ "columns": ["access_key"] });
      this.index({ "columns": ["record_resource_id"] });
      this.index({ "columns": ["form_resource_id"] });
      this.index({ "columns": ["created_by_resource_id"] });
      this.index({ "columns": ["geometry"], "method": "gist" });
      this.index({ "columns": ["updated_at"] });
    }
  }, {
    key: 'name',
    get: function get() {
      return 'photos';
    }
  }]);

  return Photos;
}(_tableDefinition2.default);

exports.default = Photos;
//# sourceMappingURL=photos.js.map