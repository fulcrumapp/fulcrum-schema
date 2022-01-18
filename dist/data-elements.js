"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DATA_ELEMENTS = ['TextField', 'ChoiceField', 'ClassificationField', 'YesNoField', 'PhotoField', 'VideoField', 'AudioField', 'SignatureField', 'BarcodeField', 'DateTimeField', 'TimeField', 'Repeatable', 'AddressField', 'HyperlinkField', 'CalculatedField', 'RecordLinkField', 'AttachmentField', 'CheckboxField', 'DynamicField'];

var DataElements = /*#__PURE__*/function () {
  function DataElements() {}

  DataElements.isDataElement = function isDataElement(element) {
    return DATA_ELEMENTS.indexOf(element.type) >= 0;
  };

  DataElements.find = function find(elements) {
    return (0, _lodash.filter)(elements, DataElements.isDataElement);
  };

  _createClass(DataElements, null, [{
    key: "dataElements",
    get: function get() {
      return DATA_ELEMENTS;
    }
  }]);

  return DataElements;
}();

exports["default"] = DataElements;
//# sourceMappingURL=data-elements.js.map