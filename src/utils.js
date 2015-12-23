export default class Utils {
  static flattenElements(elements, recurseRepeatables, assignParent, parent) {
    if (recurseRepeatables == null) {
      recurseRepeatables = true;
    }

    if (assignParent == null) {
      assignParent = false;
    }

    const flat = [];

    for (const element of elements) {
      if (assignParent) {
        element.parent = parent;
      }

      flat.push(element);

      let recurse = true;

      if (!recurseRepeatables && element.type === 'Repeatable') {
        recurse = false;
      }

      if (recurse && element.elements) {
        const children = Utils.flattenElements(element.elements, recurseRepeatables, assignParent, element);
        Array.prototype.push.apply(flat, children);
      }
    }

    return flat;
  }
}
