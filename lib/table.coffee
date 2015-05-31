Column = require './column'

class Table
  constructor: (@id, @name, @type) ->
    @columns = []

  addColumn: (opts) ->
    opts.id       ?= opts.name
    opts.name     ?= opts.id
    opts.dataName ?= opts.name

    hasParameters = opts.id and opts.name and opts.type and opts.dataName

    throw new Error('must provide id, name, type and dataName parameters') unless hasParameters

    column = new Column(opts.id, opts.name, opts.type, opts.dataName)

    @columns.push(column)

module.exports = Table
