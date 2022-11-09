"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _lodash = require("lodash");
var _sqldiff = _interopRequireDefault(require("sqldiff"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var Table = _sqldiff["default"].Table,
  View = _sqldiff["default"].View;
var OrganizationSchema = /*#__PURE__*/function () {
  function OrganizationSchema(schema, options) {
    this.schema = schema;
    this.options = options || {};
    this.buildSchema();
  }
  var _proto = OrganizationSchema.prototype;
  _proto.buildSchema = function buildSchema() {
    this.tables = [];
    this.tableDefinitions = {};
    this.views = [];
    for (var _iterator = _createForOfIteratorHelperLoose(this.schema), _step; !(_step = _iterator()).done;) {
      var table = _step.value;
      var ModelClass = table;
      var definition = new ModelClass();
      definition.defineTable();
      definition.defineView();
      definition.defineIndexes();
      this.tableDefinitions[definition.name] = definition;
      this.buildTable(definition);
    }
    this.buildViews();
  };
  _proto.buildTable = function buildTable(tableDefinition) {
    var table = new Table(tableDefinition.name, null, {
      type: 'system',
      alias: tableDefinition.name
    });
    for (var _iterator2 = _createForOfIteratorHelperLoose(tableDefinition.columns), _step2; !(_step2 = _iterator2()).done;) {
      var column = _step2.value;
      var systemColumn = (0, _lodash.clone)(column);
      systemColumn.system = true;
      table.addColumn(systemColumn);
    }
    for (var _iterator3 = _createForOfIteratorHelperLoose(tableDefinition.indexes), _step3; !(_step3 = _iterator3()).done;) {
      var indexDefinition = _step3.value;
      table.addIndex(indexDefinition);
    }
    this.tables.push(table);
  };
  _proto.buildViews = function buildViews() {
    for (var _iterator4 = _createForOfIteratorHelperLoose(this.tables), _step4; !(_step4 = _iterator4()).done;) {
      var table = _step4.value;
      var alias = table.name.replace(/^query_/, '');
      var view = new View(alias + '_view', null, table, {
        alias: alias
      });
      var columnNames = {};
      var definition = this.tableDefinitions[table.name];
      for (var _iterator5 = _createForOfIteratorHelperLoose(table.columns), _step5; !(_step5 = _iterator5()).done;) {
        var column = _step5.value;
        var columnAlias = definition.viewColumns[column.name];
        if (columnAlias == null) {
          // console.log('Skipping ' + table.name + '.' + column.name + ' in view.');
          continue;
        }
        if (!columnNames[columnAlias]) {
          view.addColumn({
            column: column,
            alias: columnAlias
          });
          columnNames[columnAlias] = column;
        }
      }
      if (view.columns.length) {
        this.views.push(view);
      }
    }
  };
  return OrganizationSchema;
}();
exports["default"] = OrganizationSchema;
//# sourceMappingURL=organization-schema.js.map