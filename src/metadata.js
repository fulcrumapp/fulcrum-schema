// import pgformat from 'pg-format';
import {format} from 'util';
import Utils from './utils';
import sqldiff from 'sqldiff';

function pgvalue(value) {
  if (value == null) {
    return 'NULL';
  }
  return "'" + value.toString().replace(/'/g, "''") + "'";
}

export default class Metadata {
  constructor(diff, options) {
    this.options = options || {};
    this.includeColumns = options.columns;
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
    return (this.changes.length > 0 || oldName !== newName);
  }

  buildStatements() {
    const statements = [];

    const systemTablesName = Utils.tableName(this.options.schema, this.options.prefix, this.options.quote, 'tables');
    const systemColumnsName = Utils.tableName(this.options.schema, this.options.prefix, this.options.quote, 'columns');

    statements.push(format('CREATE TABLE IF NOT EXISTS %s (name text, type text, parent text, form_id text);',
                           systemTablesName));

    if (this.includeColumns) {
      statements.push(format('CREATE TABLE IF NOT EXISTS %s (table_name text, name text, ordinal bigint, type text, nullable boolean, form_id text);',
                             systemColumnsName));
    }

    // drop old metadata
    for (const view of this.oldViews) {
      statements.push(format('DELETE FROM %s WHERE name = %s;',
                             systemTablesName,
                             pgvalue(view.table.alias)));

      if (this.includeColumns) {
        statements.push(format('DELETE FROM %s WHERE table_name = %s;',
                               systemColumnsName,
                               pgvalue(view.table.alias)));
      }
    }

    // create new metadata
    for (const view of this.newViews) {
      const viewAlias = view.alias || view.table.alias;
      const viewType = view.type || view.table.type;

      // skip the _full and 'values' tables
      if (viewType === 'values' || view.variant != null) {
        continue;
      }

      statements.push(format('DELETE FROM %s WHERE name = %s;',
                             systemTablesName,
                             pgvalue(viewAlias)));

      if (this.includeColumns) {
        statements.push(format('DELETE FROM %s WHERE table_name = %s;',
                               systemColumnsName,
                               pgvalue(viewAlias)));
      }

      statements.push(format('INSERT INTO %s (name, type, parent, form_id) SELECT %s, %s, %s, %s;',
                             systemTablesName,
                             pgvalue(viewAlias),
                             pgvalue(viewType),
                             pgvalue(view.table.parent ? view.table.parent.alias : null),
                             pgvalue(view.table.form_id)));

      if (this.includeColumns) {
        for (let i = 0; i < view.columns.length; ++i) {
          const column = view.columns[i];

          statements.push(format('DELETE FROM %s WHERE table_name = %s AND name = %s;',
                                 systemColumnsName,
                                 pgvalue(viewAlias),
                                 pgvalue(column.alias)));

          statements.push(format('INSERT INTO %s (table_name, name, ordinal, type, nullable, form_id) SELECT %s, %s, %s, %s, %s, %s;',
                                 systemColumnsName,
                                 pgvalue(viewAlias),
                                 pgvalue(column.alias),
                                 pgvalue(i + 1),
                                 pgvalue(column.column.type),
                                 pgvalue(column.column.allowNull ? 1 : 0),
                                 pgvalue(view.table.form_id)));
        }
      }
    }

    return statements.map(s => {
      return new sqldiff.SchemaChange('raw', {sql: s});
    });
  }
}
