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

  constructor: (@form, @options={}) ->
    @elements = Utils.flattenElements(@form.elements, false)
    @schemaElements = @elementsForSchema(@elements)

  generateTableName: (object) ->
    object.name or object.data_name

  @FORM_SYSTEM_COLUMNS: [
    { name: 'id',                 type: 'pk' }
    { name: 'record_id',          type: 'integer', null: false }
    { name: 'record_resource_id', type: 'string',  null: false }
    { name: 'project_id',         type: 'integer' }
    { name: 'assigned_to_id',     type: 'integer' }
    { name: 'status',             type: 'string' }
    { name: 'latitude',           type: 'double' }
    { name: 'longitude',          type: 'double' }
    { name: 'created_at',         type: 'timestamp', null: false }
    { name: 'updated_at',         type: 'timestamp', null: false }
  ]

  @FORM_SYSTEM_COLUMNS_FULL: [
    { name: 'version',             type: 'integer',   null: false }
    { name: 'created_by_id',       type: 'integer',   null: false }
    { name: 'updated_by_id',       type: 'integer',   null: false }
    { name: 'server_created_at',   type: 'timestamp', null: false }
    { name: 'server_updated_at',   type: 'timestamp', null: false }
    { name: 'record_index_text',   type: 'string' }
    { name: 'record_index',        type: 'fts' }
    { name: 'geometry',            type: 'geometry' }
    { name: 'altitude',            type: 'double' }
    { name: 'speed',               type: 'double' }
    { name: 'course',              type: 'double' }
    { name: 'horizontal_accuracy', type: 'double' }
    { name: 'vertical_accuracy',   type: 'double' }
    { name: 'form_values',         type: 'text' }
    { name: 'changeset_id',        type: 'integer' }
    { name: 'title',               type: 'string' }
  ]

  @FORM_VALUE_COLUMNS: [
    { name: 'id',                 type: 'pk' }
    { name: 'record_id',          type: 'integer', null: false }
    { name: 'parent_resource_id', type: 'string' }
    { name: 'key',                type: 'string',  null: false }
    { name: 'text_value',         type: 'string' }
    { name: 'number_value',       type: 'double' }
  ]

  # Mapping for system columns to the output view column names
  @FORM_VIEW_SYSTEM_COLUMNS:
    record_resource_id:  'id'
    project_id:          'project_id'
    assigned_to_id:      'assigned_to_id'
    status:              'status'
    latitude:            'latitude'
    longitude:           'longitude'
    created_at:          'created_at'
    updated_at:          'updated_at'
    version:             'version'
    created_by_id:       'created_by_id'
    updated_by_id:       'updated_by_id'
    server_created_at:   'server_created_at'
    server_updated_at:   'server_updated_at'
    record_index_text:   'record_index_text'
    record_index:        'record_index'
    geometry:            'geometry'
    altitude:            'altitude'
    speed:               'speed'
    course:              'course'
    horizontal_accuracy: 'horizontal_accuracy'
    vertical_accuracy:   'vertical_accuracy'
    form_values:         'form_values'
    changeset_id:        'changeset_id'
    title:               'title'

  # Mapping for system columns to the output view column names
  @REPEATABLE_VIEW_SYSTEM_COLUMNS:
    resource_id:         'id'
    record_resource_id:  'record_id'
    parent_resource_id:  'parent_id'
    latitude:            'latitude'
    longitude:           'longitude'
    created_at:          'created_at'
    updated_at:          'updated_at'
    version:             'version'
    created_by_id:       'created_by_id'
    updated_by_id:       'updated_by_id'
    server_created_at:   'server_created_at'
    server_updated_at:   'server_updated_at'
    record_index_text:   'record_index_text'
    record_index:        'record_index'
    geometry:            'geometry'
    altitude:            'altitude'
    speed:               'speed'
    course:              'course'
    horizontal_accuracy: 'horizontal_accuracy'
    vertical_accuracy:   'vertical_accuracy'
    form_values:         'form_values'
    changeset_id:        'changeset_id'
    title:               'title'

  @REPEATABLE_COLUMNS: [
    { name: 'id',                 type: 'pk' }
    { name: 'record_id',          type: 'integer', null: false }
    { name: 'record_resource_id', type: 'string',  null: false }
    { name: 'resource_id',        type: 'string',  null: false }
    { name: 'parent_resource_id', type: 'string' }
    { name: 'latitude',           type: 'double' }
    { name: 'longitude',          type: 'double' }
    { name: 'created_at',         type: 'timestamp', null: false }
    { name: 'updated_at',         type: 'timestamp', null: false }
  ]

  @REPEATABLE_COLUMNS_FULL: [
    { name: 'version',             type: 'integer',   null: false }
    { name: 'created_by_id',       type: 'integer',   null: false }
    { name: 'updated_by_id',       type: 'integer',   null: false }
    { name: 'server_created_at',   type: 'timestamp', null: false }
    { name: 'server_updated_at',   type: 'timestamp', null: false }
    { name: 'record_index_text',   type: 'string' }
    { name: 'record_index',        type: 'fts' }
    { name: 'geometry',            type: 'geometry' }
    { name: 'altitude',            type: 'double' }
    { name: 'speed',               type: 'double' }
    { name: 'course',              type: 'double' }
    { name: 'horizontal_accuracy', type: 'double' }
    { name: 'vertical_accuracy',   type: 'double' }
    { name: 'form_values',         type: 'text' }
    { name: 'changeset_id',        type: 'integer' }
    { name: 'title',               type: 'string' }
  ]

  buildSchema: ->
    @tables = []

    @formTable = new Table("form_#{@form.id}", "form_#{@form.id}", 'form')

    for column in Schema.FORM_SYSTEM_COLUMNS
      @formTable.addColumn(column, true)

    if @options.full
      for column in Schema.FORM_SYSTEM_COLUMNS_FULL
        @formTable.addColumn(column, true)

    @valuesTable = new Table("form_#{@form.id}_values", "form_#{@form.id}_values", 'values')

    for column in Schema.FORM_VALUE_COLUMNS
      @valuesTable.addColumn(column, true)

    @tables.push(@formTable)
    @tables.push(@valuesTable)

    @schemaElements.forEach (element) =>
      @processElement(element, @formTable)

    @

  elementsForSchema: (elements) ->
    _.select elements, @isDataElement

  isDataElement: (element) ->
    Schema.DATA_ELEMENTS.indexOf(element.type) >= 0

  systemColumnNameAlias: (table, column) ->
    return null unless column.system

    if table.type is 'form'
      alias = Schema.FORM_VIEW_SYSTEM_COLUMNS[column.dataName]

      return null unless alias?

      return '_' + alias
    else if table.type is 'repeatable'
      alias = Schema.REPEATABLE_VIEW_SYSTEM_COLUMNS[column.dataName]

      return null unless alias?

      return '_' + alias

    return null

  processElement: (element, elementTable) ->
    switch element.type
      when 'TextField'
        if element.numeric
          @addDoubleElement(elementTable, element)
        else
          @addStringElement(elementTable, element)

      when 'ChoiceField'
        if element.multiple
          @addArrayElement(elementTable, element)
        else
          @addStringElement(elementTable, element)

      when 'ClassificationField'
        @addArrayElement(elementTable, element)

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
        @addArrayElement(elementTable, element)

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

  addArrayElement: (table, element, suffix='') ->
    @addElement(table, element, 'array', suffix)

  addElement: (table, element, type, suffix='') ->
    suffix = '_' + suffix if suffix

    column =
      id: @prefix + element.key + suffix
      name: @prefix + element.key + suffix
      type: type
      dataName: element.data_name + suffix

    table.addColumn(column)

  addMediaElement: (table, element) ->
    @addArrayElement(table, element)
    if @options.mediaCaptions
      @addArrayElement(table, element, 'captions')

  addRepeatableElement: (element) ->
    repeatableTable = new Table(@formTable.id + '_' + element.key, @formTable.name + '_' + element.key, 'repeatable')

    for column in Schema.REPEATABLE_COLUMNS
      attrs = _.clone(column)
      attrs.id = element.key + '_' + column.name
      repeatableTable.addColumn(attrs, true)

    if @options.full
      for column in Schema.REPEATABLE_COLUMNS_FULL
        attrs = _.clone(column)
        attrs.id = element.key + '_' + column.name
        repeatableTable.addColumn(attrs, true)

    @tables.push(repeatableTable)

    elements = Utils.flattenElements(element.elements, false)
    childElements = @elementsForSchema(elements)

    childElements.forEach (childElement) =>
      @processElement(childElement, repeatableTable)

buildSchema = (json, options={}) ->
  new Schema(json, options).buildSchema()

module.exports = buildSchema
