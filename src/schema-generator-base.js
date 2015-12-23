import _ from 'underscore';
import SchemaChange from './schema-change';
import SchemaGenerator from './schema-generator';
import {format as fmt} from 'util';

export default class SchemaGeneratorBase extends SchemaGenerator {
  constructor(changes, schemaDiff, options) {
    super(changes, schemaDiff, options);
    this.tableSchema = '';
    this.tablePrefix = '';
  }

  transform() {
    const changes = [];

    const columnRenamesAndDrops = _.select(this.changes, function (change) {
      return change.type === 'drop-column' || change.type === 'rename-column';
    });

    let tablesWithColumnDrops = _.map(columnRenamesAndDrops, function (change) {
      return change.options.newTable;
    });

    tablesWithColumnDrops = _.uniq(tablesWithColumnDrops, false, function (table) {
      return table.id;
    });

    const tablesIdentifiersWithColumnDrops = _.map(tablesWithColumnDrops, function (table) {
      return table.id;
    });

    console.log(this.changes);

    for (const change of this.changes) {
      const isSimpleChange = _.contains(['add-column', 'drop-column', 'rename-column'], change.type);

      const shouldReplaceWithRecreate = isSimpleChange && _.contains(tablesIdentifiersWithColumnDrops, change.options.newTable.id);

      if (!shouldReplaceWithRecreate) {
        changes.push(change);
      }
    }

    const ids = [];

    for (const drop of columnRenamesAndDrops) {
      if (!_.contains(ids, drop.options.newTable.id)) {
        changes.push(new SchemaChange('recreate-table', {oldTable: drop.options.oldTable, newTable: drop.options.newTable}));

        ids.push(drop.options.newTable.id);
      }
    }

    if (this.options.enableViews) {
      this.processViews(changes);
    }

    this.processIndexes(changes);

    return changes;
  }

  escape(identifier) {
    if (identifier == null || identifier.length === 0) {
      return '';
    }

    return '"' + (identifier.replace(/"/g, '""')) + '"';
  }

  columnDefinition(column) {
    return this.escape(column.name) + ' ' + this.typeForColumn(column) + this.columnModifiers(column);
  }

  columnModifiers(column) {
    return column.allowNull ? '' : ' NOT NULL';
  }

  columnsForTable(table) {
    return _.map(table.columns, this.columnDefinition.bind(this));
  }

  projectionForTable(table) {
    return _.map(table.columns, function (column) {
      return column.name;
    });
  }

  projectionForView(table) {
    const definitions = [];
    const columnNames = {};

    for (const column of table.columns) {
      // names can only be 63 chars, ugh
      let alias = column.dataName.substring(0, 63);

      if (column.system) {
        alias = this.schemaDiff.new.systemColumnNameAlias(table, column);

        if (alias == null) {
          continue;
        }
      }

      if (!columnNames[alias]) {
        definitions.push(fmt('%s AS %s', this.escape(column.name), this.escape(alias)));
        columnNames[alias] = column;
      }
    }

    return definitions;
  }

  mappingForTables(oldTable, newTable) {
    const mappings = [];

    for (const newColumn of newTable.columns) {
      const oldColumn = _.find(oldTable.columns, function (column) {
        return column.id === newColumn.id;
      });

      if (oldColumn) {
        mappings.push({
          old: oldColumn,
          new: newColumn
        });
      }
    }

    return mappings;
  }

  typeForColumn(column) {
    throw new Error('derived class must implement typeForColumn');
  }

  escapedSchema() {
    if (this.tableSchema == null || this.tableSchema.length === 0) {
      return '';
    }

    return this.escape(this.tableSchema) + '.';
  }

  createTable(change) {
    return fmt('CREATE TABLE %s%s (%s);',
               this.escapedSchema(), this.escape(this.tablePrefix + change.options.newTable.name),
               this.columnsForTable(change.options.newTable).join(', '));
  }

  transformToText(columnName) {
    throw new Error('derived class must implement transformToText');
  }

  transformToDouble(columnName) {
    throw new Error('derived class must implement transformToDouble');
  }

  recreateTable(change) {
    const newTableName = change.options.newTable.name;
    const oldTableName = change.options.oldTable.name;

    const newTemporaryTableName = 'tmp_new_' + newTableName;
    const oldTemporaryTableName = 'tmp_old_' + oldTableName;

    const mappings = this.mappingForTables(change.options.oldTable, change.options.newTable);

    const newColumns = _.map(mappings, (column) => {
      return this.escape(column.new.name);
    });

    const oldColumns = _.map(mappings, (column) => {
      // handle data type changes
      if (column.old.type !== 'double' && column.new.type === 'double') {
        return this.transformToDouble(this.escape(column.old.name));
      } else if (column.old.type === 'double' && column.new.type !== 'double') {
        return this.transformToText(this.escape(column.old.name));
      } else {
        return this.escape(column.old.name);
      }
    });

    const parts = [];

    const fullOldTempTableName = this.escapedSchema() + this.escape(this.tablePrefix + oldTemporaryTableName);
    const fullNewTempTableName = this.escapedSchema() + this.escape(this.tablePrefix + newTemporaryTableName);
    const fullOldTableName = this.escapedSchema() + this.escape(this.tablePrefix + oldTableName);
    // const fullNewTableName = this.escapedSchema() + this.escape(this.tablePrefix + newTableName);

    parts.push(fmt('CREATE TABLE %s (%s);',
                   fullNewTempTableName, this.columnsForTable(change.options.newTable).join(', ')));

    parts.push(fmt('INSERT INTO %s (%s) SELECT %s FROM %s;',
                   fullNewTempTableName, newColumns.join(', '), oldColumns.join(', '), fullOldTableName));

    parts.push(fmt('ALTER TABLE %s RENAME TO %s;',
                   fullOldTableName, this.escape(this.tablePrefix + oldTemporaryTableName)));

    parts.push(fmt('ALTER TABLE %s RENAME TO %s;',
                   fullNewTempTableName, this.escape(this.tablePrefix + newTableName)));

    parts.push(this.dropTableStatement(fullOldTempTableName));

    return parts;
  }

  dropTableStatement(name) {
    return fmt('DROP TABLE IF EXISTS %s;', name);
  }

  dropTable(change) {
    return this.dropTableStatement(this.escapedSchema() + this.escape(this.tablePrefix + change.options.oldTable.name));
  }

  addColumn(change) {
    return fmt('ALTER TABLE %s%s ADD COLUMN %s;',
               this.escapedSchema(), this.escape(this.tablePrefix + change.options.newTable.name),
               this.columnDefinition(change.options.column));
  }

  dropColumn(change) {
    throw new Error('dropColumn is not implemented.');
  }

  renameColumn(change) {
    throw new Error('renameColumn is not implemented.');
  }

  tableName(table) {
    return this.escapedSchema() + this.escape(this.tablePrefix + table.name);
  }

  viewName(table) {
    return this.escapedSchema() + this.escape(this.tablePrefix + table.name + '_view');
  }

  indexName(table, columns) {
    return this.escape('idx_' + this.tablePrefix + table.name + '_' + columns.join('_'));
  }

  dropView(change) {
    return fmt('DROP VIEW IF EXISTS %s;', this.viewName(change.options.oldTable));
  }

  createView(change) {
    return fmt('CREATE VIEW IF NOT EXISTS %s AS SELECT %s FROM %s;',
               this.viewName(change.options.newTable),
               this.projectionForView(change.options.newTable),
               this.tableName(change.options.newTable));
  }

  createIndex(change) {
    return fmt('CREATE INDEX %s ON %s (%s);',
               this.indexName(change.options.newTable, change.options.columns),
               this.tableName(change.options.newTable),
               change.options.columns.join(', '));
  }

  processViews(changes) {
    const views = [];

    // build the list of tables to create views from, skipping the _values one
    for (const change of changes) {
      if (change.options.newTable && change.options.newTable.type !== 'values' && !_.contains(views, change.options.newTable.name)) {
        views.push(change.options.newTable.id);
      }
    }

    if (this.schemaDiff.new) {
      for (const table of this.schemaDiff.new.tables) {
        if (_.contains(views, table.id)) {
          changes.push(new SchemaChange('drop-view', { oldTable: table }));
          changes.push(new SchemaChange('create-view', { newTable: table }));
        }
      }
    }
  }

  processIndexes(changes) {
    for (const change of changes) {
      const createIndexes = _.contains(['create-table', 'recreate-table'], change.type);

      if (!createIndexes) {
        continue;
      }

      switch (change.options.newTable.type) {
        case 'form':
          changes.push(new SchemaChange('create-index', { newTable: change.options.newTable, columns: ['record_id'] }));
          changes.push(new SchemaChange('create-index', { newTable: change.options.newTable, columns: ['record_resource_id'] }));

          if (this.schemaDiff.new.options.full) {
            changes.push(new SchemaChange('create-index', { newTable: change.options.newTable, columns: ['geometry'], type: 'gist' }));
            changes.push(new SchemaChange('create-index', { newTable: change.options.newTable, columns: ['record_index'], type: 'gin' }));
          }

          break;

        case 'repeatable':
          changes.push(new SchemaChange('create-index', { newTable: change.options.newTable, columns: ['record_id'] }));
          changes.push(new SchemaChange('create-index', { newTable: change.options.newTable, columns: ['record_resource_id'] }));
          changes.push(new SchemaChange('create-index', { newTable: change.options.newTable, columns: ['resource_id'] }));
          changes.push(new SchemaChange('create-index', { newTable: change.options.newTable, columns: ['parent_resource_id'] }));

          if (this.schemaDiff.new.options.full) {
            changes.push(new SchemaChange('create-index', { newTable: change.options.newTable, columns: ['geometry'], type: 'gist' }));
            changes.push(new SchemaChange('create-index', { newTable: change.options.newTable, columns: ['record_index'], type: 'gin' }));
          }

          break;

        case 'values':
          changes.push(new SchemaChange('create-index', { newTable: change.options.newTable, columns: ['record_id'] }));
          changes.push(new SchemaChange('create-index', { newTable: change.options.newTable, columns: ['parent_resource_id'] }));

          break;

        default: break;
      }
    }
  }
}
