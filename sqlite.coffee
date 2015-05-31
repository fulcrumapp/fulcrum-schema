Schema = require './lib/schema'
SchemaDiff = require './lib/schema-diff'
SqliteSchemaGenerator = require './lib/sqlite-schema-generator'

instance = Function("return this")()

instance.oldForm = null
instance.newForm = null
instance.prefix = null

instance.compareForms = ->
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

  generator = new SqliteSchemaGenerator(diff, newSchema)
  generator.tablePrefix = instance.prefix

  generator.generate()

module.exports = instance
