import _ from 'underscore';
import Utils from './utils';
import Table from './table';
import FulcrumColumns from './fulcrum-columns';

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

export default class Schema {
  constructor(form, options) {
    this.prefix = 'f';
    this.form = form;
    this.options = options != null ? options : {};
    this.elements = Utils.flattenElements(this.form.elements, false);
    this.schemaElements = this.elementsForSchema(this.elements);
  }

  generateTableName(object) {
    return object.name || object.data_name;
  }

  buildSchema() {
    this.tables = [];

    this.formTable = new Table('form_' + this.form.id, 'form_' + this.form.id, 'form');

    for (const column of FulcrumColumns.FORM_SYSTEM_COLUMNS) {
      this.formTable.addColumn(column, true);
    }

    if (this.options.full) {
      for (const column of FulcrumColumns.FORM_SYSTEM_COLUMNS_FULL) {
        this.formTable.addColumn(column, true);
      }
    }

    this.valuesTable = new Table('form_' + this.form.id + '_values', 'form_' + this.form.id + '_values', 'values');

    for (const column of FulcrumColumns.FORM_VALUE_COLUMNS) {
      this.valuesTable.addColumn(column, true);
    }

    this.tables.push(this.formTable);
    this.tables.push(this.valuesTable);

    for (const element of this.schemaElements) {
      this.processElement(element, this.formTable);
    }

    return this;
  }

  elementsForSchema(elements) {
    return _.select(elements, this.isDataElement);
  }

  isDataElement(element) {
    return DATA_ELEMENTS.indexOf(element.type) >= 0;
  }

  systemColumnNameAlias(table, column) {
    let alias = null;

    if (!column.system) {
      return null;
    }

    if (table.type === 'form') {
      alias = FulcrumColumns.FORM_VIEW_SYSTEM_COLUMNS[column.dataName];

      if (alias == null) {
        return null;
      }

      return '_' + alias;
    } else if (table.type === 'repeatable') {
      alias = FulcrumColumns.REPEATABLE_VIEW_SYSTEM_COLUMNS[column.dataName];

      if (alias == null) {
        return null;
      }

      return '_' + alias;
    }

    return null;
  }

  processElement(element, elementTable) {
    switch (element.type) {
      case 'TextField':
        if (element.numeric) {
          this.addDoubleElement(elementTable, element);
        } else {
          this.addStringElement(elementTable, element);
        }
        break;

      case 'ChoiceField':
        if (element.multiple) {
          this.addArrayElement(elementTable, element);
        } else {
          this.addStringElement(elementTable, element);
        }
        break;

      case 'ClassificationField':
        this.addArrayElement(elementTable, element);
        break;

      case 'YesNoField':
        this.addStringElement(elementTable, element);
        break;

      case 'PhotoField':
      case 'VideoField':
      case 'AudioField':
        this.addMediaElement(elementTable, element);
        break;

      case 'SignatureField':
        this.addStringElement(elementTable, element);
        this.addDateElement(elementTable, element, 'timestamp');
        break;

      case 'BarcodeField':
        this.addStringElement(elementTable, element);
        break;

      case 'DateTimeField':
      case 'DateField':
        this.addDateElement(elementTable, element);
        break;

      case 'TimeField':
        this.addDoubleElement(elementTable, element);
        break;

      case 'Repeatable':
        this.addRepeatableElement(element);
        break;

      case 'AddressField':
        this.addStringElement(elementTable, element);
        this.addStringElement(elementTable, element, 'sub_thoroughfare');
        this.addStringElement(elementTable, element, 'thoroughfare');
        this.addStringElement(elementTable, element, 'suite');
        this.addStringElement(elementTable, element, 'locality');
        this.addStringElement(elementTable, element, 'admin_area');
        this.addStringElement(elementTable, element, 'postal_code');
        this.addStringElement(elementTable, element, 'sub_admin_area');
        this.addStringElement(elementTable, element, 'country');
        break;

      case 'HyperlinkField':
        this.addStringElement(elementTable, element);
        break;

      case 'RecordLinkField':
        this.addArrayElement(elementTable, element);
        break;

      case 'CalculatedField':
        switch (element.display.style) {
          case 'number':
          case 'date':
          case 'currency':
            this.addDoubleElement(elementTable, element);
            break;
          default:
            this.addStringElement(elementTable, element);
            break;
        }
        break;

      default:
        console.log('Unhandled element type', element.type);
        break;
    }
  }

  addStringElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }
    return this.addElement(table, element, 'string', suffix);
  }

  addDateElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }
    return this.addElement(table, element, 'date', suffix);
  }

  addDoubleElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }
    return this.addElement(table, element, 'double', suffix);
  }

  addIntegerElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }
    return this.addElement(table, element, 'integer', suffix);
  }

  addArrayElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }
    return this.addElement(table, element, 'array', suffix);
  }

  addElement(table, element, type, suffix) {
    let column = null;

    if (suffix == null) {
      suffix = '';
    }

    if (suffix) {
      suffix = '_' + suffix;
    }

    column = {
      id: this.prefix + element.key + suffix,
      name: this.prefix + element.key + suffix,
      type: type,
      dataName: element.data_name + suffix
    };

    return table.addColumn(column);
  }

  addMediaElement(table, element) {
    this.addArrayElement(table, element);

    if (this.options.mediaCaptions) {
      return this.addArrayElement(table, element, 'captions');
    }
  }

  addRepeatableElement(element) {
    const repeatableTable = new Table(this.formTable.id + '_' + element.key,
                                      this.formTable.name + '_' + element.key, 'repeatable');

    for (const column of FulcrumColumns.REPEATABLE_COLUMNS) {
      const attrs = _.clone(column);
      attrs.id = element.key + '_' + column.name;
      repeatableTable.addColumn(attrs, true);
    }

    if (this.options.full) {
      for (const column of FulcrumColumns.REPEATABLE_COLUMNS_FULL) {
        const attrs = _.clone(column);
        attrs.id = element.key + '_' + column.name;
        repeatableTable.addColumn(attrs, true);
      }
    }

    this.tables.push(repeatableTable);

    const elements = Utils.flattenElements(element.elements, false);

    const childElements = this.elementsForSchema(elements);

    for (const childElement of childElements) {
      this.processElement(childElement, repeatableTable);
    }
  }
}

const buildSchema = function (json, options) {
  if (options == null) {
    options = {};
  }
  return new Schema(json, options).buildSchema();
};

export default buildSchema;
