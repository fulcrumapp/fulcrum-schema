Schema = require './lib/schema'
SchemaDiff = require './lib/schema-diff'
PostgresSchemaGenerator = require './lib/postgres-schema-generator'

instance = Function("return this")()

instance.oldForm = null
instance.newForm = null
instance.schema = null

instance.compareForms = ->
  try
    if instance.oldForm
      oldSchema = Schema(instance.oldForm)
    else
      oldSchema = null

    if instance.newForm
      newSchema = Schema(instance.newForm)
    else
      newSchema = null

    schemaDiff = new SchemaDiff(oldSchema, newSchema)

    diff = schemaDiff.diff()

    generator = new PostgresSchemaGenerator(diff)
    generator.tableSchema = instance.schema

    generator.generate()
  catch err
    throw new Error(err.stack.toString())

module.exports = instance
