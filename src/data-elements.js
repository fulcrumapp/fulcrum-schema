import { filter } from 'lodash';

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
  'RecordLinkField',
  'AttachmentField'
];

export default class DataElements {
  static get dataElements() {
    return DATA_ELEMENTS;
  }

  static isDataElement(element) {
    return DATA_ELEMENTS.indexOf(element.type) >= 0;
  }

  static find(elements) {
    return filter(elements, DataElements.isDataElement);
  }
}
