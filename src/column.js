export default class Column {
  constructor(id, name, type, dataName, allowNull, system) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.dataName = dataName;
    this.allowNull = !!allowNull;
    this.system = !!system;
  }

  isEqualTo(column) {
    return this.id === column.id &&
           this.name === column.name &&
           this.type === column.type &&
           this.allowNull === column.allowNull;
  }
}
