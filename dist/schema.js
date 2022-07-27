"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _utils = _interopRequireDefault(require("./utils"));

var _sqldiff = _interopRequireDefault(require("sqldiff"));

var _util = require("util");

var _dataElements = _interopRequireDefault(require("./data-elements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Table = _sqldiff["default"].Table,
    View = _sqldiff["default"].View;
var SIMPLE_TYPES = ['pk', 'text', 'string', 'date', 'time', 'timestamp', 'double', 'integer', 'boolean'];

var Schema = /*#__PURE__*/function () {
  function Schema(form, columns, options) {
    this.prefix = 'f';
    this.form = form;
    this.columns = columns;
    this.options = options || {};
    this.elements = _utils["default"].flattenElements(this.form.elements, false);
    this.schemaElements = _dataElements["default"].find(this.elements);
    this.buildSchema();
    columns.calculatedFieldDateFormat = columns.calculatedFieldDateFormat === 'date' ? 'date' : 'double';
  }

  var _proto = Schema.prototype;

  _proto.buildSchema = function buildSchema() {
    this.tables = [];
    this.views = [];
    this.formTable = this.buildFormTable();
    this.valuesTable = this.buildValuesTable();
    this.tables.push(this.formTable);
    this.tables.push(this.valuesTable);
    this.buildDataColumns();
    this.buildViews();
    this.buildIndexes();
  };

  _proto.alias = function alias(part, escapePart) {
    if (escapePart === void 0) {
      escapePart = true;
    }

    if (part) {
      var partName = escapePart ? this.escapeDataName(part) : part;
      return this.escapeSlashes(this.form.name) + '/' + this.escapeSlashes(partName);
    }

    return this.escapeSlashes(this.form.name);
  };

  _proto.escapeDataName = function escapeDataName(dataName) {
    // if a data name starts with an underscore, add an additional underscore to prevent
    // collisions with future system-defined columns. e.g. `_symbol` becomes `__symbol`
    // because at some point we might add a system column named `symbol` which needs the
    // `_symbol` name.
    if (dataName && dataName[0] === '_') {
      return '_' + dataName;
    }

    return dataName || 'no_data_name';
  };

  _proto.escapeSlashes = function escapeSlashes(name) {
    return name.replace(/\//g, '\\/');
  };

  _proto.buildFormTable = function buildFormTable() {
    var table = new Table((0, _util.format)('form_%s', this.form.row_id), null, {
      type: 'form',
      alias: this.alias(),
      form_id: this.form.id
    });

    for (var _iterator = _createForOfIteratorHelperLoose(this.columns.systemFormTableColumns), _step; !(_step = _iterator()).done;) {
      var column = _step.value;
      var formColumn = (0, _lodash.clone)(column);
      formColumn.system = true;
      formColumn.type = this.maybeComplexType(formColumn.type);
      table.addColumn(formColumn);
    }

    if (this.options.onAddFormTable) {
      this.options.onAddFormTable({
        table: table,
        form: this.form,
        schema: this
      });
    }

    return table;
  };

  _proto.buildValuesTable = function buildValuesTable() {
    var table = new Table((0, _util.format)('form_%s_values', this.form.row_id), null, {
      type: 'values',
      alias: this.alias('values'),
      form_id: this.form.id
    });

    for (var _iterator2 = _createForOfIteratorHelperLoose(this.columns.systemValuesTableColumns), _step2; !(_step2 = _iterator2()).done;) {
      var column = _step2.value;
      var valueColumn = (0, _lodash.clone)(column);
      valueColumn.system = true;
      valueColumn.type = this.maybeComplexType(valueColumn.type);
      table.addColumn(valueColumn);
    }

    return table;
  };

  _proto.buildRepeatableTable = function buildRepeatableTable(parentTable, element) {
    var table = new Table(this.formTable.id + '_' + element.key, null, {
      type: 'repeatable',
      parent: parentTable,
      element: element,
      alias: this.alias(element.data_name),
      form_id: this.form.id
    });

    for (var _iterator3 = _createForOfIteratorHelperLoose(this.columns.systemRepeatableTableColumns), _step3; !(_step3 = _iterator3()).done;) {
      var column = _step3.value;
      var attrs = (0, _lodash.clone)(column);
      attrs.id = element.key + '_' + column.name;
      attrs.system = true;
      attrs.type = this.maybeComplexType(attrs.type);
      table.addColumn(attrs);
    }

    if (this.options.onAddRepeatableTable) {
      this.options.onAddRepeatableTable({
        table: table,
        parentTable: parentTable,
        element: element,
        form: this.form,
        schema: this
      });
    }

    return table;
  };

  _proto.buildDataColumns = function buildDataColumns() {
    for (var _iterator4 = _createForOfIteratorHelperLoose(this.schemaElements), _step4; !(_step4 = _iterator4()).done;) {
      var element = _step4.value;
      this.processElement(element, this.formTable);
    }
  };

  _proto.buildViews = function buildViews() {
    this.viewColumns = {};

    if (!this.columns.systemFormViewColumns) {
      return;
    }

    for (var _iterator5 = _createForOfIteratorHelperLoose(this.tables), _step5; !(_step5 = _iterator5()).done;) {
      var table = _step5.value;
      var view = new View(table.name + '_view', null, table);
      this.buildViewForTable(table, view);
      this.views.push(view);

      if (table.type === 'form') {
        var fullView = new View(table.name + '_view_full', null, table, {
          variant: 'full',
          alias: this.alias('_full', false)
        });
        this.buildViewForTable(table, fullView);
        this.views.push(fullView);
      } else if (table.type === 'repeatable') {
        var _fullView = new View(table.name + '_view_full', null, table, {
          variant: 'full',
          alias: this.alias(table.element.data_name) + '/_full'
        });

        this.buildViewForTable(table, _fullView);
        this.views.push(_fullView);
      }
    }
  };

  _proto.buildViewForTable = function buildViewForTable(table, view) {
    var columnNames = {};

    for (var _iterator6 = _createForOfIteratorHelperLoose(table.columns), _step6; !(_step6 = _iterator6()).done;) {
      var column = _step6.value;
      var alias = this.viewColumnName(view, table, column);

      if (alias == null) {
        continue;
      }

      if (!columnNames[alias]) {
        if (column.type === 'boolean') {
          var projection = column.name + " IS NOT NULL AND " + column.name + " = 't' AS " + _utils["default"].escapeIdentifier(alias);

          view.addColumn({
            column: column,
            alias: alias,
            raw: projection
          });
        } else {
          view.addColumn({
            column: column,
            alias: alias
          });
        }

        columnNames[alias] = column;
      }
    }
  };

  _proto.buildIndexes = function buildIndexes() {
    for (var _iterator7 = _createForOfIteratorHelperLoose(this.tables), _step7; !(_step7 = _iterator7()).done;) {
      var table = _step7.value;
      var indexDefinitions = [];

      if (table.type === 'form') {
        indexDefinitions = this.columns.systemFormTableIndexes;
      } else if (table.type === 'repeatable') {
        indexDefinitions = this.columns.systemRepeatableTableIndexes;
      } else if (table.type === 'values') {
        indexDefinitions = this.columns.systemValuesTableIndexes;
      }

      for (var _iterator8 = _createForOfIteratorHelperLoose(indexDefinitions), _step8; !(_step8 = _iterator8()).done;) {
        var index = _step8.value;
        var indexDefinition = (0, _lodash.clone)(index);
        var isComplex = indexDefinition.method === 'gist' || indexDefinition.method === 'gin';
        var skip = isComplex && this.columns.disableComplexTypes === true;

        if (!skip) {
          table.addIndex(indexDefinition);
        }
      }
    }
  };

  _proto.viewColumnName = function viewColumnName(view, table, column) {
    var name = null;

    if (column.system) {
      if (table.type === 'form') {
        if (view.variant === 'full') {
          name = this.columns.systemFormFullViewColumns[column.name];
        } else {
          name = this.columns.systemFormViewColumns[column.name];
        }
      } else if (table.type === 'repeatable') {
        if (view.variant === 'full') {
          name = this.columns.systemRepeatableFullViewColumns[column.name];
        } else {
          name = this.columns.systemRepeatableViewColumns[column.name];
        }
      } else if (table.type === 'values') {
        name = this.columns.systemValuesViewColumns[column.name];
      }

      if (name == null) {
        return null;
      }

      name = '_' + name;
    } else if (column.element) {
      name = this.escapeDataName(column.element.data_name) + (column.suffix || '');
    } else {
      name = column.name + (column.suffix || '');
    }

    if (name) {
      // dedupe any columns
      name = this.launderViewColumnName(view, column, name);
    }

    return name;
  };

  _proto.launderViewColumnName = function launderViewColumnName(view, column, name) {
    var views = this.viewColumns;
    views[view.name] = views[view.name] || {};
    var count = 1;
    var rawName = name.substring(0, 63).toLowerCase();
    var newName = rawName;

    while (views[view.name][newName]) {
      newName = rawName.substring(0, 63 - count.toString().length) + count;
      count++;
    }

    views[view.name][newName] = column;
    return newName;
  };

  _proto.processElement = function processElement(element, elementTable) {
    switch (element.type) {
      case 'TextField':
        if (element.numeric) {
          this.addDoubleElement(elementTable, element);
        } else {
          this.addStringElement(elementTable, element);
        }

        break;

      case 'ChoiceField':
        if (element.multiple) {
          this.addArrayElement(elementTable, element);
        } else {
          this.addStringElement(elementTable, element);
        }

        break;

      case 'ClassificationField':
        this.addArrayElement(elementTable, element);
        break;

      case 'YesNoField':
        this.addStringElement(elementTable, element);
        break;

      case 'PhotoField':
      case 'VideoField':
      case 'AudioField':
      case 'AttachmentField':
        this.addMediaElement(elementTable, element);
        break;

      case 'SignatureField':
        this.addStringElement(elementTable, element);
        this.addTimestampElement(elementTable, element, 'timestamp');
        break;

      case 'BarcodeField':
        this.addStringElement(elementTable, element);
        break;

      case 'DateTimeField':
      case 'DateField':
        this.addDateElement(elementTable, element);
        break;

      case 'TimeField':
        this.addTimeElement(elementTable, element);
        break;

      case 'Repeatable':
        this.addRepeatableElement(elementTable, element);
        break;

      case 'AddressField':
        this.addStringElement(elementTable, element);
        this.addStringElement(elementTable, element, 'sub_thoroughfare');
        this.addStringElement(elementTable, element, 'thoroughfare');
        this.addStringElement(elementTable, element, 'suite');
        this.addStringElement(elementTable, element, 'locality');
        this.addStringElement(elementTable, element, 'admin_area');
        this.addStringElement(elementTable, element, 'postal_code');
        this.addStringElement(elementTable, element, 'sub_admin_area');
        this.addStringElement(elementTable, element, 'country');
        break;

      case 'HyperlinkField':
        this.addStringElement(elementTable, element);
        break;

      case 'RecordLinkField':
        this.addRecordLinkElement(elementTable, element);
        break;

      case 'CalculatedField':
        switch (element.display.style) {
          case 'date':
            if (this.columns.calculatedFieldDateFormat === 'date') {
              this.addDateElement(elementTable, element);
            } else {
              this.addDoubleElement(elementTable, element);
            }

            break;

          case 'number':
          case 'currency':
            this.addDoubleElement(elementTable, element);
            break;

          default:
            this.addStringElement(elementTable, element);
            break;
        }

        break;

      case 'CheckboxField':
        this.addBooleanElement(elementTable, element);
        break;

      case 'DynamicField':
        this.addArrayElement(elementTable, element, 'metadata');
        this.addArrayElement(elementTable, element, 'elements');
        this.addArrayElement(elementTable, element, 'values');
        break;

      case 'TaskLocationField':
        this.addIntegerElement(elementTable, element, 'latitude');
        this.addIntegerElement(elementTable, element, 'longitude');
        this.addStringElement(elementTable, element, 'address');
        break;

      default:
        console.log('Unhandled element type', element.type);
        break;
    }
  };

  _proto.addStringColumn = function addStringColumn(table, name, suffix) {
    if (suffix == null) {
      suffix = '';
    }

    return this.addColumn(table, name, 'string', suffix);
  };

  _proto.addStringElement = function addStringElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }

    return this.addElement(table, element, 'string', suffix);
  };

  _proto.addDateElement = function addDateElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }

    return this.addElement(table, element, 'date', suffix);
  };

  _proto.addTimeElement = function addTimeElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }

    return this.addElement(table, element, 'time', suffix);
  };

  _proto.addTimestampElement = function addTimestampElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }

    return this.addElement(table, element, 'timestamp', suffix);
  };

  _proto.addDoubleElement = function addDoubleElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }

    return this.addElement(table, element, 'double', suffix);
  };

  _proto.addBooleanElement = function addBooleanElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }

    return this.addElement(table, element, 'boolean', suffix);
  };

  _proto.addIntegerElement = function addIntegerElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }

    return this.addElement(table, element, 'integer', suffix);
  };

  _proto.addArrayElement = function addArrayElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }

    var dataType = this.columns.disableArrays === true ? 'string' : 'array';
    return this.addElement(table, element, dataType, suffix);
  };

  _proto.addColumn = function addColumn(table, name, type, suffix) {
    var column = null;

    if (suffix == null) {
      suffix = '';
    }

    if (suffix) {
      suffix = '_' + suffix;
    }

    column = {
      id: name + suffix,
      type: this.maybeComplexType(type),
      element: null,
      suffix: suffix
    };
    table.addColumn(column);
  };

  _proto.addElement = function addElement(table, element, type, suffix) {
    var column = null;

    if (suffix == null) {
      suffix = '';
    }

    if (suffix) {
      suffix = '_' + suffix;
    }

    column = {
      id: this.prefix + element.key + suffix,
      type: this.maybeComplexType(type),
      element: element,
      suffix: suffix
    };
    table.addColumn(column);
  };

  _proto.maybeComplexType = function maybeComplexType(type) {
    var isComplex = SIMPLE_TYPES.indexOf(type) === -1;
    return isComplex && this.columns.disableComplexTypes === true ? 'string' : type;
  };

  _proto.addMediaElement = function addMediaElement(table, element) {
    this.addArrayElement(table, element);

    if (element.type !== 'AttachmentField') {
      if (this.columns.includeMediaCaptions !== false) {
        this.addArrayElement(table, element, 'captions');
      }

      if (this.columns.includeMediaURLs) {
        this.addArrayElement(table, element, 'urls');
      }

      if (this.columns.includeMediaViewURLs) {
        this.addStringElement(table, element, 'view_url');
      }
    }

    if (element.type === 'AttachmentField') {
      this.addArrayElement(table, element, 'names');
    }

    if (!this.columns.systemFormViewColumns) {
      return;
    }

    var value = element.key.replace(/'/g, "''");
    var clause = (0, _util.format)('WHERE key = \'%s\'', value);
    var filter = {
      key: value
    };
    var alias = {
      PhotoField: '_photo_id',
      VideoField: '_video_id',
      AudioField: '_audio_id',
      AttachmentField: '_attachment_id'
    }[element.type];

    if (alias) {
      var view = new View(this.formTable.id + '_' + element.key + '_view', null, this.valuesTable, {
        type: 'media',
        element: element,
        clause: clause,
        filter: filter,
        alias: this.alias(element.data_name)
      });
      view.addColumn({
        column: {
          name: 'record_resource_id',
          type: 'string'
        },
        alias: 'record_id'
      });
      view.addColumn({
        column: {
          name: 'parent_resource_id',
          type: 'string'
        },
        alias: 'parent_id'
      });
      view.addColumn({
        column: {
          name: 'text_value',
          type: 'string'
        },
        alias: alias
      });
      this.views.push(view);
    }
  };

  _proto.addRecordLinkElement = function addRecordLinkElement(parentTable, element) {
    this.addArrayElement(parentTable, element);

    if (!this.columns.systemFormViewColumns) {
      return;
    }

    var value = element.key.replace(/'/g, "''");
    var clause = (0, _util.format)('WHERE key = \'%s\'', value);
    var view = new View(this.formTable.id + '_' + element.key + '_view', null, this.valuesTable, {
      type: 'link',
      element: element,
      clause: clause,
      alias: this.alias(element.data_name)
    });
    view.addColumn({
      column: {
        name: 'record_resource_id',
        type: 'string'
      },
      alias: 'source_record_id'
    });
    view.addColumn({
      column: {
        name: 'parent_resource_id',
        type: 'string'
      },
      alias: 'parent_id'
    });
    view.addColumn({
      column: {
        name: 'text_value',
        type: 'string'
      },
      alias: 'linked_record_id'
    });
    this.views.push(view);
  };

  _proto.addRepeatableElement = function addRepeatableElement(parentTable, element) {
    var childTable = this.buildRepeatableTable(parentTable, element);
    this.tables.push(childTable);

    var elements = _utils["default"].flattenElements(element.elements, false);

    var childElements = _dataElements["default"].find(elements);

    for (var _iterator9 = _createForOfIteratorHelperLoose(childElements), _step9; !(_step9 = _iterator9()).done;) {
      var childElement = _step9.value;
      this.processElement(childElement, childTable);
    }
  };

  return Schema;
}();

exports["default"] = Schema;
//# sourceMappingURL=schema.js.map