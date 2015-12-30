import _ from 'underscore';

const DATA_ELEMENTS = [
  'TextField',
  'ChoiceField',
  'ClassificationField',
  'YesNoField',
  'PhotoField',
  'VideoField',
  'AudioField',
  'SignatureField',
  'BarcodeField',
  'DateTimeField',
  'TimeField',
  'Repeatable',
  'AddressField',
  'HyperlinkField',
  'CalculatedField',
  'RecordLinkField'
];

export default class DataElements {
  static get dataElements() {
    return DATA_ELEMENTS;
  }

  static isDataElement(element) {
    return DATA_ELEMENTS.indexOf(element.type) >= 0;
  }

  static find(elements) {
    return _.select(elements, DataElements.isDataElement);
  }
}

export default DataElements;
