import _ from 'underscore';

export default class SchemaGenerator {
  constructor(changes, schemaDiff, options) {
    this.changes = changes;
    this.schemaDiff = schemaDiff;
    this.options = options != null ? options : {};
  }

  transform() {
    return this.changes;
  }

  generate() {
    const transformed = this.transform();

    console.log('TRANS', transformed);
    this.schemaChanges = _.flatten(_.map(transformed, this.statementForChange.bind(this)));

    return this.schemaChanges;
  }

  statementForChange(change) {
    switch (change.type) {
      case 'create-table':
        return this.createTable(change);
      case 'recreate-table':
        return this.recreateTable(change);
      case 'drop-table':
        return this.dropTable(change);
      case 'add-column':
        return this.addColumn(change);
      case 'drop-column':
        return this.dropColumn(change);
      case 'rename-column':
        return this.renameColumn(change);
      case 'drop-view':
        return this.dropView(change);
      case 'create-view':
        return this.createView(change);
      case 'create-index':
        return this.createIndex(change);
      default:
        throw new Error('Invalid change type ' + change.type);
    }
  }

  createTable(change) {
    throw new Error('createTable must be implemented in a derived class');
  }

  recreateTable(change) {
    throw new Error('recreateTable must be implemented in a derived class');
  }

  dropTable(change) {
    throw new Error('dropTable must be implemented in a derived class');
  }

  addColumn(change) {
    throw new Error('addColumn must be implemented in a derived class');
  }

  dropColumn(change) {
    throw new Error('dropColumn must be implemented in a derived class');
  }

  renameColumn(change) {
    throw new Error('renameColumn must be implemented in a derived class');
  }

  dropView(change) {
    throw new Error('dropView must be implemented in a derived class');
  }

  createView(change) {
    throw new Error('createView must be implemented in a derived class');
  }

  createIndex(change) {
    throw new Error('createIndex must be implemented in a derived class');
  }
}
