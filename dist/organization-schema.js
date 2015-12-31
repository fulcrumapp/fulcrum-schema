'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _sqldiff = require('sqldiff');

var _sqldiff2 = _interopRequireDefault(_sqldiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Table = _sqldiff2.default.Table;
var View = _sqldiff2.default.View;

var OrganizationSchema = (function () {
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
      this.views = [];

      this.buildTable('changesets', this.schema.systemChangesetsTable);
      this.buildTable('forms', this.schema.systemFormsTable);
      this.buildTable('choice_lists', this.schema.systemChoiceListsTable);
      this.buildTable('classification_sets', this.schema.systemClassificationSetsTable);
      this.buildTable('projects', this.schema.systemProjectsTable);
      this.buildTable('roles', this.schema.systemRolesTable);
      this.buildTable('memberships', this.schema.systemMembershipsTable);
      this.buildTable('photos', this.schema.systemPhotosTable);
      this.buildTable('videos', this.schema.systemVideosTable);
      this.buildTable('audio', this.schema.systemAudioTable);
      this.buildTable('signatures', this.schema.systemSignaturesTable);

      this.buildViews();
    }
  }, {
    key: 'buildTable',
    value: function buildTable(name, definition) {
      var table = new Table(name, null, { type: 'system', alias: name });

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = definition[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var column = _step.value;

          var systemColumn = _underscore2.default.clone(column);

          systemColumn.system = true;

          table.addColumn(systemColumn);
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

      this.tables.push(table);
    }
  }, {
    key: 'buildViews',
    value: function buildViews() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.tables[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var table = _step2.value;

          var view = new View(table.name + '_view', null, table);

          var columnNames = {};

          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = table.columns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var column = _step3.value;

              var alias = this.viewColumnName(table, column);

              if (alias == null) {
                continue;
              }

              if (!columnNames[alias]) {
                view.addColumn({ column: column, alias: alias });
                columnNames[alias] = column;
              }
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

          this.views.push(view);
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
    }
  }, {
    key: 'viewColumnName',
    value: function viewColumnName(table, column) {
      return this.schema.organizationViews[table.name][column.name];
    }
  }]);

  return OrganizationSchema;
})();

exports.default = OrganizationSchema;
//# sourceMappingURL=organization-schema.js.map