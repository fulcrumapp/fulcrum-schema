const TYPES = {
  createTable: 'create-table',
  recreateTable: 'recreate-table',
  dropTable: 'drop-table',
  addColumn: 'add-column',
  dropColumn: 'drop-column',
  renameColumn: 'rename-column'
};

export default class SchemaChange {
  constructor(type, options) {
    this.type = type;
    this.options = options;
  }

  static get TYPES() {
    return TYPES;
  }
}
