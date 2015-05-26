class SchemaChange
  @TYPES:
    createTable:   'create-table'
    recreateTable: 'recreate-table'
    dropTable:     'drop-table'
    addColumn:     'add-column'
    dropColumn:    'drop-column'
    renameColumn:  'rename-column'

  constructor: (@type, @options) ->

module.exports = SchemaChange
