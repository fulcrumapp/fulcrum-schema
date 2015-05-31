_ = require 'underscore'
Utils = require './utils'
Table = require './table'

class Schema
  @DATA_ELEMENTS = [
    'TextField'
    'ChoiceField'
    'ClassificationField'
    'YesNoField'
    'PhotoField'
    'VideoField'
    'AudioField'
    'SignatureField'
    'BarcodeField'
    'DateTimeField'
    'TimeField'
    'Repeatable'
    'AddressField'
    'HyperlinkField'
    'CalculatedField'
    'RecordLinkField'
  ]

  prefix: 'f'

  constructor: (@form) ->
    @elements = Utils.flattenElements(@form.elements, false)
    @schemaElements = @elementsForSchema(@elements)

  generateTableName: (object) ->
    object.name or object.data_name

  @FORM_SYSTEM_COLUMNS: [
    { name: 'id',                 type: 'pk' }
    { name: 'record_id',          type: 'integer' }
    { name: 'record_resource_id', type: 'string' }
    { name: 'project_id',         type: 'integer' }
    { name: 'assigned_to_id',     type: 'integer' }
    { name: 'status',             type: 'string' }
    { name: 'latitude',           type: 'double' }
    { name: 'longitude',          type: 'double' }
    { name: 'created_at',         type: 'date' }
    { name: 'updated_at',         type: 'date' }
  ]

  @FORM_VALUE_COLUMNS: [
    { name: 'record_id',          type: 'integer' }
    { name: 'parent_resource_id', type: 'string' }
    { name: 'key',                type: 'string' }
    { name: 'text_value',         type: 'string' }
    { name: 'number_value',       type: 'double' }
  ]

  buildSchema: ->
    @tables = []

    @formTable = new Table("form_#{@form.id}", "form_#{@form.id}", 'form')

    for column in Schema.FORM_SYSTEM_COLUMNS
      @formTable.addColumn(column)

    @valuesTable = new Table("form_#{@form.id}_values", "form_#{@form.id}_values", 'values')

    for column in Schema.FORM_VALUE_COLUMNS
      @valuesTable.addColumn(column)


    @tables.push(@formTable)
    @tables.push(@valuesTable)

    @schemaElements.forEach (element) =>
      @processElement(element, @formTable)

    @

  elementsForSchema: (elements) ->
    _.select elements, @isDataElement

  isDataElement: (element) ->
    Schema.DATA_ELEMENTS.indexOf(element.type) >= 0

  processElement: (element, elementTable) ->
    switch element.type
      when 'TextField'
        if element.numeric
          @addDoubleElement(elementTable, element)
        else
          @addStringElement(elementTable, element)

      when 'ChoiceField'
        @addStringElement(elementTable, element)

      when 'ClassificationField'
        @addStringElement(elementTable, element)

      when 'YesNoField'
        @addStringElement(elementTable, element)

      when 'PhotoField', 'VideoField', 'AudioField'
        @addMediaElement(elementTable, element)

      when 'SignatureField'
        @addStringElement(elementTable, element)
        @addDateElement(elementTable, element, 'timestamp')

      when 'BarcodeField'
        @addStringElement(elementTable, element)

      when 'DateTimeField', 'DateField'
        @addDateElement(elementTable, element)

      when 'TimeField'
        @addDoubleElement(elementTable, element)

      when 'Repeatable'
        @addRepeatableElement(element)

      when 'AddressField'
        @addStringElement(elementTable, element)                     # Full Address
        @addStringElement(elementTable, element, 'sub_thoroughfare') # 4261
        @addStringElement(elementTable, element, 'thoroughfare')     # 55th Ave N
        @addStringElement(elementTable, element, 'suite')            # Apt 2
        @addStringElement(elementTable, element, 'locality')         # St Petersburg
        @addStringElement(elementTable, element, 'admin_area')       # FL
        @addStringElement(elementTable, element, 'postal_code')      # 33714
        @addStringElement(elementTable, element, 'sub_admin_area')   # Pinellas County
        @addStringElement(elementTable, element, 'country')          # US

      when 'HyperlinkField'
        @addStringElement(elementTable, element)

      when 'RecordLinkField'
        @addStringElement(elementTable, element)

      when 'CalculatedField'
        switch element.display.style
          when 'number', 'date', 'currency'
            @addDoubleElement(elementTable, element)
          else
            @addStringElement(elementTable, element)

  addStringElement: (table, element, suffix='') ->
    @addElement(table, element, 'string', suffix)

  addDateElement: (table, element, suffix='') ->
    @addElement(table, element, 'date', suffix)

  addDoubleElement: (table, element, suffix='') ->
    @addElement(table, element, 'double', suffix)

  addIntegerElement: (table, element, suffix='') ->
    @addElement(table, element, 'integer', suffix)

  addElement: (table, element, type, suffix='') ->
    suffix = '_' + suffix if suffix

    column =
      id: @prefix + element.key + suffix
      name: @prefix + element.key + suffix
      type: type
      dataName: element.data_name + suffix

    table.addColumn(column)

  addMediaElement: (table, element) ->
    @addStringElement(table, element)

  addRepeatableElement: (element) ->
    repeatableTable = new Table(@formTable.id + '_' + element.key, @formTable.name + '_' + element.key, 'repeatable')
    repeatableTable.addColumn(name: 'id', type: 'pk')
    repeatableTable.addColumn(id: element.key + '_record_id', name: 'record_id', type: 'integer')
    repeatableTable.addColumn(id: element.key + '_record_resource_id', name: 'record_resource_id', type: 'string')
    repeatableTable.addColumn(id: element.key + '_resource_id', name: 'resource_id', type: 'string')
    repeatableTable.addColumn(id: element.key + '_parent_resource_id', name: 'parent_resource_id', type: 'string')
    repeatableTable.addColumn(name: 'latitude', type: 'double')
    repeatableTable.addColumn(name: 'longitude', type: 'double')
    repeatableTable.addColumn(name: 'created_at', type: 'date')
    repeatableTable.addColumn(name: 'updated_at', type: 'date')

    @tables.push(repeatableTable)

    elements = Utils.flattenElements(element.elements, false)
    childElements = @elementsForSchema(elements)

    childElements.forEach (childElement) =>
      @processElement(childElement, repeatableTable)

buildSchema = (json) ->
  new Schema(json).buildSchema()

module.exports = buildSchema
