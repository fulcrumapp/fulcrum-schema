'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DATA_ELEMENTS = ['TextField', 'ChoiceField', 'ClassificationField', 'YesNoField', 'PhotoField', 'VideoField', 'AudioField', 'SignatureField', 'BarcodeField', 'DateTimeField', 'TimeField', 'Repeatable', 'AddressField', 'HyperlinkField', 'CalculatedField', 'RecordLinkField', 'AttachmentField'];

var DataElements = function () {
  function DataElements() {
    _classCallCheck(this, DataElements);
  }

  _createClass(DataElements, null, [{
    key: 'isDataElement',
    value: function isDataElement(element) {
      return DATA_ELEMENTS.indexOf(element.type) >= 0;
    }
  }, {
    key: 'find',
    value: function find(elements) {
      return _underscore2.default.select(elements, DataElements.isDataElement);
    }
  }, {
    key: 'dataElements',
    get: function get() {
      return DATA_ELEMENTS;
    }
  }]);

  return DataElements;
}();

exports.default = DataElements;
//# sourceMappingURL=data-elements.js.map