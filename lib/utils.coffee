_ = require('underscore')

repeatableValueElementsCache = {}
repeatableValueElementsByKeyCache = {}
repeatableValueElementsByDataNameCache = {}

class Utils
  @DATE_REGEX: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/

  @toArray = (arrayLike) ->
    Array::slice.call arrayLike, 0

  @flattenElements = (elements, recurseRepeatables=true, assignParent=false, parent=undefined) ->
    _.tap [], (flat) ->
      _.each elements, (element) ->
        element.parent = parent if assignParent

        flat.push(element)

        recurse = true
        recurse = false if not recurseRepeatables and element.type is 'Repeatable'

        if recurse and element.elements
          children = Utils.flattenElements(element.elements, recurseRepeatables, assignParent, element)

          Array.prototype.push.apply(flat, children)

  @nearestRepeatable: (element) ->
    iterator = element

    while iterator
      return iterator if iterator.type is 'Repeatable'

      iterator = iterator.parent

    null

  @valueForElement: (element, value) ->
    if Utils.isNumericElement(element)
      Utils.numberValue(value)
    else if Utils.isDateElement(element)
      Utils.dateValue(value)
    else
      value

  @isNumericElement: (element) ->
    element.numeric or element.display?.style is 'number' or element.display?.style is 'currency'

  @isDateElement: (element) ->
    element.type is 'DateTimeField' or element.type is 'DateField'

  @dateValue: (value) ->
    if value and value.length <= 10
      new Date("#{value.replace(/-/g, '/')} 00:00:00")
    else
      value

  @numberValue: (value) ->
    value ||= undefined

    if value? then Number(value) else undefined

  @repeatableValueElements: (repeatable) ->
    key = repeatable.key

    if repeatableValueElementsCache[key]
      cached =
        all: repeatableValueElementsCache[key]
        byKey: repeatableValueElementsByKeyCache[key]
        byDataName: repeatableValueElementsByDataNameCache[key]

      return cached

    elements = Utils.flattenElements(repeatable.elements, false)

    repeatableValueElementsCache[key] = all = elements
    repeatableValueElementsByKeyCache[key] = byKey = {}
    repeatableValueElementsByDataNameCache[key] = byDataName = {}

    for element in elements
      byKey[element.key] = element
      byDataName[element.data_name] = element

    { all: all, byKey: byKey, byDataName: byDataName }

  @repeatableValues: (repeatable, items, dataName) ->
    return null unless _.isArray(items)

    {byDataName} = Utils.repeatableValueElements(repeatable)

    element = byDataName[dataName]

    return null unless element

    values = _.map items, (item) ->
      Utils.valueForElement(element, item.form_values[element.key])

    values

  @formatMachineDate: (date) ->
    return null unless date? and not isNaN(date.getTime())
    "#{RIGHT('000' + date.getFullYear(), 4)}-#{RIGHT('0' + (date.getMonth() + 1), 2)}-#{RIGHT('0' + date.getDate(), 2)}"

module.exports = Utils
