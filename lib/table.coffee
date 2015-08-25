Column = require './column'

class Table
  constructor: (@id, @name, @type) ->
    @columns = []

  addColumn: (opts, system) ->
    opts.id       ?= opts.name
    opts.name     ?= opts.id
    opts.dataName ?= opts.name
    opts.null     ?= true
    opts.system   ?= !!system

    hasParameters = opts.id and opts.name and opts.type and opts.dataName

    throw new Error('must provide id, name, type and dataName parameters') unless hasParameters

    column = new Column(opts.id, opts.name, opts.type, opts.dataName, opts.null, opts.system)

    @columns.push(column)

module.exports = Table
