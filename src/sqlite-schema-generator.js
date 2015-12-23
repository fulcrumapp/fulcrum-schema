import SchemaGeneratorBase from './schema-generator-base';
import {format as fmt} from 'util';

export default class SqliteSchemaGenerator extends SchemaGeneratorBase {
  typeForColumn(column) {
    if (!this.types) {
      this.types = {
        pk: 'INTEGER PRIMARY KEY AUTOINCREMENT',
        string: 'TEXT',
        integer: 'INTEGER',
        date: 'REAL',
        double: 'REAL',
        array: 'TEXT',
        timestamp: 'REAL'
      };
    }

    return this.types[column.type] || 'TEXT';
  }

  transformToText(columnName) {
    return fmt('CAST(%s AS text)', columnName);
  }

  transformToDouble(columnName) {
    return fmt("(CASE WHEN LENGTH(TRIM(%s)) = 0 THEN NULL WHEN CAST(%s AS REAL) = 0 AND LENGTH(TRIM(REPLACE(REPLACE(REPLACE(%s, '.', ''), '0', ' '), '-', ''))) > 0 THEN NULL ELSE CAST(%s AS REAL) END)",
               columnName, columnName, columnName, columnName);
  }

  createIndex(change) {
    return fmt('CREATE INDEX IF NOT EXISTS %s ON %s (%s);',
               this.indexName(change.options.newTable, change.options.columns),
               this.tableName(change.options.newTable),
               change.options.columns.join(', '));
  }

  escape(identifier) {
    if (identifier == null || identifier.length === 0) {
      return '';
    }

    return '`' + identifier + '`';
  }
}
