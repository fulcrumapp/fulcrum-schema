import Column from './column';

export default class Table {
  constructor(id, name, type) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.columns = [];
  }

  addColumn(opts, system) {
    if (opts.id == null) {
      opts.id = opts.name;
    }

    if (opts.name == null) {
      opts.name = opts.id;
    }

    if (opts.dataName == null) {
      opts.dataName = opts.name;
    }

    if (opts.allowNull == null) {
      opts.allowNull = true;
    }

    if (opts.system == null) {
      opts.system = !!system;
    }

    const hasParameters = opts.id && opts.name && opts.type && opts.dataName;

    if (!hasParameters) {
      throw new Error('must provide id, name, type and dataName parameters');
    }

    const column = new Column(opts.id, opts.name, opts.type, opts.dataName, opts.allowNull, opts.system);

    this.columns.push(column);

    return this;
  }
}
