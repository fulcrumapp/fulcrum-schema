'use strict';

function hasOwn(value, key) {
  return value !== null && typeof value === 'object'
    && Object.prototype.hasOwnProperty.call(value, key);
}

function materialize(request) {
  const input = request && typeof request === 'object' ? request : {};
  const operation = hasOwn(input, 'operation') ? input.operation : undefined;
  const form = hasOwn(input, 'form') ? input.form : undefined;

  if (operation === 'create') {
    if (!hasOwn(input, 'form') || form === undefined) {
      return {
        operation,
        candidate: undefined,
        previous: undefined,
        errors: [{ code: 'missing-form', path: '/form', message: 'create validation requires a form object' }]
      };
    }
    return {
      operation,
      candidate: form,
      previous: undefined,
      errors: []
    };
  }

  if (operation !== 'update') {
    return {
      operation,
      candidate: undefined,
      previous: undefined,
      errors: [{ code: 'invalid-operation', path: '/operation', message: 'operation must be create or update' }]
    };
  }

  if (!hasOwn(input, 'previous_form') || input.previous_form === null
    || typeof input.previous_form !== 'object' || Array.isArray(input.previous_form)) {
    return {
      operation,
      candidate: undefined,
      previous: hasOwn(input, 'previous_form') ? input.previous_form : undefined,
      errors: [{
        code: 'missing-previous-form',
        path: '/previous_form',
        message: 'update validation requires a previous_form object'
      }]
    };
  }

  if (form === null || typeof form !== 'object' || Array.isArray(form)) {
    return {
      operation,
      candidate: undefined,
      previous: input.previous_form,
      errors: [{ code: 'invalid-form-patch', path: '/form', message: 'form patch must be an object' }]
    };
  }

  const candidate = {};
  const copyOwn = (source) => {
    Object.keys(source).forEach((key) => {
      Object.defineProperty(candidate, key, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: source[key]
      });
    });
  };
  copyOwn(input.previous_form);
  copyOwn(form);

  return {
    operation,
    candidate,
    previous: input.previous_form,
    errors: []
  };
}

module.exports = { hasOwn, materialize };
