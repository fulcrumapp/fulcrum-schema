'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'tableName',
    value: function tableName(schema, prefix, quote, table) {
      return Utils.escapedSchema(schema, quote) + Utils.escape((prefix || '') + table, quote);
    }
  }, {
    key: 'escapedSchema',
    value: function escapedSchema(schema, quote) {
      if (schema == null || schema.length === 0) {
        return '';
      }

      return Utils.escape(schema, quote) + '.';
    }
  }, {
    key: 'escape',
    value: function escape(identifier, quote) {
      if (identifier == null || identifier.length === 0) {
        return '';
      }

      quote = quote || '"';

      var escaped = identifier.replace(new RegExp(quote, 'g'), quote + quote);

      return quote + escaped + quote;
    }
  }, {
    key: 'flattenElements',
    value: function flattenElements(elements, recurseRepeatables, assignParent, parent) {
      if (recurseRepeatables == null) {
        recurseRepeatables = true;
      }

      if (assignParent == null) {
        assignParent = false;
      }

      var flat = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;

          if (assignParent) {
            element.parent = parent;
          }

          flat.push(element);

          var recurse = true;

          if (!recurseRepeatables && element.type === 'Repeatable') {
            recurse = false;
          }

          if (recurse && element.elements) {
            var children = Utils.flattenElements(element.elements, recurseRepeatables, assignParent, element);
            Array.prototype.push.apply(flat, children);
          }
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

      return flat;
    }
  }]);

  return Utils;
}();

exports.default = Utils;
//# sourceMappingURL=utils.js.map