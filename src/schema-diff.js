import _ from 'underscore';
import SchemaChange from './schema-change';

export default class SchemaDiff {
  constructor(oldSchema, newSchema) {
    this.old = oldSchema;
    this.new = newSchema;
  }

  diff() {
    this.changes = [];

    this.diffTables();
    this.diffColumns();
    this.conflate();

    console.log('CHANGES', this.changes);

    return this.changes;
  }

  diffTables() {
    const newTables = (this.new ? this.new.tables : null);
    const oldTables = (this.old ? this.old.tables : null);

    if (this.old) {
      for (const oldTable of this.old.tables) {
        let newTable = null;

        if (newTables) {
          newTable = _.find(newTables, (t) => t.id === oldTable.id);
        }

        if (newTable) {
          if (newTable.name !== oldTable.name) {
            this.changes.push(new SchemaChange('rename-table', {oldTable: oldTable, newTable: newTable}));
          }
        } else {
          this.changes.push(new SchemaChange('drop-table', {oldTable: oldTable}));
        }
      }
    }

    if (this.new) {
      for (const newTable of this.new.tables) {
        let oldTable = null;

        if (oldTables) {
          oldTable = _.find(oldTables, (t) => t.id === newTable.id);
        }

        if (!oldTable) {
          this.changes.push(new SchemaChange('create-table', {newTable: newTable}));
        }
      }
    }
  }

  conflate() {
    const recreates = _.select(this.changes, (change) => {
      return change.type === 'recreate-table';
    });

    const ids = _.map(recreates, (change) => change.options.newTable.id);

    this.changes = _.reject(this.changes, (change) => {
      const isSimpleChange = _.contains(['rename-column', 'drop-column', 'add-column'], change.type);

      let isTableAlreadyBeingRecreated = false;

      if (change.options.newTable) {
        isTableAlreadyBeingRecreated = _.contains(ids, change.options.newTable.id);
      }

      return isSimpleChange && isTableAlreadyBeingRecreated;
    });
  }

  diffColumns() {
    let tables = null;

    console.log('NEW', this.new);

    if (this.new) {
      tables = this.new.tables.map((newTable) => {
        let oldTable = null;

        if (this.old) {
          oldTable = _.find(this.old.tables, (t) => t.id === newTable.id);
        }

        return { old: oldTable, new: newTable };
      });
    }

    console.log('TABLEZ 1', tables);

    // only process column-level changes on tables that exist already
    tables = _.filter(tables, (pair) => {
      return pair.old &&
             pair.new &&
             pair.old.id === pair.new.id;
    });

    const recreatedTableIdentifiers = [];

    console.log('TABLEZ', tables);

    for (const pair of tables) {
      console.log('PAIR', pair);

      const oldColumns = (pair.old ? pair.old.columns : []);
      const newColumns = (pair.new ? pair.new.columns : []);

      for (let oldIndex = 0; oldIndex < oldColumns.length; ++oldIndex) {
        const oldColumn = oldColumns[oldIndex];

        let exists = false;

        for (let newIndex = 0; newIndex < newColumns.length; ++newIndex) {
          const newColumn = newColumns[newIndex];

          if (oldColumn.id === newColumn.id) {
            // the column still exists, but something could've changed about it
            if (oldIndex !== newIndex || !newColumn.isEqualTo(oldColumn)) {
              // column reordering requires rebuilding the entire table, 1 per table
              if (!_.contains(recreatedTableIdentifiers, pair.new.id)) {
                this.changes.push(new SchemaChange('recreate-table', {oldTable: pair.old, newTable: pair.new}));
                recreatedTableIdentifiers.push(pair.new.id);
              }
            } else if (oldColumn.name !== newColumn.name) {
              this.changes.push(new SchemaChange('rename-column', {oldTable: pair.old, newTable: pair.new, column: oldColumn}));
            }

            exists = true;
          }
        }

        if (!exists) {
          this.changes.push(new SchemaChange('drop-column', {oldTable: pair.old, newTable: pair.new, column: oldColumn}));
        }
      }

      for (let newIndex = 0; newIndex < newColumns.length; ++newIndex) {
        const newColumn = newColumns[newIndex];

        let exists = false;

        for (let oldIndex = 0; oldIndex < oldColumns.length; ++oldIndex) {
          const oldColumn = oldColumns[oldIndex];

          if (oldColumn.id === newColumn.id) {
            exists = true;
          }
        }

        if (!exists) {
          this.changes.push(new SchemaChange('add-column', {oldTable: pair.old, newTable: pair.new, column: newColumn}));
        }
      }
    }
  }
}
