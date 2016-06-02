'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _sqldiff = require('sqldiff');

var _sqldiff2 = _interopRequireDefault(_sqldiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Table = _sqldiff2.default.Table;
var View = _sqldiff2.default.View;

var OrganizationSchema = function () {
  function OrganizationSchema(schema, options) {
    _classCallCheck(this, OrganizationSchema);

    this.schema = schema;
    this.options = options || {};
    this.buildSchema();
  }

  _createClass(OrganizationSchema, [{
    key: 'buildSchema',
    value: function buildSchema() {
      this.tables = [];
      this.tableDefinitions = {};
      this.views = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.schema[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var table = _step.value;

          var ModelClass = table;

          var definition = new ModelClass();

          definition.defineTable();
          definition.defineView();
          definition.defineIndexes();

          this.tableDefinitions[definition.name] = definition;

          this.buildTable(definition);
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

      this.buildViews();
    }
  }, {
    key: 'buildTable',
    value: function buildTable(tableDefinition) {
      var table = new Table(tableDefinition.name, null, { type: 'system', alias: tableDefinition.name });

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = tableDefinition.columns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var column = _step2.value;

          var systemColumn = _underscore2.default.clone(column);

          systemColumn.system = true;

          table.addColumn(systemColumn);
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

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = tableDefinition.indexes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var indexDefinition = _step3.value;

          table.addIndex(indexDefinition);
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

      this.tables.push(table);
    }
  }, {
    key: 'buildViews',
    value: function buildViews() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.tables[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var table = _step4.value;

          var view = new View(table.name + '_view', null, table);

          var columnNames = {};

          var definition = this.tableDefinitions[table.name];

          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = table.columns[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var column = _step5.value;

              var alias = definition.viewColumns[column.name];

              if (alias == null) {
                // console.log('Skipping ' + table.name + '.' + column.name + ' in view.');
                continue;
              }

              if (!columnNames[alias]) {
                view.addColumn({ column: column, alias: alias });
                columnNames[alias] = column;
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

          if (view.columns.length) {
            this.views.push(view);
          }
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
  }]);

  return OrganizationSchema;
}();

exports.default = OrganizationSchema;
//# sourceMappingURL=organization-schema.js.map