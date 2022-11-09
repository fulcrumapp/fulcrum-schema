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
var Photos = /*#__PURE__*/function (_TableDefinition) {
  _inheritsLoose(Photos, _TableDefinition);
  function Photos() {
    return _TableDefinition.apply(this, arguments) || this;
  }
  var _proto = Photos.prototype;
  _proto.defineTable = function defineTable() {
    this.pk('id', {});
    this.integer('row_id', {
      "allowNull": false
    });
    this.string('row_resource_id', {
      "allowNull": false
    });
    this.string('access_key', {
      "allowNull": false
    });
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
    this.timestamp('created_at', {
      "allowNull": false
    });
    this.timestamp('updated_at', {
      "allowNull": false
    });
    this.string('file', {});
    this.string('content_type', {});
    this.timestamp('uploaded_at', {});
    this.timestamp('stored_at', {});
    this.timestamp('processed_at', {});
    this.geometry('geometry', {});
    this["double"]('latitude', {});
    this["double"]('longitude', {});
    this["double"]('altitude', {});
    this["double"]('accuracy', {});
    this["double"]('direction', {});
    this.integer('width', {});
    this.integer('height', {});
    this.string('make', {});
    this.string('model', {});
    this.string('software', {});
    this.timestamp('deleted_at', {});
    this.string('labels', {});
    this.string('labels_index_content', {});
    this.fts('labels_index', {});
    this.timestamp('labels_processed_at', {});
    this.string('text', {});
    this.string('text_index_content', {});
    this.fts('text_index', {});
    this.timestamp('text_processed_at', {});
  };
  _proto.defineView = function defineView() {
    this.alias('access_key', 'photo_id');
    this.alias('exif', 'exif');
    this.alias('file_size', 'file_size');
    this.alias('record_resource_id', 'record_id');
    this.alias('form_resource_id', 'form_id');
    this.alias('created_by_resource_id', 'created_by_id');
    this.alias('updated_by_resource_id', 'updated_by_id');
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
    this.alias('altitude', 'altitude');
    this.alias('direction', 'direction');
    this.alias('width', 'width');
    this.alias('height', 'height');
    this.alias('make', 'make');
    this.alias('model', 'model');
    this.alias('software', 'software');
    this.alias('deleted_at', 'deleted_at');
    this.alias('labels', 'labels');
    this.alias('labels_index_content', 'labels_index_content');
    this.alias('labels_index', 'labels_index');
    this.alias('labels_processed_at', 'labels_processed_at');
    this.alias('text', 'text');
    this.alias('text_index_content', 'text_index_content');
    this.alias('text_index', 'text_index');
    this.alias('text_processed_at', 'text_processed_at');
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
      "columns": ["access_key"]
    });
    this.index({
      "columns": ["record_resource_id"]
    });
    this.index({
      "columns": ["form_resource_id"]
    });
    this.index({
      "columns": ["created_by_resource_id"]
    });
    this.index({
      "columns": ["geometry"],
      "method": "gist"
    });
    this.index({
      "columns": ["updated_at"]
    });
    this.index({
      "columns": ["labels_index"],
      "method": "gin"
    });
    this.index({
      "columns": ["text_index"],
      "method": "gin"
    });
  };
  _createClass(Photos, [{
    key: "name",
    get: function get() {
      return 'photos';
    }
  }]);
  return Photos;
}(_tableDefinition["default"]);
exports["default"] = Photos;
//# sourceMappingURL=photos.js.map