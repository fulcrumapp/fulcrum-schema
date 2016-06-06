'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _sqldiff = require('sqldiff');

var _sqldiff2 = _interopRequireDefault(_sqldiff);

var _util = require('util');

var _dataElements = require('./data-elements');

var _dataElements2 = _interopRequireDefault(_dataElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Table = _sqldiff2.default.Table;
var View = _sqldiff2.default.View;

var Schema = function () {
  function Schema(form, columns, options) {
    _classCallCheck(this, Schema);

    this.prefix = 'f';
    this.form = form;
    this.columns = columns;
    this.options = options || {};
    this.elements = _utils2.default.flattenElements(this.form.elements, false);
    this.schemaElements = _dataElements2.default.find(this.elements);
    this.buildSchema();
  }

  _createClass(Schema, [{
    key: 'buildSchema',
    value: function buildSchema() {
      this.tables = [];
      this.views = [];

      this.formTable = this.buildFormTable();
      this.valuesTable = this.buildValuesTable();

      this.tables.push(this.formTable);
      this.tables.push(this.valuesTable);

      this.buildDataColumns();

      this.buildViews();

      this.buildIndexes();
    }
  }, {
    key: 'alias',
    value: function alias(part) {
      if (part) {
        return this.form.name + '/' + part;
      }
      return this.form.name;
    }
  }, {
    key: 'buildFormTable',
    value: function buildFormTable() {
      var table = new Table((0, _util.format)('form_%s', this.form.row_id), null, { type: 'form', alias: this.alias(), form_id: this.form.id });

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.columns.systemFormTableColumns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var column = _step.value;

          var formColumn = _underscore2.default.clone(column);

          formColumn.system = true;

          table.addColumn(formColumn);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return table;
    }
  }, {
    key: 'buildValuesTable',
    value: function buildValuesTable() {
      var table = new Table((0, _util.format)('form_%s_values', this.form.row_id), null, { type: 'values', alias: this.alias('values'), form_id: this.form.id });

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.columns.systemValuesTableColumns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var column = _step2.value;

          var valueColumn = _underscore2.default.clone(column);

          valueColumn.system = true;

          table.addColumn(valueColumn);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return table;
    }
  }, {
    key: 'buildRepeatableTable',
    value: function buildRepeatableTable(parentTable, element) {
      var table = new Table(this.formTable.id + '_' + element.key, null, { type: 'repeatable', parent: parentTable, element: element, alias: this.alias(element.data_name), form_id: this.form.id });

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.columns.systemRepeatableTableColumns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var column = _step3.value;

          var attrs = _underscore2.default.clone(column);

          attrs.id = element.key + '_' + column.name;
          attrs.system = true;

          table.addColumn(attrs);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return table;
    }
  }, {
    key: 'buildDataColumns',
    value: function buildDataColumns() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.schemaElements[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var element = _step4.value;

          this.processElement(element, this.formTable);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }, {
    key: 'buildViews',
    value: function buildViews() {
      this.viewColumns = {};

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.tables[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var table = _step5.value;

          var view = new View(table.name + '_view', null, table);

          this.buildViewForTable(table, view);

          this.views.push(view);

          if (table.type === 'form') {
            var fullView = new View(table.name + '_view_full', null, table, { variant: 'full', alias: this.alias('_full') });

            this.buildViewForTable(table, fullView);

            this.views.push(fullView);
          } else if (table.type === 'repeatable') {
            var _fullView = new View(table.name + '_view_full', null, table, { variant: 'full',
              alias: this.alias(table.element.data_name + '/_full') });

            this.buildViewForTable(table, _fullView);

            this.views.push(_fullView);
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  }, {
    key: 'buildViewForTable',
    value: function buildViewForTable(table, view) {
      var columnNames = {};

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = table.columns[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var column = _step6.value;

          var alias = this.viewColumnName(view, table, column);

          if (alias == null) {
            continue;
          }

          if (!columnNames[alias]) {
            view.addColumn({ column: column, alias: alias });
            columnNames[alias] = column;
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }
  }, {
    key: 'buildIndexes',
    value: function buildIndexes() {
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.tables[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var table = _step7.value;

          var indexDefinitions = [];

          if (table.type === 'form') {
            indexDefinitions = this.columns.systemFormTableIndexes;
          } else if (table.type === 'repeatable') {
            indexDefinitions = this.columns.systemRepeatableTableIndexes;
          } else if (table.type === 'values') {
            indexDefinitions = this.columns.systemValuesTableIndexes;
          }

          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = indexDefinitions[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var index = _step8.value;

              var indexDefinition = _underscore2.default.clone(index);

              table.addIndex(indexDefinition);
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8.return) {
                _iterator8.return();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }
    }
  }, {
    key: 'viewColumnName',
    value: function viewColumnName(view, table, column) {
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
        name = column.element.data_name + (column.suffix || '');
      }

      if (name) {
        // dedupe any columns
        name = this.launderViewColumnName(view, column, name);
      }

      return name;
    }
  }, {
    key: 'launderViewColumnName',
    value: function launderViewColumnName(view, column, name) {
      var views = this.viewColumns;

      views[view.name] = views[view.name] || {};

      var count = 1;

      var rawName = name.substring(0, 63);
      var newName = rawName;

      while (views[view.name][newName]) {
        newName = rawName.substring(0, 63 - count.toString().length) + count;
        count++;
      }

      views[view.name][newName] = column;

      return newName;
    }
  }, {
    key: 'processElement',
    value: function processElement(element, elementTable) {
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
            case 'number':
            case 'date':
            case 'currency':
              this.addDoubleElement(elementTable, element);
              break;
            default:
              this.addStringElement(elementTable, element);
              break;
          }
          break;

        default:
          console.log('Unhandled element type', element.type);
          break;
      }
    }
  }, {
    key: 'addStringElement',
    value: function addStringElement(table, element, suffix) {
      if (suffix == null) {
        suffix = '';
      }
      return this.addElement(table, element, 'string', suffix);
    }
  }, {
    key: 'addDateElement',
    value: function addDateElement(table, element, suffix) {
      if (suffix == null) {
        suffix = '';
      }
      return this.addElement(table, element, 'date', suffix);
    }
  }, {
    key: 'addTimeElement',
    value: function addTimeElement(table, element, suffix) {
      if (suffix == null) {
        suffix = '';
      }
      return this.addElement(table, element, 'time', suffix);
    }
  }, {
    key: 'addTimestampElement',
    value: function addTimestampElement(table, element, suffix) {
      if (suffix == null) {
        suffix = '';
      }
      return this.addElement(table, element, 'timestamp', suffix);
    }
  }, {
    key: 'addDoubleElement',
    value: function addDoubleElement(table, element, suffix) {
      if (suffix == null) {
        suffix = '';
      }
      return this.addElement(table, element, 'double', suffix);
    }
  }, {
    key: 'addIntegerElement',
    value: function addIntegerElement(table, element, suffix) {
      if (suffix == null) {
        suffix = '';
      }
      return this.addElement(table, element, 'integer', suffix);
    }
  }, {
    key: 'addArrayElement',
    value: function addArrayElement(table, element, suffix) {
      if (suffix == null) {
        suffix = '';
      }
      return this.addElement(table, element, 'array', suffix);
    }
  }, {
    key: 'addElement',
    value: function addElement(table, element, type, suffix) {
      var column = null;

      if (suffix == null) {
        suffix = '';
      }

      if (suffix) {
        suffix = '_' + suffix;
      }

      column = {
        id: this.prefix + element.key + suffix,
        type: type,
        element: element,
        suffix: suffix
      };

      table.addColumn(column);
    }
  }, {
    key: 'addMediaElement',
    value: function addMediaElement(table, element) {
      this.addArrayElement(table, element);

      if (this.columns.includeMediaCaptions !== false) {
        this.addArrayElement(table, element, 'captions');
      }

      var value = element.key.replace(/'/g, "''");

      var clause = (0, _util.format)('WHERE key = \'%s\'', value);

      var alias = {
        PhotoField: '_photo_id',
        VideoField: '_video_id',
        AudioField: '_audio_id'
      }[element.type];

      if (alias) {
        var view = new View(this.formTable.id + '_' + element.key + '_view', null, this.valuesTable, { type: 'media', clause: clause, alias: this.alias(element.data_name) });

        view.addColumn({ column: { name: 'record_resource_id', type: 'string' }, alias: '_record_id' });
        view.addColumn({ column: { name: 'parent_resource_id', type: 'string' }, alias: '_parent_id' });
        view.addColumn({ column: { name: 'text_value', type: 'string' }, alias: alias });

        this.views.push(view);
      }
    }
  }, {
    key: 'addRecordLinkElement',
    value: function addRecordLinkElement(parentTable, element) {
      this.addArrayElement(parentTable, element);

      var value = element.key.replace(/'/g, "''");

      var clause = (0, _util.format)('WHERE key = \'%s\'', value);

      var view = new View(this.formTable.id + '_' + element.key + '_view', null, this.valuesTable, { type: 'link', clause: clause, alias: this.alias(element.data_name) });

      view.addColumn({ column: { name: 'record_resource_id', type: 'string' }, alias: '_source_record_id' });
      view.addColumn({ column: { name: 'parent_resource_id', type: 'string' }, alias: '_parent_id' });
      view.addColumn({ column: { name: 'text_value', type: 'string' }, alias: '_linked_record_id' });

      this.views.push(view);
    }
  }, {
    key: 'addRepeatableElement',
    value: function addRepeatableElement(parentTable, element) {
      var childTable = this.buildRepeatableTable(parentTable, element);

      this.tables.push(childTable);

      var elements = _utils2.default.flattenElements(element.elements, false);

      var childElements = _dataElements2.default.find(elements);

      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = childElements[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var childElement = _step9.value;

          this.processElement(childElement, childTable);
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }
    }
  }]);

  return Schema;
}();

exports.default = Schema;
//# sourceMappingURL=schema.js.map