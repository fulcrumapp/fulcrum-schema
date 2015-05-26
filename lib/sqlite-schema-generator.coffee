_ = require 'underscore'
SchemaGeneratorBase = require './schema-generator-base'

class SqliteSchemaGenerator extends SchemaGeneratorBase
  typeForColumn: (column) ->
    @types ||=
      pk: 'INTEGER PRIMARY KEY AUTOINCREMENT'
      string:  'TEXT'
      integer: 'INTEGER'
      date:    'REAL'
      double:  'REAL'

    @types[column.type] or 'TEXT'

  transformToText: (columnName) ->
    "CAST(#{columnName} AS text)"

  # convert a text string to a number, but make sure 'aaa' results in NULL instead of 0
  transformToDouble: (columnName) ->
    "
  (CASE
  WHEN LENGTH(TRIM(#{columnName})) = 0
    THEN NULL
  WHEN CAST(#{columnName} AS REAL) = 0 AND LENGTH(TRIM(REPLACE(REPLACE(REPLACE(#{columnName}, '.', ''), '0', ' '), '-', ''))) > 0
    THEN NULL
  ELSE CAST(#{columnName} AS REAL)
  END)
"

  escape: (identifier) ->
    return '' unless identifier and identifier.length isnt 0
    "`#{identifier}`"

module.exports = SqliteSchemaGenerator
