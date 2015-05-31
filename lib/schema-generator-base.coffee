_ = require 'underscore'
SchemaChange = require './schema-change'
SchemaGenerator = require './schema-generator'

class SchemaGeneratorBase extends SchemaGenerator
  transform: ->
    # sqlite doesn't support dropping or renaming columns, so they must be transformed into table re-creations
    changes = []

    columnRenamesAndDrops = _.select @changes, (change) ->
      change.type is 'drop-column' or change.type is 'rename-column'

    tablesWithColumnDrops = _.map columnRenamesAndDrops, (change) ->
      change.options.newTable

    tablesWithColumnDrops = _.uniq(tablesWithColumnDrops, false, (table) -> table.id)

    tablesIdentifiersWithColumnDrops = _.map(tablesWithColumnDrops, (table) -> table.id)

    for change in @changes
      isSimpleChange = _.contains(['add-column', 'drop-column', 'rename-column'], change.type)

      shouldReplaceWithRecreate = isSimpleChange and _.contains(tablesIdentifiersWithColumnDrops, change.options.newTable.id)

      changes.push(change) unless shouldReplaceWithRecreate

    ids = []

    for drop in columnRenamesAndDrops
      unless _.contains(ids, drop.options.newTable.id)
        changes.push(new SchemaChange('recreate-table', oldTable: drop.options.oldTable, newTable: drop.options.newTable))

        ids.push(drop.options.newTable.id)

    @processViews(changes)
    @processIndexes(changes)

    changes

  escape: (identifier) ->
    return '' unless identifier and identifier.length isnt 0
    "\"#{identifier}\""

  columnDefinition: (column) =>
    "#{@escape(column.name)} #{@typeForColumn(column)}"

  columnsForTable: (table) ->
    _.map table.columns, @columnDefinition

  projectionForTable: (table) ->
    _.map table.columns, (column) -> column.name

  projectionForView: (table) ->
    _.map table.columns, (column) => "#{@escape(column.name)} AS #{@escape(column.dataName)}"

  mappingForTables: (oldTable, newTable) ->
    mappings = []

    for newColumn in newTable.columns
      oldColumn = _.find oldTable.columns, (column) -> column.id is newColumn.id

      if oldColumn
        mappings.push(old: oldColumn, new: newColumn)

    mappings

  typeForColumn: (column) ->
    throw new Error('derived class must implement typeForColumn')

  tableSchema: ''

  tablePrefix: ''

  escapedSchema: ->
    return '' unless @tableSchema and @tableSchema.length isnt 0
    @escape(@tableSchema) + '.'

  createTable: (change) ->
    "CREATE TABLE #{@escapedSchema()}#{@escape(@tablePrefix + change.options.newTable.name)} (#{@columnsForTable(change.options.newTable).join(', ')});"

  transformToText: (columnName) ->
    throw new Error('derived class must implement transformToText')

  transformToDouble: (columnName) ->
    throw new Error('derived class must implement transformToDouble')

  recreateTable: (change) ->
    newTableName = change.options.newTable.name
    oldTableName = change.options.oldTable.name

    newTemporaryTableName = 'tmp_new_' + newTableName
    oldTemporaryTableName = 'tmp_old_' + oldTableName

    mappings = @mappingForTables(change.options.oldTable, change.options.newTable)

    newColumns = _.map(mappings, (column) => @escape(column.new.name))
    oldColumns = _.map mappings, (column) =>
      if column.old.type isnt 'double' and column.new.type is 'double'
        @transformToDouble(@escape(column.old.name))
      else if column.old.type is 'double' and column.new.type isnt 'double'
        @transformToText(@escape(column.old.name))
      else
        @escape(column.old.name)

    parts = []

    fullOldTempTableName = @escapedSchema() + @escape(@tablePrefix + oldTemporaryTableName)
    fullNewTempTableName = @escapedSchema() + @escape(@tablePrefix + newTemporaryTableName)

    fullOldTableName = @escapedSchema() + @escape(@tablePrefix + oldTableName)
    fullNewTableName = @escapedSchema() + @escape(@tablePrefix + newTableName)

    parts.push("CREATE TABLE #{fullNewTempTableName} (#{@columnsForTable(change.options.newTable).join(', ')});")
    parts.push("INSERT INTO #{fullNewTempTableName} (#{newColumns.join(', ')})
                SELECT #{oldColumns.join(', ')} FROM #{fullOldTableName};")
    parts.push("ALTER TABLE #{fullOldTableName} RENAME TO #{@escape(@tablePrefix + oldTemporaryTableName)};")
    parts.push("ALTER TABLE #{fullNewTempTableName} RENAME TO #{@escape(@tablePrefix + newTableName)};")
    parts.push("DROP TABLE #{fullOldTempTableName};")

    parts

  dropTable: (change) ->
    "DROP TABLE IF EXISTS #{@escapedSchema()}#{@escape(@tablePrefix + change.options.oldTable.name)};"

  addColumn: (change) ->
    "ALTER TABLE #{@escapedSchema()}#{@escape(@tablePrefix + change.options.newTable.name)} ADD COLUMN #{@columnDefinition(change.options.column)};"

  dropColumn: (change) ->
    throw new Error('dropColumn is not implemented.')

  renameColumn: (change) ->
    throw new Error('renameColumn is not implemented.')

  tableName: (table) ->
    "#{@escapedSchema()}#{@escape(@tablePrefix + table.name)}"

  viewName: (table) ->
    "#{@escapedSchema()}#{@escape(@tablePrefix + table.name + '_view')}"

  dropView: (change) ->
    "DROP VIEW IF EXISTS #{@viewName(change.options.oldTable)};"

  createView: (change) ->
    "CREATE VIEW IF NOT EXISTS #{@viewName(change.options.newTable)} AS SELECT #{@projectionForView(change.options.newTable)} FROM #{@tableName(change.options.newTable)};"

  processViews: (changes) ->
    views = []

    for change in changes
      if change.options.newTable and change.options.newTable.type isnt 'values' and not _.contains(views, change.options.newTable.name)
        views.push(change.options.newTable.id)

    for table in @newSchema.tables
      if _.contains(views, table.id)
        changes.push(new SchemaChange('drop-view', oldTable: table))
        changes.push(new SchemaChange('create-view', newTable: table))

  processIndexes: (changes) ->

module.exports = SchemaGeneratorBase
