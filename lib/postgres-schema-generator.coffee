_ = require 'underscore'
SchemaGeneratorBase = require './schema-generator-base'

class PostgresSchemaGenerator extends SchemaGeneratorBase
  typeForColumn: (column) ->
    @types ||=
      pk:        'bigserial NOT NULL'
      string:    'text'
      integer:   'bigint'
      date:      'float'
      double:    'float'
      timestamp: 'timestamp without time zone'
      geometry:  'geometry(Geometry, 4326)'
      array:     'text[]'
      fts:       'tsvector'

    @types[column.type] or 'text'

  transformToText: (columnName) ->
    "CAST(#{columnName} AS text)"

  transformToDouble: (columnName) ->
    "convert_to_float(#{columnName})"

  createIndex: (change) ->
    type = change.options.type or 'btree'
    "CREATE INDEX #{@indexName(change.options.newTable, change.options.columns)} ON #{@tableName(change.options.newTable)} USING #{type} (#{change.options.columns.join(', ')});"

  _dropTable: (name) ->
    "DROP TABLE IF EXISTS #{name} CASCADE;"

  createView: (change) ->
    """
    CREATE OR REPLACE VIEW #{@viewName(change.options.newTable)}
    AS SELECT
      #{@projectionForView(change.options.newTable)}
    FROM
      #{@tableName(change.options.newTable)};
    """

module.exports = PostgresSchemaGenerator
