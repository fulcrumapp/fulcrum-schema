'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DATA_ELEMENTS = ['TextField', 'ChoiceField', 'ClassificationField', 'YesNoField', 'PhotoField', 'VideoField', 'AudioField', 'SignatureField', 'BarcodeField', 'DateTimeField', 'TimeField', 'Repeatable', 'AddressField', 'HyperlinkField', 'CalculatedField', 'RecordLinkField'];

class DataElements {
  static get dataElements() {
    return DATA_ELEMENTS;
  }

  static isDataElement(element) {
    return DATA_ELEMENTS.indexOf(element.type) >= 0;
  }

  static find(elements) {
    return _underscore2.default.select(elements, DataElements.isDataElement);
  }
}

exports.default = DataElements;
exports.default = DataElements;
//# sourceMappingURL=data-elements.js.map