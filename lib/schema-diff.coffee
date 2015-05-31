_ = require 'underscore'
SchemaChange = require './schema-change'

class SchemaDiff
  constructor: (@old, @new) ->

  # rearranging a column requires rebuilding the entire thing

  diff: ->
    @changes = []

    @diffTables()

    @diffColumns()

    @conflate()

  diffTables: ->
    @old?.tables.forEach (oldTable) =>
      newTable = _.find @new?.tables, (t) -> t.id is oldTable.id

      if newTable
        if newTable.name isnt oldTable.name
          @changes.push(new SchemaChange('rename-table', oldTable: oldTable, newTable: newTable))
      else
        @changes.push(new SchemaChange('drop-table', oldTable: oldTable))

    @new?.tables.forEach (newTable) =>
      oldTable = _.find @old?.tables, (t) -> t.id is newTable.id

      unless oldTable
        @changes.push(new SchemaChange('create-table', newTable: newTable))

  conflate: ->
    recreates = _.select @changes, (change) =>
      change.type is 'recreate-table'

    ids = _.map recreates, (change) -> change.options.newTable.id

    @changes = _.reject @changes, (change) =>
      isSimpleChange = _.contains(['rename-column', 'drop-column', 'add-column'], change.type)

      isTableAlreadyBeingRecreated = _.contains(ids, change.options.newTable?.id)

      isSimpleChange and isTableAlreadyBeingRecreated

  diffColumns: ->
    tables = @new?.tables.map (newTable) =>
      oldTable = _.find @old?.tables, (t) -> t.id is newTable.id

      { old: oldTable, new: newTable }

    # only process column-level changes on tables that exist already
    tables = _.filter tables, (pair) =>
      pair.old?.id is pair.new?.id

    recreatedTableIdentifiers = []

    for pair in tables
      for oldColumn, oldIndex in (pair.old?.columns or [])
        exists = false

        for newColumn, newIndex in (pair.new?.columns or [])
          if oldColumn.id is newColumn.id
            # the column still exists, but something could've changed about it
            if oldIndex isnt newIndex
              # column reordering requires rebuilding the entire table, 1 per table
              unless _.contains(recreatedTableIdentifiers, pair.new.id)
                @changes.push(new SchemaChange('recreate-table', oldTable: pair.old, newTable: pair.new))
                recreatedTableIdentifiers.push(pair.new.id)

            else if oldColumn.name isnt newColumn.name
              @changes.push(new SchemaChange('rename-column', oldTable: pair.old, newTable: pair.new, column: oldColumn))

            exists = true
          else

        unless exists
          @changes.push(new SchemaChange('drop-column', oldTable: pair.old, newTable: pair.new, column: oldColumn))

      for newColumn, newIndex in (pair.new?.columns or [])
        exists = false

        for oldColumn, oldIndex in (pair.old?.columns or [])
          if oldColumn.id is newColumn.id
            exists = true

        unless exists
          @changes.push(new SchemaChange('add-column', oldTable: pair.old, newTable: pair.new, column: newColumn))

module.exports = SchemaDiff
