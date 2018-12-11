'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import pgformat from 'pg-format';


var _util = require('util');

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _sqldiff = require('sqldiff');

var _sqldiff2 = _interopRequireDefault(_sqldiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function pgvalue(value) {
  if (value == null) {
    return 'NULL';
  }
  return "'" + value.toString().replace(/'/g, "''") + "'";
}

var Metadata = function () {
  function Metadata(diff, options) {
    _classCallCheck(this, Metadata);

    this.options = options || {};
    this.includeColumns = this.options.includeColumns == null ? true : this.options.includeColumns;
    this.useAliases = this.options.useAliases == null ? true : this.options.useAliases;
  }

  _createClass(Metadata, [{
    key: 'build',
    value: function build(generator, changes) {
      this.diff = generator.differ;
      this.changes = changes;
      this.oldViews = this.diff.oldSchema ? this.diff.oldSchema.views : [];
      this.oldViews = this.oldViews || [];

      this.newViews = this.diff.newSchema ? this.diff.newSchema.views : [];
      this.newViews = this.newViews || [];

      if (this.shouldEmitMetadata()) {
        Array.prototype.push.apply(changes, this.buildStatements());
      }
    }
  }, {
    key: 'shouldEmitMetadata',
    value: function shouldEmitMetadata() {
      var oldName = this.diff.oldSchema && this.diff.oldSchema.form ? this.diff.oldSchema.form.name : null;
      var newName = this.diff.newSchema && this.diff.newSchema.form ? this.diff.newSchema.form.name : null;

      // emit the metadata statements if there are already some changes being emitted or
      // the form name changed.
      return this.changes.length > 0 || oldName !== newName;
    }
  }, {
    key: 'viewName',
    value: function viewName(name) {
      return (this.options.tablePrefix || '') + name;
    }
  }, {
    key: 'buildStatements',
    value: function buildStatements() {
      var _this = this;

      var statements = [];

      var systemTablesName = _utils2.default.tableName(this.options.schema, this.options.prefix, this.options.quote, 'tables');
      // const systemTablesViewName = Utils.tableName(this.options.schema, this.options.prefix, this.options.quote, 'tables_view');
      var systemColumnsName = _utils2.default.tableName(this.options.schema, this.options.prefix, this.options.quote, 'columns');
      // const systemColumnsViewName = Utils.tableName(this.options.schema, this.options.prefix, this.options.quote, 'columns_view');

      // statements.push(format('CREATE TABLE IF NOT EXISTS %s (name text, alias text, type text, parent text, form_id text, field text, field_type text, data_name text);',
      //                        systemTablesName));

      // statements.push(format('CREATE OR REPLACE VIEW %s AS SELECT alias AS name, type, parent, form_id, field, field_type, data_name FROM %s;',
      //                        systemTablesViewName, systemTablesName));

      // statements.push(format('CREATE INDEX idx_tables_name ON %s (name);',
      //                        systemTablesName));

      // statements.push(format('CREATE INDEX idx_tables_alias ON %s (alias);',
      //                        systemTablesName));

      // if (this.includeColumns) {
      //   // field type
      //   statements.push(format('CREATE TABLE IF NOT EXISTS %s (table_name text, table_alias text, name text, ordinal bigint, type text, nullable boolean, form_id text, field text, field_type text, data_name text, part text, data text);',
      //                          systemColumnsName));

      //   statements.push(format('CREATE OR REPLACE VIEW %s AS SELECT table_alias AS table_name, name, ordinal, type, nullable, form_id, field, field_type, data_name, part FROM %s;',
      //                          systemColumnsViewName, systemColumnsName));

      //   statements.push(format('CREATE INDEX idx_columns_table_name ON %s (table_name);',
      //                          systemColumnsName));

      //   statements.push(format('CREATE INDEX idx_columns_table_alias ON %s (table_alias);',
      //                          systemColumnsName));
      // }

      // drop old metadata
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.oldViews[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var view = _step.value;

          statements.push((0, _util.format)('DELETE FROM %s WHERE name = %s;', systemTablesName, pgvalue(view.name)));

          if (this.includeColumns) {
            statements.push((0, _util.format)('DELETE FROM %s WHERE table_name = %s;', systemColumnsName, pgvalue(view.name)));
          }
        }

        // create new metadata
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function _loop() {
          var view = _step2.value;

          var viewName = _this.viewName(view.name);
          var viewAlias = view.alias || view.table.alias;
          var viewType = view.type || view.table.type;

          // skip the _full and 'values' tables
          if (viewType === 'values' || view.variant != null) {
            return 'continue';
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
              var column = view.columns[i];

              // statements.push(format('DELETE FROM %s WHERE table_name = %s AND name = %s;',
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
                part = column.column.suffix ? column.column.suffix.replace(/^_/, '') : null;
                // data = JSON.stringify(element);
              }

              statements.push((0, _util.format)('INSERT INTO %s (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)\n' + 'SELECT %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s;', systemColumnsName, pgvalue(viewName), pgvalue(viewAlias), pgvalue(column.alias), pgvalue(i + 1), pgvalue(column.column.type), pgvalue(column.column.allowNull ? 1 : 0), pgvalue(view.table.form_id), pgvalue(field), pgvalue(fieldType), pgvalue(dataName), pgvalue(part), pgvalue(data)));
            }
          }
        };

        for (var _iterator2 = this.newViews[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ret = _loop();

          if (_ret === 'continue') continue;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return statements.map(function (s) {
        return new _sqldiff2.default.SchemaChange('raw', { sql: s });
      });
    }
  }]);

  return Metadata;
}();

exports.default = Metadata;
//# sourceMappingURL=metadata.js.map