"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var TableDefinition = /*#__PURE__*/function () {
  function TableDefinition() {
    this.columns = [];
    this.viewColumns = {};
    this.indexes = [];
  }

  var _proto = TableDefinition.prototype;

  _proto.column = function column(name, type, options) {
    this.columns.push(_extends({
      name: name,
      type: type
    }, options));
  };

  _proto.pk = function pk() {
    this.column('id', 'pk');
  };

  _proto.integer = function integer(name, options) {
    this.column(name, 'integer', options);
  };

  _proto.string = function string(name, options) {
    this.column(name, 'string', options);
  };

  _proto.timestamp = function timestamp(name, options) {
    this.column(name, 'timestamp', options);
  };

  _proto["boolean"] = function boolean(name, options) {
    this.column(name, 'boolean', options);
  };

  _proto["double"] = function double(name, options) {
    this.column(name, 'double', options);
  };

  _proto.text = function text(name, options) {
    this.column(name, 'text', options);
  };

  _proto.array = function array(name, options) {
    this.column(name, 'array', options);
  };

  _proto.fts = function fts(name, options) {
    this.column(name, 'fts', options);
  };

  _proto.geometry = function geometry(name, options) {
    this.column(name, 'geometry', options);
  };

  _proto.json = function json(name, options) {
    this.column(name, 'json', options);
  };

  _proto.jsonb = function jsonb(name, options) {
    this.column(name, 'jsonb', options);
  };

  _proto.alias = function alias(source, to) {
    this.viewColumns[source] = to;
  };

  _proto.index = function index(options) {
    this.indexes.push(options);
  };

  _proto.define = function define() {
    return null;
  };

  return TableDefinition;
}();

exports["default"] = TableDefinition;
//# sourceMappingURL=table-definition.js.map