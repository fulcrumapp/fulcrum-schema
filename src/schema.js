import { clone } from 'lodash';
import Utils from './utils';
import sqldiff from 'sqldiff';
import { format } from 'util';
import DataElements from './data-elements';

const { Table, View } = sqldiff;

const SIMPLE_TYPES = [
  'pk',
  'text',
  'string',
  'date',
  'time',
  'timestamp',
  'double',
  'integer',
  'boolean'
];

export default class Schema {
  constructor(form, columns, options) {
    this.prefix = 'f';
    this.form = form;
    this.columns = columns;
    this.options = options || {};
    this.elements = Utils.flattenElements(this.form.elements, false);
    this.schemaElements = DataElements.find(this.elements);
    this.buildSchema();

    columns.calculatedFieldDateFormat = columns.calculatedFieldDateFormat === 'date' ? 'date' : 'double';
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

    this.buildIndexes();
  }

  alias(part, escapePart = true) {
    if (part) {
      const partName = escapePart ? this.escapeDataName(part) : part;

      return this.escapeSlashes(this.form.name) + '/' + this.escapeSlashes(partName);
    }
    return this.escapeSlashes(this.form.name);
  }

  escapeDataName(dataName) {
    // if a data name starts with an underscore, add an additional underscore to prevent
    // collisions with future system-defined columns. e.g. `_symbol` becomes `__symbol`
    // because at some point we might add a system column named `symbol` which needs the
    // `_symbol` name.
    if (dataName && dataName[0] === '_') {
      return '_' + dataName;
    }

    return dataName || 'no_data_name';
  }

  escapeSlashes(name) {
    return name.replace(/\\/g, '\\\\').replace(/\//g, '\\/');
  }

  buildFormTable() {
    const table = new Table(format('form_%s', this.form.row_id),
      null,
      { type: 'form', alias: this.alias(), form_id: this.form.id });

    for (const column of this.columns.systemFormTableColumns) {
      const formColumn = clone(column);

      formColumn.system = true;
      formColumn.type = this.maybeComplexType(formColumn.type);

      table.addColumn(formColumn);
    }

    if (this.options.onAddFormTable) {
      this.options.onAddFormTable({ table, form: this.form, schema: this });
    }

    return table;
  }

  buildValuesTable() {
    const table = new Table(format('form_%s_values', this.form.row_id),
      null,
      { type: 'values', alias: this.alias('values'), form_id: this.form.id });

    for (const column of this.columns.systemValuesTableColumns) {
      const valueColumn = clone(column);

      valueColumn.system = true;
      valueColumn.type = this.maybeComplexType(valueColumn.type);

      table.addColumn(valueColumn);
    }

    return table;
  }

  buildRepeatableTable(parentTable, element) {
    const table = new Table(this.formTable.id + '_' + element.key,
      null,
      { type: 'repeatable', parent: parentTable, element: element, alias: this.alias(element.data_name), form_id: this.form.id });

    for (const column of this.columns.systemRepeatableTableColumns) {
      const attrs = clone(column);

      attrs.id = element.key + '_' + column.name;
      attrs.system = true;
      attrs.type = this.maybeComplexType(attrs.type);

      table.addColumn(attrs);
    }

    if (this.options.onAddRepeatableTable) {
      this.options.onAddRepeatableTable({ table, parentTable, element, form: this.form, schema: this });
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

    if (!this.columns.systemFormViewColumns) {
      return;
    }

    for (const table of this.tables) {
      const view = new View(table.name + '_view', null, table);

      this.buildViewForTable(table, view);

      this.views.push(view);

      if (table.type === 'form') {
        const fullView = new View(table.name + '_view_full', null, table, { variant: 'full', alias: this.alias('_full', false) });

        this.buildViewForTable(table, fullView);

        this.views.push(fullView);
      } else if (table.type === 'repeatable') {
        const fullView = new View(table.name + '_view_full', null, table, {
          variant: 'full',
          alias: this.alias(table.element.data_name) + '/_full'
        });

        this.buildViewForTable(table, fullView);

        this.views.push(fullView);
      }
    }
  }

  buildViewForTable(table, view) {
    const columnNames = {};

    for (const column of table.columns) {
      const alias = this.viewColumnName(view, table, column);

      if (alias == null) {
        continue;
      }

      if (!columnNames[alias]) {
        if (column.type === 'boolean') {
          const projection = `${column.name} IS NOT NULL AND ${column.name} = 't' AS ${Utils.escapeIdentifier(alias)}`;
          view.addColumn({ column: column, alias: alias, raw: projection });
        } else {
          view.addColumn({ column: column, alias: alias });
        }

        columnNames[alias] = column;
      }
    }
  }

  buildIndexes() {
    for (const table of this.tables) {
      let indexDefinitions = [];

      if (table.type === 'form') {
        indexDefinitions = this.columns.systemFormTableIndexes;
      } else if (table.type === 'repeatable') {
        indexDefinitions = this.columns.systemRepeatableTableIndexes;
      } else if (table.type === 'values') {
        indexDefinitions = this.columns.systemValuesTableIndexes;
      }

      for (const index of indexDefinitions) {
        const indexDefinition = clone(index);

        const isComplex = indexDefinition.method === 'gist' || indexDefinition.method === 'gin';

        const skip = isComplex && this.columns.disableComplexTypes === true;

        if (!skip) {
          table.addIndex(indexDefinition);
        }
      }
    }
  }

  viewColumnName(view, table, column) {
    let name = null;

    if (column.system) {
      if (table.type === 'form') {
        if (view.variant === 'full') {
          name = this.columns.systemFormFullViewColumns[column.name];
        } else {
          name = this.columns.systemFormViewColumns[column.name];
        }
      } else if (table.type === 'repeatable') {
        if (view.variant === 'full') {
          name = this.columns.systemRepeatableFullViewColumns[column.name];
        } else {
          name = this.columns.systemRepeatableViewColumns[column.name];
        }
      } else if (table.type === 'values') {
        name = this.columns.systemValuesViewColumns[column.name];
      }

      if (name == null) {
        return null;
      }

      name = '_' + name;
    } else if (column.element) {
      name = this.escapeDataName(column.element.data_name) + (column.suffix || '');
    } else {
      name = column.name + (column.suffix || '');
    }

    if (name) {
      // dedupe any columns
      name = this.launderViewColumnName(view, column, name);
    }

    return name;
  }

  launderViewColumnName(view, column, name) {
    const views = this.viewColumns;

    views[view.name] = views[view.name] || {};

    let count = 1;

    const rawName = name.substring(0, 63).toLowerCase();
    let newName = rawName;

    while (views[view.name][newName]) {
      newName = rawName.substring(0, 63 - (count.toString().length)) + count;
      count++;
    }

    views[view.name][newName] = column;

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
      case 'AttachmentField':
      case 'SketchField':
        this.addMediaElement(elementTable, element);
        break;

      case 'SignatureField':
        this.addStringElement(elementTable, element);
        this.addTimestampElement(elementTable, element, 'timestamp');
        break;

      case 'BarcodeField':
        this.addStringElement(elementTable, element);
        break;

      case 'DateTimeField':
      case 'DateField':
        this.addDateElement(elementTable, element);
        break;

      case 'TimeField':
        this.addTimeElement(elementTable, element);
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
        this.addRecordLinkElement(elementTable, element);
        break;

      case 'CalculatedField':
        switch (element.display.style) {
          case 'date':
            if (this.columns.calculatedFieldDateFormat === 'date') {
              this.addDateElement(elementTable, element);
            } else {
              this.addDoubleElement(elementTable, element);
            }
            break;
          case 'number':
          case 'currency':
            this.addDoubleElement(elementTable, element);
            break;
          default:
            this.addStringElement(elementTable, element);
            break;
        }
        break;

      case 'CheckboxField':
        this.addBooleanElement(elementTable, element);
        break;

      case 'DynamicField':
        this.addArrayElement(elementTable, element, 'metadata');
        this.addArrayElement(elementTable, element, 'elements');
        this.addArrayElement(elementTable, element, 'values');
        break;

      case 'LocationField':
        this.addDoubleElement(elementTable, element, 'latitude');
        this.addDoubleElement(elementTable, element, 'longitude');
        this.addStringElement(elementTable, element, 'address');
        break;

      case 'ButtonField':
        break;

      default:
        console.log('Unhandled element type', element.type);
        break;
    }
  }

  addStringColumn(table, name, suffix) {
    if (suffix == null) {
      suffix = '';
    }
    return this.addColumn(table, name, 'string', suffix);
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

  addTimeElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }
    return this.addElement(table, element, 'time', suffix);
  }

  addTimestampElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }
    return this.addElement(table, element, 'timestamp', suffix);
  }

  addDoubleElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }
    return this.addElement(table, element, 'double', suffix);
  }

  addBooleanElement(table, element, suffix) {
    if (suffix == null) {
      suffix = '';
    }
    return this.addElement(table, element, 'boolean', suffix);
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

    const dataType = this.columns.disableArrays === true ? 'string' : 'array';

    return this.addElement(table, element, dataType, suffix);
  }

  addColumn(table, name, type, suffix) {
    let column = null;

    if (suffix == null) {
      suffix = '';
    }

    if (suffix) {
      suffix = '_' + suffix;
    }

    column = {
      id: name + suffix,
      type: this.maybeComplexType(type),
      element: null,
      suffix: suffix
    };

    table.addColumn(column);
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
      type: this.maybeComplexType(type),
      element: element,
      suffix: suffix
    };

    table.addColumn(column);
  }

  maybeComplexType(type) {
    const isComplex = SIMPLE_TYPES.indexOf(type) === -1;

    return isComplex && this.columns.disableComplexTypes === true ? 'string' : type;
  }

  addMediaElement(table, element) {
    this.addArrayElement(table, element);

    if (element.type !== 'AttachmentField') {
      if (this.columns.includeMediaCaptions !== false) {
        this.addArrayElement(table, element, 'captions');
      }

      if (this.columns.includeMediaURLs) {
        this.addArrayElement(table, element, 'urls');
      }

      if (this.columns.includeMediaViewURLs) {
        this.addStringElement(table, element, 'view_url');
      }
    }

    if (element.type === 'AttachmentField') {
      this.addArrayElement(table, element, 'names');
    }

    if (!this.columns.systemFormViewColumns) {
      return;
    }

    const value = element.key.replace(/'/g, "''");

    const clause = format('WHERE key = \'%s\'', value);

    const filter = {
      key: value
    };

    const alias = {
      PhotoField: '_photo_id',
      VideoField: '_video_id',
      AudioField: '_audio_id',
      AttachmentField: '_attachment_id',
      SketchField: '_sketch_id'
    }[element.type];

    if (alias) {
      const view = new View(this.formTable.id + '_' + element.key + '_view',
        null, this.valuesTable, { type: 'media', element: element, clause: clause, filter, alias: this.alias(element.data_name) });

      view.addColumn({ column: { name: 'record_resource_id', type: 'string' }, alias: 'record_id' });
      view.addColumn({ column: { name: 'parent_resource_id', type: 'string' }, alias: 'parent_id' });
      view.addColumn({ column: { name: 'text_value', type: 'string' }, alias: alias });

      this.views.push(view);
    }
  }

  addRecordLinkElement(parentTable, element) {
    this.addArrayElement(parentTable, element);

    if (!this.columns.systemFormViewColumns) {
      return;
    }

    const value = element.key.replace(/'/g, "''");

    const clause = format('WHERE key = \'%s\'', value);

    const view = new View(this.formTable.id + '_' + element.key + '_view',
      null, this.valuesTable, { type: 'link', element: element, clause: clause, alias: this.alias(element.data_name) });

    view.addColumn({ column: { name: 'record_resource_id', type: 'string' }, alias: 'source_record_id' });
    view.addColumn({ column: { name: 'parent_resource_id', type: 'string' }, alias: 'parent_id' });
    view.addColumn({ column: { name: 'text_value', type: 'string' }, alias: 'linked_record_id' });

    this.views.push(view);
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
