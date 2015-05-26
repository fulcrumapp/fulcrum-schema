Column = require './column'

class Table
  constructor: (@id, @name) ->
    @columns = []

  addColumn: (id, name, type) ->
    throw new Error('must provide id, name and type parameters') unless arguments.length is 3

    column = new Column(id, name, type)

    @columns.push(column)

module.exports = Table
