'use strict';

const { hasOwn } = require('./materialize');
const { appendPointer, isObject } = require('./traversal');
const { DIAGNOSTIC_LIMIT } = require('./limits');

const ELEMENT_TYPES = [
  'AddressField', 'AttachmentField', 'AudioField', 'BarcodeField', 'ButtonField',
  'CalculatedField', 'CheckboxField', 'ChoiceField', 'ClassificationField',
  'DateTimeField', 'DynamicField', 'HyperlinkField', 'Label', 'LocationField',
  'PhotoField', 'RecordLinkField', 'Repeatable', 'Section', 'SignatureField',
  'SketchField', 'TextField', 'TimeField', 'VideoField', 'YesNoField'
];
const CONTAINERS = new Set(['Section', 'Repeatable']);
const GEOMETRIES = new Set([
  'Point', 'LineString', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon'
]);
const CONDITION_OPERATORS = new Set([
  'equal_to', 'not_equal_to', 'contains', 'starts_with', 'greater_than',
  'less_than', 'is_empty', 'is_not_empty'
]);
const CONDITION_TARGET_TYPE_BLACKLIST = new Set([
  'Repeatable', 'Section', 'PhotoField', 'VideoField', 'AudioField', 'Label',
  'AddressField', 'SignatureField', 'AttachmentField'
]);
const COMMON_CONDITION_OPERATORS = new Set([
  'equal_to', 'not_equal_to', 'is_empty', 'is_not_empty'
]);
const CONDITION_OPERATORS_BY_TYPE = {
  RecordLinkField: new Set(['is_empty', 'is_not_empty']),
  ChoiceField: COMMON_CONDITION_OPERATORS,
  ClassificationField: COMMON_CONDITION_OPERATORS,
  YesNoField: COMMON_CONDITION_OPERATORS,
  StatusField: COMMON_CONDITION_OPERATORS
};
const DEFAULT_CONDITION_OPERATORS = new Set([
  ...COMMON_CONDITION_OPERATORS, 'contains', 'starts_with', 'greater_than', 'less_than'
]);
const TEXT_FORMATS = new Set(['integer', 'decimal']);
const CALCULATED_DISPLAY_STYLES = new Set(['text', 'number', 'date', 'currency']);
const FIELD_LENGTH_TYPES = new Set([
  'TextField', 'PhotoField', 'VideoField', 'AudioField', 'AttachmentField'
]);
const PHOTO_FASTFILL_TARGET_TYPE_BLACKLIST = new Set([
  'Repeatable', 'Section', 'PhotoField', 'VideoField', 'AudioField', 'Label',
  'CalculatedField', 'SignatureField', 'AttachmentField', 'RecordLinkField'
]);
const BOOLEAN_FIELDS = new Set([
  'multiple', 'allow_other', 'numeric', 'neutral_enabled', 'enabled',
  'read_only', 'track_enabled', 'audio_enabled', 'allow_creating_records',
  'allow_existing_records'
]);

function own(value, key) {
  return hasOwn(value, key);
}

function nonblank(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function present(value) {
  return value !== null && value !== undefined
    && value !== false
    && (typeof value !== 'string' || value.trim().length > 0)
    && (!Array.isArray(value) || value.length > 0)
    && (Array.isArray(value) || typeof value !== 'object'
      || Object.keys(value).length > 0);
}

// Ruby conditionals treat every value other than nil and false as truthy,
// including empty/whitespace strings and zero.  Keep this separate from
// `present`, which models Rails' present? predicate for other rules.
function rubyTruthy(value) {
  return value !== null && value !== undefined && value !== false;
}

function add(diagnostics, code, path, message, fix) {
  setDiagnosticFlag(diagnostics, 'hasError');
  if (diagnostics.length >= DIAGNOSTIC_LIMIT) {
    setDiagnosticFlag(diagnostics, 'overflowed');
    return;
  }
  diagnostics.push({
    code,
    severity: 'error',
    path,
    message,
    ...(fix ? { fix } : {})
  });
}

function addWarning(diagnostics, code, path, message) {
  if (diagnostics.length >= DIAGNOSTIC_LIMIT) {
    setDiagnosticFlag(diagnostics, 'overflowed');
    return;
  }
  diagnostics.push({ code, severity: 'warning', path, message });
}

function setDiagnosticFlag(diagnostics, name) {
  if (!Object.prototype.hasOwnProperty.call(diagnostics, name)) {
    Object.defineProperty(diagnostics, name, {
      configurable: true,
      enumerable: name === 'overflowed',
      writable: true,
      value: false
    });
  }
  diagnostics[name] = true;
}

function checkRoot(form, diagnostics) {
  if (!isObject(form)) {
    add(diagnostics, 'form-object', '', 'form must be an object');
    return;
  }
  if (!own(form, 'name') || !nonblank(form.name)) {
    add(diagnostics, 'form-name', '/name', 'form name must be a nonblank string');
  }
  if (!own(form, 'elements') || !Array.isArray(form.elements)) {
    add(diagnostics, 'form-elements-array', '/elements', 'form elements must be an array');
  } else if (!form.elements.length) {
    add(diagnostics, 'form-elements-nonempty', '/elements', 'form elements must not be empty');
  }
  if (own(form, 'status') && present(form.status)
    && !['active', 'inactive'].includes(form.status)) {
    add(diagnostics, 'form-status', '/status', 'status must be active or inactive');
  }
  ['geometry', 'geometry_type', 'geometry_types'].forEach((key) => {
    if (own(form, key)) checkGeometry(form[key], `/${key}`, diagnostics);
  });
  ['auto_assign', 'hidden_on_dashboard', 'geometry_required', 'projects_enabled',
    'assignment_enabled'].forEach((key) => {
    if (own(form, key) && typeof form[key] !== 'boolean') {
      add(diagnostics, 'form-boolean', `/${key}`, `${key} must be boolean`);
    }
  });
  ['style_mapnik'].forEach((key) => {
    if (own(form, key) && form[key] !== null && typeof form[key] !== 'string') {
      add(diagnostics, 'style-mapnik-type', `/${key}`, 'style_mapnik must be a string or null');
    }
  });
  if (own(form, 'map_style') && form.map_style !== null
    && typeof form.map_style !== 'string') {
    add(diagnostics, 'map-style-type', '/map_style', 'map_style must be a string or null');
  }
  ['record_title_key'].forEach((key) => {
    if (own(form, key) && form[key] !== null && typeof form[key] !== 'string') {
      add(diagnostics, 'reference-type', `/${key}`, 'reference must be a string');
    }
  });
  if (own(form, 'title_field_keys') && form.title_field_keys !== null
    && !Array.isArray(form.title_field_keys)) {
    add(diagnostics, 'title-fields-array', '/title_field_keys', 'title_field_keys must be an array');
  }
  if (own(form, 'status_field')) checkStatusField(form.status_field, diagnostics);
  if (own(form, 'field_effects')) checkFieldEffects(form.field_effects, diagnostics);
}

function checkGeometry(value, path, diagnostics) {
  if (!Array.isArray(value)) {
    add(diagnostics, 'geometry-array', path, 'geometry must be an array');
    return;
  }
  value.forEach((item, index) => {
    if (typeof item !== 'string' || !GEOMETRIES.has(item)) {
      add(
        diagnostics,
        'geometry-value',
        appendPointer(path, index),
        'geometry contains an unsupported value'
      );
    }
  });
}

function checkStatusField(statusField, diagnostics) {
  if (statusField === undefined || statusField === null) return;
  if (!isObject(statusField)) {
    add(diagnostics, 'status-field-object', '/status_field', 'status_field must be an object');
    return;
  }
  if (Object.keys(statusField).length === 0
    || !own(statusField, 'enabled') || statusField.enabled !== true) return;
  if (!own(statusField, 'label') || !nonblank(statusField.label)) {
    add(diagnostics, 'status-field-label', '/status_field/label', 'enabled status_field requires a label');
  }
  if (!own(statusField, 'data_name') || !nonblank(statusField.data_name)) {
    add(diagnostics, 'status-field-data-name', '/status_field/data_name', 'enabled status_field requires a data_name');
  }
  if (!own(statusField, 'choices') || !Array.isArray(statusField.choices)
    || !statusField.choices.length) {
    add(diagnostics, 'status-field-choices', '/status_field/choices', 'enabled status_field requires choices');
  } else {
    statusField.choices.forEach((choice, index) => {
      const path = appendPointer('/status_field/choices', index);
      if (!isObject(choice) || !own(choice, 'label') || !nonblank(choice.label)) {
        add(diagnostics, 'status-choice-shape', path, 'status choices require a label');
      }
      if (isObject(choice) && own(choice, 'color')
        && (typeof choice.color !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(choice.color))) {
        add(diagnostics, 'status-choice-color', `${path}/color`, 'status choice color must be a six-digit hex color');
      }
    });
  }
  if (!own(statusField, 'default_value') || !present(statusField.default_value)) {
    add(diagnostics, 'status-default', '/status_field/default_value', 'enabled status_field requires a default_value');
  }
  if (own(statusField, 'default_value') && Array.isArray(statusField.choices)
    && present(statusField.default_value)
    && !statusField.choices.some((choice) => isObject(choice)
      && ((own(choice, 'value') && present(choice.value) ? choice.value : choice.label)
        === statusField.default_value))) {
    add(diagnostics, 'status-default', '/status_field/default_value', 'status default must resolve to a status choice');
  }
}

function checkElements(index, diagnostics, options = {}) {
  const requireCommonBooleans = options.requireCommonBooleans !== false;
  index.elements.forEach((entry) => {
    const { element, path } = entry;
    const type = own(element, 'type') ? element.type : undefined;
    if (!own(element, 'key') || typeof element.key !== 'string' || !element.key.trim()) {
      add(diagnostics, 'element-key', `${path}/key`, 'element key must be a nonblank string');
    }
    if (!own(element, 'label') || !nonblank(element.label)) {
      add(diagnostics, 'element-label', `${path}/label`, 'element label must be a nonblank string');
    }
    if (!own(element, 'type') || typeof element.type !== 'string'
      || !ELEMENT_TYPES.includes(element.type)) {
      add(diagnostics, 'element-type', `${path}/type`, 'element type is not supported');
    }
    if (type !== 'Section' && type !== 'Label'
      && (!own(element, 'data_name') || !nonblank(element.data_name))) {
      add(diagnostics, 'element-data-name', `${path}/data_name`, 'data-producing elements require a nonblank data_name');
    }
    ['disabled', 'hidden', 'required'].forEach((key) => {
      if ((requireCommonBooleans && !own(element, key))
        || (own(element, key) && typeof element[key] !== 'boolean')) {
        add(diagnostics, 'element-boolean', `${path}/${key}`, `${key} must be an explicit boolean`);
      }
    });
    if (CONTAINERS.has(type)) {
      if (!own(element, 'elements') || !Array.isArray(element.elements)) {
        add(diagnostics, 'container-elements-array', `${path}/elements`, 'container elements must be an array');
      } else if (!element.elements.length) {
        add(diagnostics, 'container-elements-nonempty', `${path}/elements`, 'container elements must not be empty');
      }
    }
    checkTypeSpecific(element, path, diagnostics);
  });
  if (index.tooLarge) add(diagnostics, 'element-limit', '/elements', 'form exceeds the 1,400 flattened element limit');
  index.errors.forEach((error) => add(diagnostics, error.code, error.path, error.message));
}

function checkChoices(element, path, diagnostics) {
  // Rails selects the external choice-list branch with `if
  // element[:choice_list_id]`.  Do not use Rails `present?` here: blank
  // strings and zero are truthy in Ruby and therefore suppress inline-choice
  // validation.  Existence/access is contextual and intentionally unchecked.
  if (own(element, 'choice_list_id') && rubyTruthy(element.choice_list_id)) {
    return;
  }
  if (!own(element, 'choices') || !Array.isArray(element.choices)
    || !element.choices.length) {
    add(diagnostics, 'choices-array', `${path}/choices`, 'choices must be a nonempty array');
    return;
  }
  element.choices.forEach((choice, index) => {
    const choicePath = appendPointer(`${path}/choices`, index);
    if (!isObject(choice) || !own(choice, 'label') || !nonblank(choice.label)) {
      add(diagnostics, 'choice-shape', choicePath, 'each choice must be an object with a label');
    }
  });
}

function checkFieldLengths(element, path, diagnostics) {
  const supportsLengths = FIELD_LENGTH_TYPES.has(element.type)
    || (element.type === 'ChoiceField' && element.multiple === true);
  if (!supportsLengths) return;
  ['min_length', 'max_length'].forEach((key) => {
    // Rails uses `if length`, not `length.present?`: false and nil are
    // omitted, while blank/whitespace strings are truthy and fail the
    // integer check.  In particular, zero must still be validated.
    if (!own(element, key) || !rubyTruthy(element[key])) return;
    const minimum = key === 'min_length' ? 0 : 1;
    if (!Number.isInteger(element[key]) || element[key] < minimum) {
      add(diagnostics, 'field-length', `${path}/${key}`, `${key} is outside its supported integer range`);
    }
  });
  if (own(element, 'min_length') && own(element, 'max_length')
  && present(element.min_length) && present(element.max_length)
    && Number.isInteger(element.min_length) && Number.isInteger(element.max_length)
    && element.min_length > element.max_length) {
    add(diagnostics, 'length-order', path, 'minimum length must not exceed maximum length');
  }
}

function checkNumericBounds(element, path, diagnostics) {
  ['min', 'max'].forEach((key) => {
    if (!own(element, key) || element[key] === null) return;
    if (typeof element[key] !== 'number' || !Number.isFinite(element[key])) {
      add(diagnostics, 'numeric-bound', `${path}/${key}`, `${key} must be a finite number`);
    }
  });
}

function checkTypeSpecific(element, path, diagnostics) {
  const type = own(element, 'type') ? element.type : undefined;
  if (own(element, 'geometry')) checkGeometry(element.geometry, `${path}/geometry`, diagnostics);
  if (type === 'Repeatable') {
    ['repeatable_geometry', 'geometry_types'].forEach((key) => {
      if (own(element, key)) checkGeometry(element[key], `${path}/${key}`, diagnostics);
    });
  }
  if (type === 'ChoiceField') checkChoices(element, path, diagnostics);
  if (type === 'ClassificationField') {
    const hasClassificationId = (own(element, 'classification_id')
      && nonblank(element.classification_id))
      || (own(element, 'classification_set_id') && nonblank(element.classification_set_id))
      || (own(element, 'classification_set_schema') && isObject(element.classification_set_schema));
    if (!hasClassificationId) {
      add(diagnostics, 'classification-id', `${path}/classification_id`, 'classification_id must be a nonblank identifier');
    }
  }
  if (type === 'RecordLinkField') {
    if (!own(element, 'form_id') || !nonblank(element.form_id)) {
      add(diagnostics, 'record-link-id', `${path}/form_id`, 'record link requires a target identifier');
    }
    if ((!own(element, 'allow_creating_records') || element.allow_creating_records !== true)
      && (!own(element, 'allow_existing_records') || element.allow_existing_records !== true)) {
      add(diagnostics, 'record-link-flags', path, 'record link must allow creating or selecting an existing record');
    }
  }
  if (type === 'TextField') {
    if (own(element, 'numeric') && typeof element.numeric !== 'boolean') {
      add(diagnostics, 'numeric-flag', `${path}/numeric`, 'numeric must be boolean');
    }
    if (own(element, 'format') && element.format !== null
      && (!TEXT_FORMATS.has(element.format) || typeof element.format !== 'string')) {
      add(diagnostics, 'text-format', `${path}/format`, 'text format must be integer, decimal, or null');
    }
    if (own(element, 'pattern') && present(element.pattern)
      && typeof element.pattern !== 'string') {
      add(diagnostics, 'pattern-type', `${path}/pattern`, 'pattern must be a string or null');
    }
    if (element.numeric === true) checkNumericBounds(element, path, diagnostics);
  }
  if (type === 'HyperlinkField' && own(element, 'default_url')
    && present(element.default_url) && typeof element.default_url !== 'string') {
    add(diagnostics, 'hyperlink-default-url', `${path}/default_url`, 'default_url must be a string or null');
  }
  if (type === 'CalculatedField') {
    if (own(element, 'expression') && present(element.expression)
      && typeof element.expression !== 'string') {
      add(diagnostics, 'calculated-expression', `${path}/expression`, 'calculated expression must be a string or null');
    }
    if (!own(element, 'display') || !isObject(element.display)) {
      add(diagnostics, 'calculated-display', `${path}/display`, 'calculated display must be an object');
    } else {
      if (!own(element.display, 'style') || !CALCULATED_DISPLAY_STYLES.has(element.display.style)) {
        add(diagnostics, 'calculated-display', `${path}/display/style`, 'calculated display style is not supported');
      }
      if (own(element.display, 'currency') && element.display.currency !== null
        && typeof element.display.currency !== 'string') {
        add(diagnostics, 'calculated-currency', `${path}/display/currency`, 'calculated currency must be a string or null');
      }
      if (element.display.style === 'currency'
        && (!own(element.display, 'currency') || !nonblank(element.display.currency))) {
        add(diagnostics, 'calculated-currency', `${path}/display/currency`, 'currency display requires a currency code');
      }
    }
  }
  if (type === 'YesNoField') {
    if (own(element, 'neutral_enabled') && typeof element.neutral_enabled !== 'boolean') {
      add(diagnostics, 'yes-no-neutral', `${path}/neutral_enabled`, 'neutral_enabled must be boolean');
    }
    ['positive', 'negative'].forEach((key) => {
      if (!own(element, key) || (!isObject(element[key]) || !own(element[key], 'label')
        || !nonblank(element[key].label) || !own(element[key], 'value')
        || !present(element[key].value) || !scalar(element[key].value))) {
        add(diagnostics, 'yes-no-choice', `${path}/${key}`, 'yes/no choices require label and value');
      }
    });
    if (own(element, 'neutral_enabled') && element.neutral_enabled === true
      && (!own(element, 'neutral')
      || !isObject(element.neutral) || !own(element.neutral, 'label')
      || !nonblank(element.neutral.label) || !own(element.neutral, 'value')
      || !present(element.neutral.value) || !scalar(element.neutral.value))) {
      add(diagnostics, 'yes-no-neutral-choice', `${path}/neutral`, 'enabled neutral choice requires label and value');
    }
    if (own(element, 'default_value') && present(element.default_value)
      && !['positive', 'negative', 'neutral'].some((key) => own(element, key)
        && isObject(element[key])
        && own(element[key], 'value') && present(element[key].value)
        && element[key].value === element.default_value)) {
      add(diagnostics, 'yes-no-default', `${path}/default_value`, 'yes/no default must resolve to a choice');
    }
  }
  if (type === 'DateTimeField' || type === 'TimeField') {
    if (own(element, 'default_value') && element.default_value !== null
      && element.default_value !== '' && element.default_value !== 'now') {
      add(diagnostics, 'date-time-default', `${path}/default_value`, 'date/time default must be blank or now');
    }
  }
  if (type === 'SketchField' && own(element, 'backgrounds')
    && element.backgrounds !== null && !Array.isArray(element.backgrounds)) {
    add(diagnostics, 'sketch-backgrounds', `${path}/backgrounds`, 'sketch backgrounds must be an array');
  }
  if (own(element, 'ai_prompt')) {
    if (typeof element.ai_prompt !== 'string') {
      add(
        diagnostics,
        'ai-prompt-type',
        `${path}/ai_prompt`,
        'ai_prompt must be a string'
      );
    } else {
      const promptLimit = type === 'PhotoField' ? 10000 : 150;
      if (element.ai_prompt.length > promptLimit) {
        add(diagnostics, 'ai-prompt-length', `${path}/ai_prompt`, `ai_prompt must not exceed ${promptLimit} characters`);
      }
    }
  }
  BOOLEAN_FIELDS.forEach((key) => {
    if (own(element, key) && typeof element[key] !== 'boolean') {
      add(diagnostics, 'boolean-type', `${path}/${key}`, `${key} must be boolean`);
    }
  });
  checkFieldLengths(element, path, diagnostics);
}

function resolveReferences(form, index, diagnostics) {
  const keyEntry = (key) => (typeof key === 'string' ? index.byKey[key] : undefined);
  if (own(form, 'record_title_key') && form.record_title_key !== null
    && form.record_title_key !== '' && !keyEntry(form.record_title_key)) {
    add(diagnostics, 'record-title-reference', '/record_title_key', 'record_title_key does not resolve to an element');
  }
  if (own(form, 'title_field_keys') && Array.isArray(form.title_field_keys)) {
    if (!form.title_field_keys.every((key) => typeof key === 'string')) {
      add(diagnostics, 'title-fields-string', '/title_field_keys', 'title_field_keys must contain only strings');
    } else {
      form.title_field_keys.forEach((key, i) => {
        if (!keyEntry(key)) {
        add(
          diagnostics,
          'title-field-reference',
          appendPointer('/title_field_keys', i),
          'title field key does not resolve'
        );
        }
      });
    }
  }
  index.elements.forEach((entry) => {
    const element = entry.element;
    const type = own(element, 'type') ? element.type : undefined;
    if (type === 'Repeatable') {
      const titleKey = own(element, 'title_field_key') ? element.title_field_key : undefined;
      const target = keyEntry(titleKey);
      if (titleKey !== undefined && titleKey !== null && titleKey !== ''
        && (!target || !isRepeatableTitleTarget(target, entry))) {
        add(diagnostics, 'repeatable-title-reference', `${entry.path}/title_field_key`, 'repeatable title key must resolve within its section-flattened elements');
      }
    }
    ['visible_conditions', 'required_conditions'].forEach((property) => {
      if (!own(element, property) || element[property] === null
        || element[property] === undefined) return;
      if (!Array.isArray(element[property])) {
        add(diagnostics, 'conditions-array', `${entry.path}/${property}`, 'conditions must be an array');
        return;
      }
      const typeProperty = `${property}_type`;
      if (own(element, typeProperty) && element[typeProperty] !== null
        && !['any', 'all'].includes(element[typeProperty])) {
        add(diagnostics, 'conditions-type', `${entry.path}/${typeProperty}`, 'condition type must be any or all');
      }
      const behaviorProperty = `${property}_behavior`;
      if (own(element, behaviorProperty) && element[behaviorProperty] !== null
        && !['clear', 'preserve'].includes(element[behaviorProperty])) {
        add(diagnostics, 'conditions-behavior', `${entry.path}/${behaviorProperty}`, 'condition behavior must be clear or preserve');
      }
      element[property].forEach((condition, i) => checkCondition(
        condition, appendPointer(`${entry.path}/${property}`, i), entry, index, diagnostics
      ));
    });
    checkPhotoFastFill(entry, index, diagnostics);
  });
}

function isRepeatableTitleTarget(candidate, container) {
  return candidate
    && candidate.path.indexOf(`${container.path}/elements/`) === 0
    && candidate.scope.join('/') === container.childScope.join('/');
}

function checkCondition(condition, path, source, index, diagnostics) {
  if (!isObject(condition)) {
    add(diagnostics, 'condition-object', path, 'condition must be an object');
    return;
  }
  if (!own(condition, 'field_key') || condition.field_key === null
    || condition.field_key === false) {
    add(diagnostics, 'condition-field-key', `${path}/field_key`, 'condition field_key is required');
    return;
  }
  const key = condition.field_key;
  if (key === '@status') return checkConditionOperator(condition, path, 'StatusField', diagnostics);
  const target = typeof key === 'string' ? index.byKey[key] : undefined;
  if (!target) {
    add(diagnostics, 'condition-reference', `${path}/field_key`, 'condition target does not resolve');
    return;
  }
  const sourceScope = source.scope;
  const targetScope = target.scope;
  const allowed = targetScope.every((part, i) => sourceScope[i] === part);
  if (!allowed || target.element.key === source.element.key) {
    add(diagnostics, 'condition-scope', path, 'condition target must be the current or an ancestor-scope field');
    return;
  }
  checkConditionOperator(condition, path, own(target.element, 'type')
    ? target.element.type : undefined, diagnostics);
}

function checkConditionOperator(condition, path, targetType, diagnostics) {
  const operator = condition.operator;
  const allowedOperators = CONDITION_OPERATORS_BY_TYPE[targetType]
    || DEFAULT_CONDITION_OPERATORS;
  if (CONDITION_TARGET_TYPE_BLACKLIST.has(targetType)) {
    add(diagnostics, 'condition-target-type', `${path}/field_key`, 'condition target type is not supported');
    return;
  }
  if (!own(condition, 'operator') || typeof operator !== 'string'
    || !CONDITION_OPERATORS.has(operator)
    || !allowedOperators.has(operator)) {
    add(diagnostics, 'condition-operator', `${path}/operator`, 'condition operator is not supported');
  }
  if (['is_empty', 'is_not_empty'].includes(operator)
    && own(condition, 'value') && present(condition.value)) {
    add(diagnostics, 'condition-value', `${path}/value`, 'empty-check operators require an empty value');
  }
}

function scalar(value) {
  return value !== null && ['string', 'number', 'boolean'].includes(typeof value)
    && (typeof value !== 'number' || Number.isFinite(value));
}

function checkPhotoFastFill(entry, index, diagnostics) {
  const { element, path } = entry;
  if (element.type !== 'PhotoField' || !nonblank(element.ai_prompt)
    || element.ai_prompt.length > 10000) return;
  const targets = element.ai_prompt.split('\n').map((target) => target.trim());
  while (targets.length && targets[targets.length - 1] === '') targets.pop();
  const names = index.byDataName[entry.scope.join('/')] || Object.create(null);
  const invalid = targets.some((dataName) => {
    const target = names[dataName];
    return !target || target.element.key === element.key
      || PHOTO_FASTFILL_TARGET_TYPE_BLACKLIST.has(target.element.type);
  });
  if (invalid) {
    add(
      diagnostics,
      'fast-fill-reference',
      `${path}/ai_prompt`,
      'each FastFill data name must resolve to a supported field in the same repeatable scope'
    );
  }
}

function checkFieldEffects(value, diagnostics) {
  const path = '/field_effects';
  if (!present(value) || (isObject(value) && Object.keys(value).length === 0)) return;
  if (!isObject(value)) {
    add(diagnostics, 'field-effects-object', path, 'field_effects must be an object');
    return;
  }
  if (!own(value, 'effects') || !Array.isArray(value.effects)) {
    add(diagnostics, 'field-effects-array', `${path}/effects`, 'field_effects.effects must be an array');
    return;
  }
  value.effects.forEach((effect, index) => {
    const effectPath = appendPointer(`${path}/effects`, index);
    if (!isObject(effect)) {
      add(diagnostics, 'field-effect-shape', effectPath, 'field effect must be an object');
      return;
    }
    if (!own(effect, 'event') || !isObject(effect.event)
      || !own(effect.event, 'name') || !nonblank(effect.event.name)) {
      add(diagnostics, 'field-effect-event', `${effectPath}/event`, 'field effect event requires a name');
    } else if (own(effect.event, 'field') && !nonblank(effect.event.field)) {
      add(diagnostics, 'field-effect-event-field', `${effectPath}/event/field`, 'field effect event field must be nonblank');
    }
    if (!own(effect, 'conditions') || !Array.isArray(effect.conditions)) {
      add(diagnostics, 'field-effect-conditions', `${effectPath}/conditions`, 'field effect conditions must be an array');
    } else {
      effect.conditions.forEach((condition, conditionIndex) => {
        if (!isObject(condition) || !nonblank(condition.field)
          || !nonblank(condition.operator)) {
          add(
            diagnostics,
            'field-effect-condition',
            appendPointer(`${effectPath}/conditions`, conditionIndex),
            'field effect conditions require field and operator'
          );
        }
      });
    }
    if (!own(effect, 'actions') || !Array.isArray(effect.actions)) {
      add(diagnostics, 'field-effect-actions', `${effectPath}/actions`, 'field effect actions must be an array');
    } else {
      effect.actions.forEach((action, actionIndex) => {
        if (!isObject(action) || !nonblank(action.type)) {
          add(
            diagnostics,
            'field-effect-action',
            appendPointer(`${effectPath}/actions`, actionIndex),
            'field effect actions require a type'
          );
        }
      });
    }
  });
}

module.exports = {
  ELEMENT_TYPES,
  checkRoot,
  checkElements,
  resolveReferences,
  add,
  addWarning
};
