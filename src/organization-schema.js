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

      definition.define();
      definition.view();

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

    this.tables.push(table);
  }

  buildViews() {
    for (const table of this.tables) {
      const view = new View(table.name + '_view', null, table);

      const columnNames = {};

      const definition = this.tableDefinitions[table.name];

      for (const column of table.columns) {
        console.log(definition.viewColumns);
        const alias = definition.viewColumns[column.name];

        if (alias == null) {
          continue;
        }

        if (!columnNames[alias]) {
          view.addColumn({column: column, alias: alias});
          columnNames[alias] = column;
        }
      }

      this.views.push(view);
    }
  }
}
