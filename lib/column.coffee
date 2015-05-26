
class Column
  constructor: (@id, @name, @type) ->

  isEqualTo: (column) ->
    @id is column.id and @name is column.name and @type is column.type

module.exports = Column
