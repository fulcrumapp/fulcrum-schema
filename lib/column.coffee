
class Column
  constructor: (@id, @name, @type, @dataName) ->

  isEqualTo: (column) ->
    @id is column.id and @name is column.name and @type is column.type

module.exports = Column
