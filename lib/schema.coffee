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

  buildSchema: ->
    @tables = []

    @formTable = new Table("form_#{@form.id}", "form_#{@form.id}")
    @formTable.addColumn('id', 'id', 'pk')
    @formTable.addColumn('record_id', 'record_id', 'integer')
    @formTable.addColumn('record_resource_id', 'record_resource_id', 'string')
    @formTable.addColumn('project_id', 'project_id', 'integer')
    @formTable.addColumn('assigned_to_id', 'assigned_to_id', 'integer')
    @formTable.addColumn('status', 'status', 'string')
    @formTable.addColumn('latitude', 'latitude', 'double')
    @formTable.addColumn('longitude', 'longitude', 'double')

    @valuesTable = new Table("form_#{@form.id}_values", "form_#{@form.id}_values")
    @valuesTable.addColumn('record_id', 'record_id', 'integer')
    @valuesTable.addColumn('parent_resource_id', 'parent_resource_id', 'string')
    @valuesTable.addColumn('key', 'key', 'string')
    @valuesTable.addColumn('text_value', 'text_value', 'string')
    @valuesTable.addColumn('number_value', 'number_value', 'double')

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
        @addRepeatableElement(elementTable, element)

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
    table.addColumn(@prefix + element.key + suffix, @prefix + element.key + suffix, type)

  addMediaElement: (table, element) ->
    @addStringElement(table, element)

  addRepeatableElement: (table, element) ->
    repeatableTable = new Table(table.id + '_' + element.key, table.name + '_' + element.key)
    repeatableTable.addColumn('id', 'id', 'pk')
    repeatableTable.addColumn(element.key + '_record_id', 'record_id', 'integer')
    repeatableTable.addColumn(element.key + '_record_resource_id', 'record_resource_id', 'string')
    repeatableTable.addColumn(element.key + '_resource_id', 'resource_id', 'string')
    repeatableTable.addColumn(element.key + '_parent_resource_id', 'parent_resource_id', 'string')
    repeatableTable.addColumn('latitude', 'latitude', 'double')
    repeatableTable.addColumn('longitude', 'longitude', 'double')

    @tables.push(repeatableTable)

    elements = Utils.flattenElements(element.elements, false)
    childElements = @elementsForSchema(elements)

    childElements.forEach (childElement) =>
      @processElement(childElement, repeatableTable)

buildSchema = (json) ->
  new Schema(json).buildSchema()

module.exports = buildSchema
