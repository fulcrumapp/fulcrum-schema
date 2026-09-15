'use strict';

const { DIAGNOSTIC_LIMIT } = require('./limits');

const MAX_ELEMENTS = 1400;
const MAX_DEPTH = 100;
const MAX_POINTER_SEGMENT_LENGTH = 256;
const INVALID_POINTER_SEGMENT = 'invalid-segment';

function pointerPart(value) {
  let segment;
  if (typeof value === 'string') {
    segment = value;
  } else if (typeof value === 'number'
    && Number.isSafeInteger(value) && value >= 0) {
    segment = `${value}`;
  } else {
    return INVALID_POINTER_SEGMENT;
  }
  if (segment.length > MAX_POINTER_SEGMENT_LENGTH) {
    return INVALID_POINTER_SEGMENT;
  }
  const escaped = segment.replace(/~/g, '~0').replace(/\//g, '~1');
  return escaped.length <= MAX_POINTER_SEGMENT_LENGTH
    ? escaped : INVALID_POINTER_SEGMENT;
}

function appendPointer(path, value) {
  const base = typeof path === 'string' ? path : '';
  return `${base}/${pointerPart(value)}`;
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function indexForm(form) {
  const index = {
    elements: [],
    byKey: Object.create(null),
    byDataName: Object.create(null),
    scopes: Object.create(null),
    errors: [],
    cyclic: false,
    tooDeep: false,
    tooLarge: false,
    diagnosticOverflow: false,
    visited: 0
  };
  if (!isObject(form) || !Object.prototype.hasOwnProperty.call(form, 'elements')
    || !Array.isArray(form.elements)) return index;

  const stack = [{
    value: form.elements,
    path: '/elements',
    scope: [],
    depth: 0,
    index: 0
  }];
  const seen = new WeakSet();
  const seenArrays = new WeakSet();
  seenArrays.add(form.elements);
  while (stack.length) {
    const current = stack[stack.length - 1];
    if (current.depth > MAX_DEPTH) {
      index.tooDeep = true;
      addIndexError(index, {
        code: 'maximum-depth',
        path: current.path,
        message: 'form nesting exceeds the supported depth'
      });
      stack.pop();
      continue;
    }
    if (current.index >= current.value.length) {
      stack.pop();
      continue;
    }
    if (index.visited >= MAX_ELEMENTS) {
      index.tooLarge = true;
      break;
    }
    index.visited += 1;

    const elementIndex = current.index;
    current.index += 1;
    const element = current.value[elementIndex];
    const path = appendPointer(current.path, elementIndex);
    if (!isObject(element)) {
      addIndexError(index, {
        code: 'element-object', path, message: 'element must be an object'
      });
      continue;
    }
    if (seen.has(element)) {
      index.cyclic = true;
      addIndexError(index, {
        code: 'cyclic-elements',
        path,
        message: 'element graph must not contain cycles or repeated references'
      });
      continue;
    }
    seen.add(element);
    const childScope = (Object.prototype.hasOwnProperty.call(element, 'type')
      && element.type === 'Repeatable')
      ? current.scope.concat(path)
      : current.scope;
    const entry = {
      element,
      path,
      scope: current.scope,
      childScope,
      depth: current.depth,
      order: index.elements.length
    };
    index.elements.push(entry);
    if (Object.prototype.hasOwnProperty.call(element, 'key')
      && typeof element.key === 'string' && element.key.trim()) {
      if (index.byKey[element.key]) {
        addIndexError(index, {
          code: 'duplicate-key',
          path: `${path}/key`,
          message: 'element key must be globally unique'
        });
      } else {
        index.byKey[element.key] = entry;
      }
    }
    if (Object.prototype.hasOwnProperty.call(element, 'data_name')
      && typeof element.data_name === 'string' && element.data_name.trim()
      && (!Object.prototype.hasOwnProperty.call(element, 'type')
        || (element.type !== 'Section' && element.type !== 'Label'))) {
      const scopeKey = current.scope.join('/');
      if (!index.byDataName[scopeKey]) index.byDataName[scopeKey] = Object.create(null);
      const names = index.byDataName[scopeKey];
      if (names[element.data_name]) {
        addIndexError(index, {
          code: 'duplicate-data-name',
          path: `${path}/data_name`,
          message: 'data_name must be unique within its storage scope'
        });
      } else {
        names[element.data_name] = entry;
      }
    }
    if (Object.prototype.hasOwnProperty.call(element, 'elements')
      && Array.isArray(element.elements)) {
      if (seenArrays.has(element.elements)) {
        index.cyclic = true;
        addIndexError(index, {
          code: 'cyclic-elements',
          path: `${path}/elements`,
          message: 'element graph must not contain cycles or repeated references'
        });
      } else {
        seenArrays.add(element.elements);
        stack.push({
          value: element.elements,
          path: `${path}/elements`,
          scope: childScope,
          depth: current.depth + 1,
          index: 0
        });
      }
    }
  }
  return index;
}

function addIndexError(index, error) {
  if (index.errors.length < DIAGNOSTIC_LIMIT) {
    index.errors.push(error);
  } else {
    index.diagnosticOverflow = true;
  }
}

module.exports = {
  MAX_ELEMENTS,
  MAX_DEPTH,
  MAX_POINTER_SEGMENT_LENGTH,
  pointerPart,
  appendPointer,
  isObject,
  indexForm
};
