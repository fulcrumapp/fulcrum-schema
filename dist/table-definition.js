'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableDefinition = function () {
  function TableDefinition() {
    _classCallCheck(this, TableDefinition);

    this.columns = [];
    this.viewColumns = {};
  }

  _createClass(TableDefinition, [{
    key: 'column',
    value: function column(name, type, options) {
      this.columns.push(_extends({ name: name, type: type }, options));
    }
  }, {
    key: 'pk',
    value: function pk() {
      this.column('id', 'pk');
    }
  }, {
    key: 'integer',
    value: function integer(name, options) {
      this.column(name, 'integer', options);
    }
  }, {
    key: 'string',
    value: function string(name, options) {
      this.column(name, 'string', options);
    }
  }, {
    key: 'timestamp',
    value: function timestamp(name, options) {
      this.column(name, 'timestamp', options);
    }
  }, {
    key: 'boolean',
    value: function boolean(name, options) {
      this.column(name, 'boolean', options);
    }
  }, {
    key: 'double',
    value: function double(name, options) {
      this.column(name, 'double', options);
    }
  }, {
    key: 'text',
    value: function text(name, options) {
      this.column(name, 'text', options);
    }
  }, {
    key: 'array',
    value: function array(name, options) {
      this.column(name, 'array', options);
    }
  }, {
    key: 'fts',
    value: function fts(name, options) {
      this.column(name, 'fts', options);
    }
  }, {
    key: 'geometry',
    value: function geometry(name, options) {
      this.column(name, 'geometry', options);
    }
  }, {
    key: 'alias',
    value: function alias(source, to) {
      this.viewColumns[source] = to;
    }
  }, {
    key: 'define',
    value: function define() {
      return null;
    }
  }]);

  return TableDefinition;
}();

exports.default = TableDefinition;
//# sourceMappingURL=table-definition.js.map