_ = require 'underscore'
SchemaGeneratorBase = require './schema-generator-base'

class PostgresSchemaGenerator extends SchemaGeneratorBase
  typeForColumn: (column) ->
    @types ||=
      pk: 'bigserial NOT NULL'
      string:  'text'
      integer: 'bigint'
      date:    'float'
      double:  'float'

    @types[column.type] or 'text'

  transformToText: (columnName) ->
    "CAST(#{columnName} AS text)"

  transformToDouble: (columnName) ->
    "convert_to_float(#{columnName})"

module.exports = PostgresSchemaGenerator
