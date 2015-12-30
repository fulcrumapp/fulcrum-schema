'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pgFormat = require('pg-format');

var _pgFormat2 = _interopRequireDefault(_pgFormat);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _sqldiff = require('sqldiff');

var _sqldiff2 = _interopRequireDefault(_sqldiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Metadata {
  constructor(diff, options) {
    this.options = options || {};
  }

  build(generator, changes) {
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

  shouldEmitMetadata() {
    const oldName = this.diff.oldSchema && this.diff.oldSchema.form ? this.diff.oldSchema.form.name : null;
    const newName = this.diff.newSchema && this.diff.newSchema.form ? this.diff.newSchema.form.name : null;

    // emit the metadata statements if there are already some changes being emitted or
    // the form name changed.
    return this.changes.length > 0 || oldName !== newName;
  }

  buildStatements() {
    const statements = [];

    const systemTablesName = _utils2.default.tableName(this.options.schema, this.options.prefix, this.options.quote, 'tables');
    const systemColumnsName = _utils2.default.tableName(this.options.schema, this.options.prefix, this.options.quote, 'columns');

    statements.push((0, _pgFormat2.default)('CREATE TABLE IF NOT EXISTS %s (name text, type text, parent text, form_id text);', systemTablesName));

    statements.push((0, _pgFormat2.default)('CREATE TABLE IF NOT EXISTS %s (table_name text, name text, ordinal bigint, type text, nullable boolean, form_id text);', systemColumnsName));

    // drop old metadata
    for (const view of this.oldViews) {
      statements.push((0, _pgFormat2.default)('DELETE FROM %s WHERE name = %L;', systemTablesName, view.table.alias));

      statements.push((0, _pgFormat2.default)('DELETE FROM %s WHERE table_name = %L;', systemColumnsName, view.table.alias));
    }

    // create new metadata
    for (const view of this.newViews) {
      statements.push((0, _pgFormat2.default)('DELETE FROM %s WHERE name = %L;', systemTablesName, view.table.alias));

      statements.push((0, _pgFormat2.default)('DELETE FROM %s WHERE table_name = %L;', systemColumnsName, view.table.alias));

      statements.push((0, _pgFormat2.default)('INSERT INTO %s (name, type, parent, form_id) SELECT %L, %L, %L, %L;', systemTablesName, view.table.alias, view.table.type, view.table.parent ? view.table.parent.alias : null, view.table.form_id));

      for (let i = 0; i < view.columns.length; ++i) {
        const column = view.columns[i];

        statements.push((0, _pgFormat2.default)('DELETE FROM %s WHERE table_name = %L AND name = %L;', systemColumnsName, view.table.alias, column.alias));

        statements.push((0, _pgFormat2.default)('INSERT INTO %s (table_name, name, ordinal, type, nullable, form_id) SELECT %L, %L, %L, %L, %L, %L;', systemColumnsName, view.table.alias, column.alias, i + 1, column.column.type, column.column.allowNull ? 1 : 0, view.table.form_id));
      }
    }

    return statements.map(s => {
      return new _sqldiff2.default.SchemaChange('raw', { sql: s });
    });
  }
}
exports.default = Metadata;
//# sourceMappingURL=metadata.js.map