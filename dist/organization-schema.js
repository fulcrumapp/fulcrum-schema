'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _sqldiff = require('sqldiff');

var _sqldiff2 = _interopRequireDefault(_sqldiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Table = _sqldiff2.default.Table;
const View = _sqldiff2.default.View;
class OrganizationSchema {
  constructor(schema, options) {
    this.schema = schema;
    this.options = options || {};
    this.buildSchema();
  }

  buildSchema() {
    this.tables = [];
    this.views = [];

    this.buildTable('changesets', this.schema.systemChangesetsTable);
    this.buildTable('forms', this.schema.systemFormsTable);
    this.buildTable('choice_lists', this.schema.systemChoiceListsTable);
    this.buildTable('classification_sets', this.schema.systemClassificationSetsTable);
    this.buildTable('projects', this.schema.systemProjectsTable);
    this.buildTable('roles', this.schema.systemRolesTable);
    this.buildTable('memberships', this.schema.systemMembershipsTable);
    this.buildTable('photos', this.schema.systemPhotosTable);
    this.buildTable('videos', this.schema.systemVideosTable);
    this.buildTable('audio', this.schema.systemAudioTable);
    this.buildTable('signatures', this.schema.systemSignaturesTable);

    this.buildViews();
  }

  buildTable(name, definition) {
    const table = new Table(name, null, { type: 'system', alias: name });

    for (const column of definition) {
      const systemColumn = _underscore2.default.clone(column);

      systemColumn.system = true;

      table.addColumn(systemColumn);
    }

    this.tables.push(table);
  }

  buildViews() {
    for (const table of this.tables) {
      const view = new View(table.name, null, table);

      const columnNames = {};

      for (const column of table.columns) {
        let alias = this.viewColumnName(table, column);

        if (alias == null) {
          continue;
        }

        if (!columnNames[alias]) {
          view.addColumn({ column: column, alias: alias });
          columnNames[alias] = column;
        }
      }

      this.views.push(view);
    }
  }

  viewColumnName(table, column) {
    return this.schema.organizationViews[table.name][column.name];
  }
}
exports.default = OrganizationSchema;
//# sourceMappingURL=organization-schema.js.map