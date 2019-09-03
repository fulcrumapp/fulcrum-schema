import _ from 'underscore';
import sqldiff from 'sqldiff';

const {Table, View} = sqldiff;

export default class OrganizationSchema {
  constructor(schema, options) {
    this.schema = schema;
    this.options = options || {};
    this.buildSchema();
  }

  buildSchema() {
    this.tables = [];
    this.tableDefinitions = {};
    this.views = [];

    for (const table of this.schema) {
      const ModelClass = table;

      const definition = new ModelClass();

      definition.defineTable();
      definition.defineView();
      definition.defineIndexes();

      this.tableDefinitions[definition.name] = definition;

      this.buildTable(definition);
    }

    this.buildViews();
  }

  buildTable(tableDefinition) {
    const table = new Table(tableDefinition.name, null, {type: 'system', alias: tableDefinition.name});

    for (const column of tableDefinition.columns) {
      const systemColumn = _.clone(column);

      systemColumn.system = true;

      table.addColumn(systemColumn);
    }

    for (const indexDefinition of tableDefinition.indexes) {
      table.addIndex(indexDefinition);
    }

    this.tables.push(table);
  }

  buildViews() {
    for (const table of this.tables) {
      const alias = table.name.replace(/^query_/, '');

      const view = new View(alias + '_view', null, table, {alias});

      const columnNames = {};

      const definition = this.tableDefinitions[table.name];

      for (const column of table.columns) {
        const alias = definition.viewColumns[column.name];

        if (alias == null) {
          // console.log('Skipping ' + table.name + '.' + column.name + ' in view.');
          continue;
        }

        if (!columnNames[alias]) {
          view.addColumn({column: column, alias: alias});
          columnNames[alias] = column;
        }
      }

      if (view.columns.length) {
        this.views.push(view);
      }
    }
  }
}
