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
      oldSchema = Schema(instance.oldForm, full: true, mediaCaptions: true)
    else
      oldSchema = null

    if instance.newForm
      newSchema = Schema(instance.newForm, full: true, mediaCaptions: true)
    else
      newSchema = null

    schemaDiff = new SchemaDiff(oldSchema, newSchema)

    diff = schemaDiff.diff()

    generator = new PostgresSchemaGenerator(diff, schemaDiff, enableViews: true)
    generator.tableSchema = instance.schema

    generator.generate()
  catch err
    throw new Error(err.stack.toString())

module.exports = instance
