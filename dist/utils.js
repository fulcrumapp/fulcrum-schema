"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var Utils = /*#__PURE__*/function () {
  function Utils() {}
  Utils.tableName = function tableName(schema, prefix, quote, table) {
    return Utils.escapedSchema(schema, quote) + Utils.escape((prefix || '') + table, quote);
  };
  Utils.escapeIdentifier = function escapeIdentifier(identifier) {
    if (identifier == null || identifier.length === 0) {
      return '';
    }
    var needsQuotes = /[^_A-Z0-9]/i.test(identifier) || /^[0-9]/.test(identifier);
    if (needsQuotes) {
      return '"' + identifier.replace(/"/g, '""') + '"';
    }
    return identifier;
  };
  Utils.escapedSchema = function escapedSchema(schema, quote) {
    if (schema == null || schema.length === 0) {
      return '';
    }
    return Utils.escape(schema, quote) + '.';
  };
  Utils.escape = function escape(identifier, quote) {
    if (identifier == null || identifier.length === 0) {
      return '';
    }
    quote = quote || '"';
    var escaped = identifier.replace(new RegExp(quote, 'g'), quote + quote);
    return quote + escaped + quote;
  };
  Utils.flattenElements = function flattenElements(elements, recurseRepeatables, assignParent, parent) {
    if (recurseRepeatables == null) {
      recurseRepeatables = true;
    }
    if (assignParent == null) {
      assignParent = false;
    }
    var flat = [];
    for (var _iterator = _createForOfIteratorHelperLoose(elements), _step; !(_step = _iterator()).done;) {
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
    return flat;
  };
  return Utils;
}();
exports["default"] = Utils;
//# sourceMappingURL=utils.js.map