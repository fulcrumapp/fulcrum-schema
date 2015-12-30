'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); // import pgformat from 'pg-format';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var Metadata = (function () {
  function Metadata(diff, options) {
    _classCallCheck(this, Metadata);

    this.options = options || {};
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
    key: 'buildStatements',
    value: function buildStatements() {
      var statements = [];

      var systemTablesName = _utils2.default.tableName(this.options.schema, this.options.prefix, this.options.quote, 'tables');
      var systemColumnsName = _utils2.default.tableName(this.options.schema, this.options.prefix, this.options.quote, 'columns');

      statements.push((0, _util.format)('CREATE TABLE IF NOT EXISTS %s (name text, type text, parent text, form_id text);', systemTablesName));

      statements.push((0, _util.format)('CREATE TABLE IF NOT EXISTS %s (table_name text, name text, ordinal bigint, type text, nullable boolean, form_id text);', systemColumnsName));

      // drop old metadata
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.oldViews[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var view = _step.value;

          statements.push((0, _util.format)('DELETE FROM %s WHERE name = %s;', systemTablesName, pgvalue(view.table.alias)));

          statements.push((0, _util.format)('DELETE FROM %s WHERE table_name = %s;', systemColumnsName, pgvalue(view.table.alias)));
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
        for (var _iterator2 = this.newViews[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var view = _step2.value;

          statements.push((0, _util.format)('DELETE FROM %s WHERE name = %s;', systemTablesName, pgvalue(view.table.alias)));

          statements.push((0, _util.format)('DELETE FROM %s WHERE table_name = %s;', systemColumnsName, pgvalue(view.table.alias)));

          statements.push((0, _util.format)('INSERT INTO %s (name, type, parent, form_id) SELECT %s, %s, %s, %s;', systemTablesName, pgvalue(view.table.alias), pgvalue(view.table.type), pgvalue(view.table.parent ? view.table.parent.alias : null), pgvalue(view.table.form_id)));

          for (var i = 0; i < view.columns.length; ++i) {
            var column = view.columns[i];

            statements.push((0, _util.format)('DELETE FROM %s WHERE table_name = %s AND name = %s;', systemColumnsName, pgvalue(view.table.alias), pgvalue(column.alias)));

            statements.push((0, _util.format)('INSERT INTO %s (table_name, name, ordinal, type, nullable, form_id) SELECT %s, %s, %s, %s, %s, %s;', systemColumnsName, pgvalue(view.table.alias), pgvalue(column.alias), pgvalue(i + 1), pgvalue(column.column.type), pgvalue(column.column.allowNull ? 1 : 0), pgvalue(view.table.form_id)));
          }
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
})();

exports.default = Metadata;
//# sourceMappingURL=metadata.js.map