fs = require 'fs'
path = require 'path'
buildSchema = require '../lib/schema'
SchemaDiff = require '../lib/schema-diff'
SqliteSchemaGenerator = require '../lib/postgres-schema-generator'
CSON = require 'season'
_ = require 'underscore'

DIST = process.env.DIST or false

shouldBeNull = (value) ->
  (value is null).should.be.true

shouldHaveNoValue = (value) ->
  (value is NO_VALUE).should.be.true

shouldBeUndefined = (value) ->
  (value is undefined).should.be.true

form = null
newForm = null

beforeEach ->
  form = JSON.parse(fs.readFileSync('./test/form.json')).form
  newForm = JSON.parse(fs.readFileSync('./test/form-new.json')).form

  form.id = 67
  newForm.id = 67

describe 'buildSchema', ->
  it 'builds a table schema from a form', ->
    # buildSchema(form).should.be.eql {}

describe 'SchemaDiff', ->
  it 'builds a schema diff from a form', ->
    # schema = buildSchema(form)
    # schemaDiff = new SchemaDiff(null, schema)
    # schemaDiff.diff().should.be.eql {}

dumpScript = (scripts) ->
  console.log '----------------------------------'
  console.log _.flatten(scripts).join("\n\n")
  console.log '----------------------------------'

describe 'SqliteSchemaGenerator', ->
  it 'builds a schema diff from a form', ->
    oldSchema = buildSchema(form)
    newSchema = buildSchema(newForm)

    # schemaDiff = new SchemaDiff(null, oldSchema)
    # diff = schemaDiff.diff()
    # sqlite = new SqliteSchemaGenerator(diff)
    # sql = sqlite.generate()
    # dumpScript(sql)


    schemaDiff = new SchemaDiff(oldSchema, newSchema)
    diff = schemaDiff.diff()
    sqlite = new SqliteSchemaGenerator(diff, newSchema)
    sqlite.tableSchema = 'org_1'
    # sqlite.tablePrefix = 'account_1_'
    sql = sqlite.generate()
    dumpScript(sql)

    sql.should.eql ''
