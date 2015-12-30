import _ from 'underscore';
import Utils from './utils';
import sqldiff from 'sqldiff';
import {format} from 'util';
import DataElements from './data-elements';

const {Table, View} = sqldiff;

export default class Schema {
  constructor(form, columns, options) {
    this.prefix = 'f';
    this.form = form;
    this.columns = columns;
    this.options = options || {};
    this.elements = Utils.flattenElements(this.form.elements, false);
    this.schemaElements = DataElements.find(this.elements);
    this.buildSchema();
  }

  buildSchema() {
    this.tables = [];
    this.views = [];

    this.formTable = this.buildFormTable();
    this.valuesTable = this.buildValuesTable();

    this.tables.push(this.formTable);
    this.tables.push(this.valuesTable);

    this.buildDataColumns();
    this.buildViews();
  }

  alias(part) {
    if (part) {
      return this.form.name + '/' + part;
    }
    return this.form.name;
  }

  buildFormTable() {
    const table = new Table(format('form_%s', this.form.row_id),
                            null,
                            {type: 'form', alias: this.alias(), form_id: this.form.id});

    for (const column of this.columns.systemFormTableColumns) {
      const formColumn = _.clone(column);

      formColumn.system = true;

      table.addColumn(formColumn);
    }

    return table;
  }

  buildValuesTable() {
    const table = new Table(format('form_%s_values', this.form.row_id),
                            null,
                            {type: 'values', alias: this.alias('values'), form_id: this.form.id});

    for (const column of this.columns.systemValuesTableColumns) {
      const valueColumn = _.clone(column);

      valueColumn.system = true;

      table.addColumn(valueColumn);
    }

    return table;
  }

  buildRepeatableTable(parentTable, element) {
    const table = new Table(this.formTable.id + '_' + element.key,
                            null,
                            {type: 'repeatable', parent: parentTable, alias: this.alias(element.data_name), form_id: this.form.id});

    for (const column of this.columns.systemRepeatableTableColumns) {
      const attrs = _.clone(column);

      attrs.id = element.key + '_' + column.name;
      attrs.system = true;

      table.addColumn(attrs);
    }

    return table;
  }

  buildDataColumns() {
    for (const element of this.schemaElements) {
      this.processElement(element, this.formTable);
    }
  }

  buildViews() {
    this.viewColumns = {};

    for (const table of this.tables) {
      const view = new View(table.name + '_view', null, table);

      const columnNames = {};

      for (const column of table.columns) {
        let alias = this.viewColumnName(table, column);

        if (alias == null) {
          continue;
        }

        if (!columnNames[alias]) {
          view.addColumn({column: column, alias: alias});
          columnNames[alias] = column;
        }
      }

      this.views.push(view);
    }
  }

  viewColumnName(table, column) {
    let name = null;

    if (column.system) {
      if (table.type === 'form') {
        name = this.columns.systemFormViewColumns[column.name];
      } else if (table.type === 'repeatable') {
        name = this.columns.systemRepeatableViewColumns[column.name];
      } else if (table.type === 'values') {
        name = this.columns.systemValuesViewColumns[column.name];
      }

      if (name == null) {
        return null;
      }

      name = '_' + name;
    } else if (column.element) {
      name = column.element.data_name + (column.suffix || '');
    }

    if (name) {
      // dedupe any columns
      name = this.launderViewColumnName(table, column, name);
    }

    return name;
  }

  launderViewColumnName(table, column, name) {
    const views = this.viewColumns;

    views[table.name] = views[table.name] || {};

    let count = 1;

    let rawName = name.substring(0, 63);
    let newName = rawName;

    while (views[table.name][newName]) {
      newName = rawName.substring(0, 63 - (count.toString().length)) + count;
      count++;
    }

    views[table.name][newName] = column;

    return newName;
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
        this.addRepeatableElement(elementTable, element);
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
      type: type,
      element: element,
      suffix: suffix
    };

    table.addColumn(column);
  }

  addMediaElement(table, element) {
    this.addArrayElement(table, element);

    if (this.columns.includeMediaCaptions !== false) {
      return this.addArrayElement(table, element, 'captions');
    }
  }

  addRepeatableElement(parentTable, element) {
    const childTable = this.buildRepeatableTable(parentTable, element);

    this.tables.push(childTable);

    const elements = Utils.flattenElements(element.elements, false);

    const childElements = DataElements.find(elements);

    for (const childElement of childElements) {
      this.processElement(childElement, childTable);
    }
  }
}
