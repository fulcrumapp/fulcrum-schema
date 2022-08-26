export default class TableDefinition {
  constructor() {
    this.columns = [];
    this.viewColumns = {};
    this.indexes = [];
  }

  column(name, type, options) {
    this.columns.push({name: name, type: type, ...options});
  }

  pk() {
    this.column('id', 'pk');
  }

  integer(name, options) {
    this.column(name, 'integer', options);
  }

  string(name, options) {
    this.column(name, 'string', options);
  }

  timestamp(name, options) {
    this.column(name, 'timestamp', options);
  }

  boolean(name, options) {
    this.column(name, 'boolean', options);
  }

  double(name, options) {
    this.column(name, 'double', options);
  }

  text(name, options) {
    this.column(name, 'text', options);
  }

  array(name, options) {
    this.column(name, 'array', options);
  }

  fts(name, options) {
    this.column(name, 'fts', options);
  }

  geometry(name, options) {
    this.column(name, 'geometry', options);
  }

  json(name, options) {
    this.column(name, 'json', options);
  }

  jsonb(name, options) {
    this.column(name, 'jsonb', options);
  }

  alias(source, to) {
    this.viewColumns[source] = to;
  }

  index(options) {
    this.indexes.push(options);
  }

  define() {
    return null;
  }
}
