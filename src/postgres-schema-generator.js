import SchemaGeneratorBase from './schema-generator-base';
import {format as fmt} from 'util';

export default class PostgresSchemaGenerator extends SchemaGeneratorBase {
  typeForColumn(column) {
    if (!this.types) {
      this.types = {
        pk: 'bigserial NOT NULL',
        string: 'text',
        integer: 'bigint',
        date: 'float',
        double: 'float',
        timestamp: 'timestamp without time zone',
        geometry: 'geometry(Geometry, 4326)',
        array: 'text[]',
        fts: 'tsvector'
      };
    }

    return this.types[column.type] || 'text';
  }

  transformToText(columnName) {
    return fmt('CAST(%s AS text)', columnName);
  }

  transformToDouble(columnName) {
    return fmt('convert_to_float(%s)', columnName);
  }

  createIndex(change) {
    const type = change.options.type || 'btree';
    const indexName = this.indexName(change.options.newTable, change.options.columns);
    const tableName = this.tableName(change.options.newTable);
    const columns = change.options.columns.join(', ');

    return fmt('CREATE INDEX %s ON %s USING %s (%s);',
               indexName, tableName, type, columns);
  }

  dropTableStatement(name) {
    return fmt('DROP TABLE IF EXISTS %s CASCADE;', name);
  }

  createView(change) {
    const viewName = this.viewName(change.options.newTable);
    const viewDefinition = this.projectionForView(change.options.newTable);
    const tableName = this.tableName(change.options.newTable);

    return fmt('CREATE OR REPLACE VIEW %s AS SELECT %s FROM %s;',
               viewName, viewDefinition, tableName);
  }
}
