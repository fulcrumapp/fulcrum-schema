
class Column
  constructor: (@id, @name, @type, @dataName, @null) ->

  isEqualTo: (column) ->
    @id is column.id and @name is column.name and @type is column.type and @null is column.null

module.exports = Column
