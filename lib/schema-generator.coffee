_ = require 'underscore'

class SchemaGenerator
  constructor: (@changes) ->

  transform: ->
    @changes

  generate: ->
    _.map @transform(), @statementForChange

  statementForChange: (change) =>
    switch change.type
      when 'create-table'   then @createTable(change)
      when 'recreate-table' then @recreateTable(change)
      when 'drop-table'     then @dropTable(change)
      when 'add-column'     then @addColumn(change)
      when 'drop-column'    then @dropColumn(change)
      when 'rename-column'  then @renameColumn(change)
      else throw new Error("Invalid change type #{change.type}")

  createTable: (change) ->
    throw new Error('createTable must be implemented in a derived class')

  recreateTable: (change) ->
    throw new Error('recreateTable must be implemented in a derived class')

  dropTable: (change) ->
    throw new Error('dropTable must be implemented in a derived class')

  addColumn: (change) ->
    throw new Error('addColumn must be implemented in a derived class')

  dropColumn: (change) ->
    throw new Error('dropColumn must be implemented in a derived class')

  renameColumn: (change) ->
    throw new Error('renameColumn must be implemented in a derived class')

module.exports = SchemaGenerator
