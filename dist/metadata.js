"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = require("util");

var _utils = _interopRequireDefault(require("./utils"));

var _sqldiff = _interopRequireDefault(require("sqldiff"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function pgvalue(value) {
  if (value == null) {
    return 'NULL';
  }

  return "'" + value.toString().replace(/'/g, "''") + "'";
}

var Metadata = /*#__PURE__*/function () {
  function Metadata(diff, options) {
    this.options = options || {};
    this.includeColumns = this.options.includeColumns == null ? true : this.options.includeColumns;
    this.useAliases = this.options.useAliases == null ? true : this.options.useAliases;
  }

  var _proto = Metadata.prototype;

  _proto.build = function build(generator, changes) {
    this.diff = generator.differ;
    this.changes = changes;
    this.oldViews = this.diff.oldSchema ? this.diff.oldSchema.views : [];
    this.oldViews = this.oldViews || [];
    this.newViews = this.diff.newSchema ? this.diff.newSchema.views : [];
    this.newViews = this.newViews || [];

    if (this.shouldEmitMetadata()) {
      Array.prototype.push.apply(changes, this.buildStatements());
    }
  };

  _proto.shouldEmitMetadata = function shouldEmitMetadata() {
    var oldName = this.diff.oldSchema && this.diff.oldSchema.form ? this.diff.oldSchema.form.name : null;
    var newName = this.diff.newSchema && this.diff.newSchema.form ? this.diff.newSchema.form.name : null; // emit the metadata statements if there are already some changes being emitted or
    // the form name changed.

    return this.changes.length > 0 || oldName !== newName;
  };

  _proto.viewName = function viewName(name) {
    return (this.options.tablePrefix || '') + name;
  };

  _proto.buildStatements = function buildStatements() {
    var _this = this;

    var statements = [];
    var METADATA = false;

    var schemaChangesTableName = _utils["default"].tableName(this.options.schema, this.options.prefix, this.options.quote, 'schema_changes');

    var systemTablesName = _utils["default"].tableName(this.options.schema, this.options.prefix, this.options.quote, 'tables');

    var systemTablesViewName = _utils["default"].tableName(this.options.schema, this.options.prefix, this.options.quote, 'tables_view');

    var systemColumnsName = _utils["default"].tableName(this.options.schema, this.options.prefix, this.options.quote, 'columns');

    var systemColumnsViewName = _utils["default"].tableName(this.options.schema, this.options.prefix, this.options.quote, 'columns_view');

    if (METADATA) {
      statements.push((0, _util.format)('CREATE TABLE IF NOT EXISTS %s (name text NOT NULL, created_at timestamp with time zone NOT NULL, sql TEXT NOT NULL);', schemaChangesTableName));
      statements.push((0, _util.format)('CREATE UNIQUE INDEX ON %s (name);', schemaChangesTableName));
      statements.push((0, _util.format)('CREATE TABLE IF NOT EXISTS %s (name text, alias text, type text, parent text, form_id text, field text, field_type text, data_name text);', systemTablesName));
      statements.push((0, _util.format)('CREATE OR REPLACE VIEW %s AS SELECT alias AS name, type, parent, form_id, field, field_type, data_name FROM %s;', systemTablesViewName, systemTablesName));
      statements.push((0, _util.format)('CREATE INDEX idx_tables_name ON %s (name);', systemTablesName));
      statements.push((0, _util.format)('CREATE INDEX idx_tables_alias ON %s (alias);', systemTablesName));

      if (this.includeColumns) {
        // field type
        statements.push((0, _util.format)('CREATE TABLE IF NOT EXISTS %s (table_name text, table_alias text, name text, ordinal bigint, type text, nullable boolean, form_id text, field text, field_type text, data_name text, part text, data text);', systemColumnsName));
        statements.push((0, _util.format)('CREATE OR REPLACE VIEW %s AS SELECT table_alias AS table_name, name, ordinal, type, nullable, form_id, field, field_type, data_name, part FROM %s;', systemColumnsViewName, systemColumnsName));
        statements.push((0, _util.format)('CREATE INDEX idx_columns_table_name ON %s (table_name);', systemColumnsName));
        statements.push((0, _util.format)('CREATE INDEX idx_columns_table_alias ON %s (table_alias);', systemColumnsName));
      }
    } // drop old metadata


    for (var _iterator = _createForOfIteratorHelperLoose(this.oldViews), _step; !(_step = _iterator()).done;) {
      var view = _step.value;
      statements.push((0, _util.format)('DELETE FROM %s WHERE name = %s;', systemTablesName, pgvalue(view.name)));

      if (this.includeColumns) {
        statements.push((0, _util.format)('DELETE FROM %s WHERE table_name = %s;', systemColumnsName, pgvalue(view.name)));
      }
    } // create new metadata


    var _loop = function _loop() {
      var view = _step2.value;

      var viewName = _this.viewName(view.name);

      var viewAlias = view.alias || view.table.alias;
      var viewType = view.type || view.table.type; // skip the _full and 'values' tables

      if (viewType === 'values' || view.variant != null) {
        return "continue";
      }

      statements.push((0, _util.format)('DELETE FROM %s WHERE name = %s;', systemTablesName, pgvalue(viewName)));

      if (_this.includeColumns) {
        statements.push((0, _util.format)('DELETE FROM %s WHERE table_name = %s;', systemColumnsName, pgvalue(viewName)));
      }

      var element = view.element || view.table.element;
      var parentViewName = null;
      var parent = view.table.parent;

      if (parent) {
        if (_this.useAliases) {
          parentViewName = parent.alias;
        } else {
          parentViewName = _this.newViews.find(function (v) {
            return v.table === parent && v.variant == null;
          }).name;
        }
      }

      statements.push((0, _util.format)('INSERT INTO %s (name, alias, type, parent, form_id, field, field_type, data_name) SELECT %s, %s, %s, %s, %s, %s, %s, %s;', systemTablesName, pgvalue(viewName), pgvalue(viewAlias), pgvalue(viewType), pgvalue(parentViewName), pgvalue(view.table.form_id), pgvalue(element ? element.key : null), pgvalue(element ? element.type : null), pgvalue(element ? element.data_name : null)));

      if (_this.includeColumns) {
        for (var i = 0; i < view.columns.length; ++i) {
          var column = view.columns[i]; // statements.push(format('DELETE FROM %s WHERE table_name = %s AND name = %s;',
          //                        systemColumnsName,
          //                        pgvalue(viewName),
          //                        pgvalue(column.alias)));

          var field = null;
          var fieldType = null;
          var dataName = null;
          var part = null;
          var data = null;
          element = column.column.element;

          if (element) {
            field = element.key;
            fieldType = element.type;
            dataName = element.data_name;
            part = column.column.suffix ? column.column.suffix.replace(/^_/, '') : null; // data = JSON.stringify(element);
          }

          statements.push((0, _util.format)('INSERT INTO %s (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)\n' + 'SELECT %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s;', systemColumnsName, pgvalue(viewName), pgvalue(viewAlias), pgvalue(column.alias), pgvalue(i + 1), pgvalue(column.column.type), pgvalue(column.column.allowNull ? 1 : 0), pgvalue(view.table.form_id), pgvalue(field), pgvalue(fieldType), pgvalue(dataName), pgvalue(part), pgvalue(data)));
        }
      }
    };

    for (var _iterator2 = _createForOfIteratorHelperLoose(this.newViews), _step2; !(_step2 = _iterator2()).done;) {
      var _ret = _loop();

      if (_ret === "continue") continue;
    }

    return statements.map(function (s) {
      return new _sqldiff["default"].SchemaChange('raw', {
        sql: s
      });
    });
  };

  return Metadata;
}();

exports["default"] = Metadata;
//# sourceMappingURL=metadata.js.map