const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { validate } = require('../src/validation/form-validator');
const { DIAGNOSTIC_LIMIT } = require('../src/validation/limits');
const { ELEMENT_TYPES } = require('../src/validation/rules');
const { makeResult, requestedChecks } = require('../src/validation/result');
const {
  MAX_POINTER_SEGMENT_LENGTH, appendPointer, pointerPart
} = require('../src/validation/traversal');

function freeze(value, seen = new WeakSet()) {
  if (value && typeof value === 'object' && !seen.has(value)) {
    seen.add(value);
    Object.keys(value).forEach((key) => freeze(value[key], seen));
    Object.freeze(value);
  }
  return value;
}

function field(overrides = {}) {
  return Object.assign({
    type: 'TextField',
    key: 'name',
    label: 'Name',
    data_name: 'name',
    disabled: false,
    hidden: false,
    required: false
  }, overrides);
}

function form(overrides = {}) {
  return Object.assign({
    name: 'Example',
    schema_version: 'v6',
    elements: [field()]
  }, overrides);
}

describe('internal pure form validation', () => {
  it('matches the approved v1 public envelope for canonical form fixtures', () => {
    const schema = require('../src/fulcrum-schema');
    const fixtureRoot = path.join(__dirname, 'fixtures', 'validation');
    const valid = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'valid-form.json')));
    const invalid = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'invalid-form.json')));
    const validResult = schema.validateForm(valid.request);
    const invalidResult = schema.validateForm(invalid.request);
    assert.strictEqual(validResult.contract_version, 'v1');
    assert.strictEqual(validResult.outcome, 'valid');
    assert.deepStrictEqual(validResult.diagnostics, []);
    assert.deepStrictEqual(validResult.coverage, valid.response.coverage);
    assert.strictEqual(invalidResult.outcome, 'invalid');
    assert.strictEqual(invalidResult.diagnostics[0].code, 'FORM.DUPLICATE_DATA_NAME');
    assert.strictEqual(invalidResult.diagnostics[0].path, '$.elements[1].data_name');
    assert.deepStrictEqual(invalidResult.coverage, invalid.response.coverage);
    assert.strictEqual(validResult.versions.validator, 'flcrm-22117-v1');
    assert.strictEqual(validResult.versions.schema, null);
    assert.strictEqual(validResult.versions.runtime, null);
    ['contract_version', 'outcome', 'diagnostics', 'coverage', 'versions']
      .forEach((key) => assert.ok(Object.prototype.hasOwnProperty.call(validResult, key)));
  });

  it('uses default checks and reports an explicit missing-check entry', () => {
    const schema = require('../src/fulcrum-schema');
    const candidate = {
      name: 'Inspection',
      elements: [{
        type: 'TextField',
        key: 'name',
        label: 'Name',
        data_name: 'name'
      }]
    };
    const defaults = schema.validateForm({
      contract_version: 'v1',
      artifact_type: 'form',
      operation: 'create',
      artifact: candidate
    });
    assert.deepStrictEqual(defaults.coverage.requested, ['structural', 'semantic']);
    assert.deepStrictEqual(defaults.coverage.completed, ['structural', 'semantic']);
    assert.strictEqual(defaults.outcome, 'valid');

    const missing = schema.validateForm({
      contract_version: 'v1',
      artifact_type: 'form',
      operation: 'create',
      artifact: candidate,
      checks: []
    });
    assert.strictEqual(missing.outcome, 'incomplete');
    assert.deepStrictEqual(missing.coverage.requested, []);
    assert.deepStrictEqual(missing.coverage.skipped, [{
      check: 'validation',
      reason_code: 'MISSING_CHECK'
    }]);
    assert.deepStrictEqual(missing.coverage.completed, []);
  });

  it('keeps public coverage entries structured and applies invalid precedence', () => {
    const schema = require('../src/fulcrum-schema');
    const result = schema.validateForm({
      contract_version: 'v1',
      artifact_type: 'form',
      operation: 'create',
      artifact: {
        name: '',
        elements: []
      },
      checks: ['structural', 'future_check']
    });
    assert.strictEqual(result.outcome, 'invalid');
    assert.ok(result.coverage.unsupported.some((entry) => (
      entry.check === 'future_check' && entry.reason_code === 'UNSUPPORTED_CHECK'
    )));
    assert.ok(result.coverage.completed.includes('structural'));
    [...result.coverage.skipped, ...result.coverage.unsupported,
      ...result.coverage.unverified, ...result.coverage.failures]
      .forEach((entry) => {
        assert.strictEqual(typeof entry.check, 'string');
        assert.strictEqual(typeof entry.reason_code, 'string');
      });
    assert.ok(result.diagnostics.every((diagnostic) => (
      ['error', 'warning', 'info'].includes(diagnostic.severity)
    )));
  });

  it('does not copy caller versions and reports schema mismatches as incomplete', () => {
    const schema = require('../src/fulcrum-schema');
    const candidate = {
      name: 'Inspection',
      schema_version: 'v6',
      elements: [{
        type: 'TextField',
        key: 'name',
        label: 'Name',
        data_name: 'name'
      }]
    };
    const result = schema.validateForm({
      contract_version: 'v1',
      artifact_type: 'form',
      operation: 'create',
      artifact: candidate,
      schema_version: 'caller-schema',
      runtime_version: 'caller-runtime',
      checks: ['structural', 'semantic']
    });

    it('does not expose blank schema-version metadata', () => {
      const schema = require('../src/fulcrum-schema');
      const result = schema.validateForm({
        contract_version: 'v1',
        artifact_type: 'form',
        operation: 'create',
        artifact: {
          name: 'Inspection',
          schema_version: '   ',
          elements: [{
            type: 'TextField',
            key: 'name',
            label: 'Name',
            data_name: 'name'
          }]
        },
        checks: ['structural']
      });
      assert.strictEqual(result.versions.schema, null);
      assert.strictEqual(result.outcome, 'incomplete');
      assert.ok(result.coverage.skipped.some(
        (entry) => entry.check === 'structural' && entry.reason_code === 'UNSUPPORTED_VERSION'
      ));
    });
    assert.strictEqual(result.outcome, 'incomplete');
    assert.strictEqual(result.versions.schema, 'v6');
    assert.strictEqual(result.versions.runtime, null);
    assert.deepStrictEqual(result.coverage.completed, []);
    assert.deepStrictEqual(result.coverage.skipped, [
      { check: 'structural', reason_code: 'VERSION_MISMATCH' },
      { check: 'semantic', reason_code: 'VERSION_MISMATCH' }
    ]);
  });

  it('reports dynamic semantic coverage as unverified without an error', () => {
    const schema = require('../src/fulcrum-schema');
    const result = schema.validateForm({
      contract_version: 'v1',
      artifact_type: 'form',
      operation: 'create',
      artifact: {
        name: 'Inspection',
        elements: [{
          type: 'DynamicField',
          key: 'dynamic',
          label: 'Dynamic',
          data_name: 'dynamic'
        }]
      },
      checks: ['structural', 'semantic']
    });
    assert.strictEqual(result.outcome, 'incomplete');
    assert.deepStrictEqual(result.coverage.completed, ['structural']);
    assert.deepStrictEqual(result.coverage.unverified, [{
      check: 'semantic',
      reason_code: 'DYNAMIC_REFERENCE',
      path: '$.elements[0]'
    }]);
    assert.strictEqual(result.diagnostics[0].severity, 'warning');
  });

  it('does not merge update artifacts and gates compatibility on previous_artifact', () => {
    const schema = require('../src/fulcrum-schema');
    const artifact = form({ elements: [field({ key: 'current', data_name: 'current' })] });
    const previous = form({ elements: [field({ key: 'previous', data_name: 'previous' })] });
    const result = schema.validateForm({
      contract_version: 'v1',
      artifact_type: 'form',
      operation: 'update',
      artifact,
      checks: ['structural']
    });
    assert.strictEqual(result.outcome, 'valid');
    assert.deepStrictEqual(result.coverage.completed, ['structural']);
    const incomplete = schema.validateForm({
      contract_version: 'v1',
      artifact_type: 'form',
      operation: 'update',
      artifact,
      checks: ['structural', 'compatibility']
    });
    assert.strictEqual(incomplete.outcome, 'incomplete');
    assert.deepStrictEqual(incomplete.coverage.skipped, [{
      check: 'compatibility', reason_code: 'CONTEXT_REQUIRED'
    }]);
    const compatible = schema.validateForm({
      contract_version: 'v1',
      artifact_type: 'form',
      operation: 'update',
      artifact: form({ elements: [field({ key: 'previous', data_name: 'previous' })] }),
      previous_artifact: previous,
      checks: ['compatibility']
    });
    assert.strictEqual(compatible.outcome, 'valid');
    assert.notStrictEqual(artifact.elements, previous.elements);
  });

  it('returns safe structured errors for malformed public requests', () => {
    const schema = require('../src/fulcrum-schema');
    const result = schema.validateForm({
      contract_version: 'v1',
      artifact_type: 'form',
      operation: 'create',
      artifact: []
    });
    assert.strictEqual(result.outcome, 'invalid');
    assert.strictEqual(result.diagnostics[0].code, 'VALIDATION.INVALID_REQUEST');
    assert.strictEqual(result.diagnostics[0].path, '$');
    assert.ok(!Object.prototype.hasOwnProperty.call(result, 'reason'));
  });

  it('keeps the supported element type profile aligned with Rails Form::TYPES', () => {
    assert.strictEqual(ELEMENT_TYPES.length, 24);
    assert.ok(!ELEMENT_TYPES.includes('ProjectField'));
  });

  it('exports the approved validator only from the package root', () => {
    const schema = require('../src/fulcrum-schema');
    assert.strictEqual(typeof schema.validateForm, 'function');
    assert.strictEqual(
      fs.existsSync(path.join(__dirname, '../src/validation/index.js')),
      false
    );
    assert.strictEqual(
      fs.existsSync(path.join(__dirname, '../dist/validation/form-validator.js')),
      true
    );
    assert.throws(() => require('../src/validation'), /Cannot find module/);
  });

  it('distinguishes create validation and explicit falsy values', () => {
    const candidate = form({
      elements: [field({ numeric: false, min_length: 0, default_value: '' })]
    });
    const before = JSON.stringify(candidate);
    const result = validate({ operation: 'create', form: freeze(candidate) });
    assert.notStrictEqual(result.outcome, 'invalid');
    assert.strictEqual(JSON.stringify(candidate), before);
    assert.ok(result.versions.validator);
    assert.ok(result.coverage.provisional.includes('data-name-scope'));
  });

  it('materializes updates by own-property presence and does not mutate either input', () => {
    const previous = form({
      status: 'active',
      elements: [field({ key: 'old', data_name: 'old', required: true })]
    });
    const patch = { elements: [], status: 0 };
    const previousBefore = JSON.stringify(previous);
    const patchBefore = JSON.stringify(patch);
    const result = validate({
      operation: 'update',
      form: freeze(patch),
      previous_form: freeze(previous)
    });
    assert.strictEqual(JSON.stringify(previous), previousBefore);
    assert.strictEqual(JSON.stringify(patch), patchBefore);
    assert.ok(result.diagnostics.some((diagnostic) => diagnostic.code === 'form-elements-nonempty'));
    assert.ok(result.diagnostics.some((diagnostic) => diagnostic.code === 'form-status'));
  });

  it('requires previous_form for updates', () => {
    const result = validate({ operation: 'update', form: form() });
    assert.strictEqual(result.outcome, 'invalid');
    assert.ok(result.diagnostics.some((diagnostic) => diagnostic.code === 'missing-previous-form'));
  });

  it('checks nested scope names, references, and leaf type compatibility', () => {
    const previous = form({
      elements: [
        field({ key: 'a', data_name: 'a' }),
        {
          type: 'Repeatable', key: 'r', label: 'Rows', data_name: 'rows',
          disabled: false, hidden: false, required: false, elements: [
            field({ key: 'b', data_name: 'a' })
          ]
        }
      ],
      record_title_key: 'missing'
    });
    const current = form({
      elements: [field({ key: 'a', data_name: 'a', type: 'ChoiceField', choices: [] })]
    });
    const result = validate({ operation: 'update', form: current, previous_form: previous });
    assert.ok(result.diagnostics.some((diagnostic) => diagnostic.code === 'leaf-type-change'));
    assert.ok(result.diagnostics.some((diagnostic) => diagnostic.code === 'record-title-reference'));
    assert.ok(result.diagnostics.some((diagnostic) => diagnostic.code === 'choices-array'));
    assert.ok(!result.diagnostics.some((diagnostic) => diagnostic.code === 'duplicate-data-name'));
  });

  it('bounds cyclic input without recursion or execution', () => {
    const cyclic = form();
    cyclic.elements[0].elements = cyclic.elements;
    const result = validate({ operation: 'create', form: cyclic });
    assert.ok(result.diagnostics.some((diagnostic) => diagnostic.code === 'cyclic-elements'));
  });

  it('keeps executable-looking values inert and messages bounded', () => {
    const candidate = form({
      elements: [field({
        key: 'script',
        data_name: 'script',
        default_value: 'require("child_process").exec("touch /tmp/pwned")',
        pattern: '(a+)+$'
      })]
    });
    const result = validate({ operation: 'create', form: candidate });
    assert.ok(!result.diagnostics.some((diagnostic) => diagnostic.message.includes('child_process')));
    assert.ok(result.diagnostics.every((diagnostic) => diagnostic.message.length < 300));
  });

  it('does not coerce hostile AI prompt values', () => {
    let coercions = 0;
    const hostilePrompt = {
      toString() {
        coercions += 1;
        throw new Error('ai_prompt toString must not execute');
      },
      valueOf() {
        coercions += 1;
        throw new Error('ai_prompt valueOf must not execute');
      }
    };
    const candidate = freeze(form({ elements: [field({ ai_prompt: hostilePrompt })] }));
    const request = {
      operation: 'create',
      form: candidate
    };
    const result = validate(request);
    const repeated = validate(request);
    assert.strictEqual(coercions, 0);
    assert.deepStrictEqual(repeated, result);
    assert.strictEqual(result.diagnostics.filter(
      (diagnostic) => diagnostic.code === 'ai-prompt-type'
    ).length, 1);
    assert.strictEqual(
      result.diagnostics.find((diagnostic) => diagnostic.code === 'ai-prompt-type').path,
      '/elements/0/ai_prompt'
    );
  });

  it('emits exactly one diagnostic for each required common boolean', () => {
    const result = validate({
      operation: 'create',
      form: form({
        elements: [field({
          disabled: 'false',
          hidden: 0,
          required: null
        })]
      })
    });
    ['disabled', 'hidden', 'required'].forEach((property) => {
      const diagnostics = result.diagnostics.filter(
        (diagnostic) => diagnostic.path === `/elements/0/${property}`
      );
      assert.strictEqual(diagnostics.length, 1);
      assert.strictEqual(diagnostics[0].code, 'element-boolean');
    });
  });

  it('builds bounded JSON pointer segments without user-defined coercion', () => {
    let coercions = 0;
    const hostileSegment = {
      toString() {
        coercions += 1;
        throw new Error('path toString must not execute');
      },
      valueOf() {
        coercions += 1;
        throw new Error('path valueOf must not execute');
      }
    };
    assert.strictEqual(pointerPart(hostileSegment), 'invalid-segment');
    assert.strictEqual(pointerPart(Symbol('hostile')), 'invalid-segment');
    assert.strictEqual(pointerPart(true), 'invalid-segment');
    assert.strictEqual(pointerPart(-1), 'invalid-segment');
    assert.strictEqual(
      pointerPart('x'.repeat(MAX_POINTER_SEGMENT_LENGTH + 1)),
      'invalid-segment'
    );
    assert.strictEqual(
      pointerPart('~'.repeat(MAX_POINTER_SEGMENT_LENGTH)),
      'invalid-segment'
    );
    assert.strictEqual(pointerPart('key/with~escapes'), 'key~1with~0escapes');
    assert.strictEqual(pointerPart(42), '42');
    assert.strictEqual(appendPointer(hostileSegment, hostileSegment), '/invalid-segment');
    assert.strictEqual(coercions, 0);
  });

  it('is deterministic and leaves the SQL singleton configuration untouched', () => {
    const schema = require('../src/fulcrum-schema');
    const keys = ['dialect', 'version', 'oldForm', 'newForm', 'tableSchema', 'tablePrefix', 'includeMetadata'];
    const saved = {};
    keys.forEach((key) => { saved[key] = schema[key]; });
    const candidate = form({
      elements: [
        field({ key: 'b', data_name: 'b', label: '' }),
        field({ key: 'a', data_name: 'a', required: 'false' })
      ]
    });
    try {
      const first = validate({ operation: 'create', form: candidate });
      const second = validate({ operation: 'create', form: candidate });
      assert.deepStrictEqual(first, second);
      keys.forEach((key) => assert.strictEqual(schema[key], saved[key]));
    } finally {
      keys.forEach((key) => { schema[key] = saved[key]; });
    }
  });

  it('does not trust inherited request, form, or element properties', () => {
    const inheritedForm = Object.create({
      name: 'Inherited',
      elements: [field()]
    });
    const inheritedRequest = Object.create({
      operation: 'create',
      form: inheritedForm
    });
    const result = validate(inheritedRequest);
    assert.ok(result.diagnostics.some((diagnostic) => diagnostic.code === 'invalid-operation'));

    const inheritedElement = Object.create(field());
    const ownForm = { name: 'Own', schema_version: 'v6', elements: [inheritedElement] };
    const ownResult = validate({ operation: 'create', form: ownForm });
    assert.ok(ownResult.diagnostics.some((diagnostic) => diagnostic.code === 'element-key'));
    assert.ok(ownResult.diagnostics.some((diagnostic) => diagnostic.code === 'element-type'));
  });

  it('accepts exactly 1,400 flattened elements and rejects the next one', () => {
    const elements = (count) => Array.from({ length: count }, (_, index) => field({
      key: `field_${index}`,
      data_name: `field_${index}`
    }));
    const atLimit = validate({
      operation: 'create',
      form: form({ elements: elements(1400) })
    });
    const overLimit = validate({
      operation: 'create',
      form: form({ elements: elements(1401) })
    });
    assert.ok(!atLimit.diagnostics.some((diagnostic) => diagnostic.code === 'element-limit'));
    assert.ok(overLimit.diagnostics.some((diagnostic) => diagnostic.code === 'element-limit'));
  });

  it('keeps section names transparent and repeatable names scoped', () => {
    const result = validate({
      operation: 'create',
      form: form({
        elements: [
          field({ key: 'root_a', data_name: 'same' }),
          {
            type: 'Section', key: 'section', label: 'Section',
            disabled: false, hidden: false, required: false,
            elements: [field({ key: 'section_a', data_name: 'same' })]
          },
          {
            type: 'Repeatable', key: 'rows', label: 'Rows', data_name: 'rows',
            disabled: false, hidden: false, required: false,
            elements: [field({ key: 'row_a', data_name: 'same' })]
          }
        ]
      })
    });
    assert.strictEqual(result.diagnostics.filter(
      (diagnostic) => diagnostic.code === 'duplicate-data-name'
    ).length, 1);
    assert.ok(result.coverage.provisional.includes('data-name-scope'));
  });

  it('validates type-specific boundaries without evaluating expressions', () => {
    const result = validate({
      operation: 'create',
      form: form({
        elements: [
          field({
            key: 'choices',
            data_name: 'choices',
            type: 'ChoiceField',
            choices: [{ label: 'Zero', value: 0 }, { label: 'False', value: false }],
            multiple: true,
            default_value: [0, false]
          }),
          field({
            key: 'numeric',
            data_name: 'numeric',
            numeric: true,
            format: 'bad',
            default_value: Infinity,
            min_length: 4,
            max_length: 2
          }),
          field({
            key: 'yes_no',
            data_name: 'yes_no',
            type: 'YesNoField',
            positive: { label: 'Yes', value: {} },
            negative: { label: 'No', value: false }
          }),
          field({
            key: 'effect',
            data_name: 'effect',
            field_effects: { event: 'change', action: 'hide' }
          }),
          field({
            key: 'calculated',
            data_name: 'calculated',
            type: 'CalculatedField',
            expression: 'throw new Error("must remain inert")',
            display: { style: 4 }
          })
        ]
      })
    });
    assert.ok(!result.diagnostics.some((diagnostic) => diagnostic.code === 'numeric-default'));
    assert.ok(result.diagnostics.some((diagnostic) => diagnostic.code === 'text-format'));
    assert.ok(result.diagnostics.some((diagnostic) => diagnostic.code === 'length-order'));
    assert.ok(result.diagnostics.some((diagnostic) => diagnostic.code === 'yes-no-choice'));
    assert.ok(result.diagnostics.some((diagnostic) => diagnostic.code === 'calculated-display'));
    assert.ok(!result.diagnostics.some((diagnostic) => diagnostic.message.includes('must remain inert')));
  });

  it('checks local reference scopes and target-type operators', () => {
    const result = validate({
      operation: 'create',
      form: form({
        elements: [
          field({
            key: 'source',
            data_name: 'source',
            visible_conditions: [
              { field_key: 'source', operator: 'equal_to', value: 'self' },
              { field_key: 'target', operator: 'contains', value: 'x' }
            ]
          }),
          field({
            key: 'target',
            data_name: 'target',
            type: 'PhotoField',
            visible_conditions: [{ field_key: 'source', operator: 'contains', value: 'x' }]
          })
        ]
      })
    });
    assert.ok(result.diagnostics.some((diagnostic) => diagnostic.code === 'condition-scope'));
    assert.ok(result.diagnostics.some((diagnostic) => diagnostic.code === 'condition-target-type'));
  });

  it('reports unsupported schema versions without assuming current rules', () => {
    const result = validate({
      operation: 'create',
      form: form({ schema_version: 'future-v99' })
    });
    assert.strictEqual(result.outcome, 'unsupported');
    assert.strictEqual(result.versions.schema, 'future-v99');
    assert.ok(result.coverage.unsupported.includes('schema-version'));
  });

  it('does not run current rules or echo values for malformed schema versions', () => {
    const secret = { schema_version: { token: 'do-not-echo' }, name: '', elements: [] };
    const result = validate({ operation: 'create', form: secret });
    assert.strictEqual(result.outcome, 'unsupported');
    assert.strictEqual(result.versions.schema, null);
    assert.deepStrictEqual(result.coverage.skipped.includes('root-structure'), true);
    assert.ok(!JSON.stringify(result).includes('do-not-echo'));
  });

  it('truncates diagnostics deterministically and marks incomplete coverage', () => {
    const candidate = form({
      elements: Array.from({ length: 250 }, (_, index) => ({
        type: 'Unknown',
        key: `key_${index}`,
        label: '',
        data_name: '',
        disabled: 'false',
        hidden: false,
        required: false
      }))
    });
    const first = validate({ operation: 'create', form: candidate });
    const second = validate({ operation: 'create', form: candidate });
    assert.strictEqual(first.diagnostics.length, DIAGNOSTIC_LIMIT);
    assert.strictEqual(Object.prototype.propertyIsEnumerable.call(
      first.diagnostics, 'overflowed'
    ), true);
    assert.ok(first.coverage.skipped.includes('diagnostic-overflow'));
    assert.deepStrictEqual(first, second);
  });

  it('matches Rails present? for empty arrays and objects', () => {
    const emptyValues = validate({
      operation: 'create',
      form: form({
        status: [],
        field_effects: [],
        status_field: {
          enabled: true,
          label: {},
          data_name: 'status',
          choices: [],
          default_value: {}
        }
      })
    });
    assert.ok(!emptyValues.diagnostics.some(
      (diagnostic) => diagnostic.code === 'form-status'
    ));
    assert.ok(emptyValues.diagnostics.some(
      (diagnostic) => diagnostic.code === 'status-field-label'
    ));
    assert.ok(emptyValues.diagnostics.some(
      (diagnostic) => diagnostic.code === 'status-field-choices'
    ));
    assert.ok(!emptyValues.diagnostics.some(
      (diagnostic) => diagnostic.code === 'field-effects-object'
    ));
    assert.ok(!emptyValues.diagnostics.some(
      (diagnostic) => diagnostic.code === 'field-effects-array'
    ));
  });

  it('bounds diagnostics while indexing malformed element collections', () => {
    const candidate = form({ elements: Array.from({ length: 1401 }, () => null) });
    const result = validate({ operation: 'create', form: candidate });
    assert.strictEqual(result.outcome, 'invalid');
    assert.strictEqual(result.diagnostics.length, DIAGNOSTIC_LIMIT);
    assert.ok(result.coverage.skipped.includes('diagnostic-overflow'));
    assert.ok(result.diagnostics.some((diagnostic) => diagnostic.code === 'element-limit'));
    assert.ok(result.diagnostics.every((diagnostic) => diagnostic.message.length < 300));
  });

  it('uses the actual FastFill property path and keeps compatibility messages bounded', () => {
    const previous = form({
      elements: [field({ key: 'photo', type: 'TextField', data_name: 'photo' })]
    });
    const current = form({
      elements: [field({
        key: 'photo',
        type: 'PhotoField',
        ai_prompt: 'missing'
      })]
    });
    const result = validate({ operation: 'update', form: current, previous_form: previous });
    const compatibility = result.diagnostics.find(
      (diagnostic) => diagnostic.code === 'leaf-type-change'
    );
    assert.ok(compatibility.message.includes('TextField'));
    assert.ok(compatibility.message.length < 300);
    const fastFill = result.diagnostics.find(
      (diagnostic) => diagnostic.code === 'fast-fill-reference'
    );
    assert.strictEqual(fastFill.path, '/elements/0/ai_prompt');
  });

  it('uses Rails condition operator names and only accepts field_key references', () => {
    const result = validate({
      operation: 'create',
      form: form({
        elements: [
          field({
            key: 'source',
            data_name: 'source',
            visible_conditions: [
              { field_key: 'target', operator: 'equal_to', value: 'a' },
              { field_key: 'target', operator: 'not_equal_to', value: 'b' },
              { field_key: 'target', operator: 'equals', value: 'c' },
              { key: 'target', operator: 'equal_to', value: 'd' }
            ]
          }),
          field({
            key: 'target',
            data_name: 'target',
            type: 'ChoiceField',
            choices: [{ label: 'A' }]
          })
        ]
      })
    });
    assert.strictEqual(result.diagnostics.filter(
      (diagnostic) => diagnostic.code === 'condition-operator'
    ).length, 1);
    assert.strictEqual(result.diagnostics.filter(
      (diagnostic) => diagnostic.code === 'condition-field-key'
    ).length, 1);
  });

  it('does not coerce condition keys or Rails-blank condition values', () => {
    const result = validate({
      operation: 'create',
      form: form({
        elements: [
          field({
            key: 'source',
            data_name: 'source',
            visible_conditions: [
              { field_key: 0, operator: 'is_empty', value: false },
              { field_key: 'target', operator: 'is_empty', value: '  ' }
            ]
          }),
          field({ key: '0', data_name: 'zero' }),
          field({ key: 'target', data_name: 'target' })
        ]
      })
    });
    assert.ok(result.diagnostics.some(
      (diagnostic) => diagnostic.code === 'condition-reference'
    ));
    assert.ok(!result.diagnostics.some(
      (diagnostic) => diagnostic.code === 'condition-value'
    ));
  });

  it('uses the containing repeatable scope and rejects self and child references', () => {
    const result = validate({
      operation: 'create',
      form: form({
        elements: [
          field({ key: 'root', data_name: 'root' }),
          {
            type: 'Repeatable',
            key: 'rows',
            label: 'Rows',
            data_name: 'rows',
            disabled: false,
            hidden: false,
            required: false,
            visible_conditions: [
              { field_key: 'rows', operator: 'equal_to', value: 'self' },
              { field_key: 'inside', operator: 'equal_to', value: 'child' }
            ],
            elements: [
              field({
                key: 'inside',
                data_name: 'inside',
                visible_conditions: [
                  { field_key: 'root', operator: 'equal_to', value: 'ancestor' },
                  { field_key: 'peer', operator: 'equal_to', value: 'same-scope' }
                ]
              }),
              field({ key: 'peer', data_name: 'peer' })
            ]
          }
        ]
      })
    });
    assert.strictEqual(result.diagnostics.filter(
      (diagnostic) => diagnostic.code === 'condition-scope'
    ).length, 2);
  });

  it('indexes repeatable data names in the parent scope and children in child scopes', () => {
    const result = validate({
      operation: 'create',
      form: form({
        elements: [
          field({ key: 'root', data_name: 'shared' }),
          {
            type: 'Repeatable',
            key: 'rows',
            label: 'Rows',
            data_name: 'shared',
            disabled: false,
            hidden: false,
            required: false,
            elements: [
              field({ key: 'inner', data_name: 'nested_name' }),
              {
                type: 'Repeatable',
                key: 'nested',
                label: 'Nested',
                data_name: 'nested_name',
                disabled: false,
                hidden: false,
                required: false,
                elements: [field({ key: 'deep', data_name: 'nested_name' })]
              }
            ]
          }
        ]
      })
    });
    assert.strictEqual(result.diagnostics.filter(
      (diagnostic) => diagnostic.code === 'duplicate-data-name'
    ).length, 2);
  });

  it('matches Rails title flattening for form and repeatable references', () => {
    const section = {
      type: 'Section',
      key: 'section',
      label: 'Section',
      disabled: false,
      hidden: false,
      required: false,
      elements: [field({ key: 'section_value', data_name: 'section_value' })]
    };
    const rows = {
      type: 'Repeatable',
      key: 'rows',
      label: 'Rows',
      data_name: 'rows',
      disabled: false,
      hidden: false,
      required: false,
      title_field_key: 'row_section',
      elements: [{
        ...section,
        key: 'row_section',
        elements: [field({ key: 'row_value', data_name: 'row_value' })]
      }]
    };
    const valid = validate({
      operation: 'create',
      form: form({
        record_title_key: 'section',
        title_field_keys: ['rows'],
        elements: [section, rows]
      })
    });
    assert.ok(!valid.diagnostics.some((diagnostic) => diagnostic.code.includes('title')));

    rows.title_field_key = 'deep';
    rows.elements.push({
      type: 'Repeatable',
      key: 'nested_rows',
      label: 'Nested rows',
      data_name: 'nested_rows',
      disabled: false,
      hidden: false,
      required: false,
      elements: [field({ key: 'deep', data_name: 'deep' })]
    });
    const invalid = validate({
      operation: 'create',
      form: form({ elements: [rows] })
    });
    assert.ok(invalid.diagnostics.some(
      (diagnostic) => diagnostic.code === 'repeatable-title-reference'
    ));
  });

  it('distinguishes choice lists from inline choices and uses Rails record-link flags', () => {
    const result = validate({
      operation: 'create',
      form: form({
        elements: [
          field({
            type: 'ChoiceField',
            key: 'list',
            data_name: 'list',
            choice_list_id: 'choice-list-id'
          }),
          field({
            type: 'ChoiceField',
            key: 'inline',
            data_name: 'inline',
            choices: [{ label: 'Label only' }]
          }),
          field({
            type: 'RecordLinkField',
            key: 'link',
            data_name: 'link',
            form_id: 'linked-form-id',
            allow_creating_records: false,
            allow_existing_records: true
          }),
          field({
            type: 'RecordLinkField',
            key: 'legacy',
            data_name: 'legacy',
            form_id: 'linked-form-id',
            allow_create: true
          })
        ]
      })
    });
    assert.ok(!result.diagnostics.some((diagnostic) => diagnostic.path.includes('/0/choices')));
    assert.ok(!result.diagnostics.some((diagnostic) => diagnostic.path.includes('/1/choices')));
    assert.strictEqual(result.diagnostics.filter(
      (diagnostic) => diagnostic.code === 'record-link-flags'
    ).length, 1);
  });

  it('matches Ruby truthiness when selecting choice-list versus inline choices', () => {
    [
      { choiceListId: '', external: true },
      { choiceListId: '  ', external: true },
      { choiceListId: 0, external: true },
      { choiceListId: null, external: false },
      { choiceListId: false, external: false }
    ].forEach(({ choiceListId, external }) => {
      const result = validate({
        operation: 'create',
        form: form({
          elements: [field({
            type: 'ChoiceField',
            key: 'choice',
            data_name: 'choice',
            choice_list_id: choiceListId,
            choices: []
          })]
        })
      });
      assert.strictEqual(
        result.diagnostics.some((diagnostic) => diagnostic.code === 'choices-array'),
        !external
      );
    });
  });

  it('matches Rails blank handling for optional length values', () => {
    [false, null].forEach((length) => {
      const result = validate({
        operation: 'create',
        form: form({
          elements: [field({
            min_length: length,
            max_length: length
          })]
        })
      });
      assert.ok(!result.diagnostics.some((diagnostic) => diagnostic.code === 'field-length'));
    });
    ['', '  '].forEach((length) => {
      const result = validate({
        operation: 'create',
        form: form({
          elements: [field({
            min_length: length,
            max_length: length
          })]
        })
      });
      assert.strictEqual(
        result.diagnostics.filter((diagnostic) => diagnostic.code === 'field-length').length,
        2
      );
    });
    const zeroMin = validate({
      operation: 'create',
      form: form({
        elements: [field({ min_length: 0, max_length: 1 })]
      })
    });
    assert.ok(!zeroMin.diagnostics.some((diagnostic) => diagnostic.code === 'field-length'));
    const zeroMax = validate({
      operation: 'create',
      form: form({
        elements: [field({ min_length: 0, max_length: 0 })]
      })
    });
    assert.ok(zeroMax.diagnostics.some((diagnostic) => diagnostic.code === 'field-length'));
  });

  it('accepts null sketch backgrounds and requires arrays otherwise', () => {
    const nullBackgrounds = validate({
      operation: 'create',
      form: form({
        elements: [field({
          type: 'SketchField',
          key: 'sketch',
          data_name: 'sketch',
          backgrounds: null
        })]
      })
    });
    assert.ok(!nullBackgrounds.diagnostics.some(
      (diagnostic) => diagnostic.code === 'sketch-backgrounds'
    ));
    const result = validate({
      operation: 'create',
      form: form({
        elements: [field({
          type: 'SketchField',
          key: 'sketch',
          data_name: 'sketch',
          backgrounds: [{ attachment_id: 'not-resolved-here' }, 0, null]
        })]
      })
    });
    assert.ok(!result.diagnostics.some((diagnostic) => diagnostic.code === 'sketch-backgrounds'));
    const invalid = validate({
      operation: 'create',
      form: form({
        elements: [field({
          type: 'SketchField',
          key: 'sketch',
          data_name: 'sketch',
          backgrounds: 'not-an-array'
        })]
      })
    });
    assert.ok(invalid.diagnostics.some((diagnostic) => diagnostic.code === 'sketch-backgrounds'));
  });

  it('does not treat explicit false as a Rails-present Yes/No choice or default', () => {
    const falseChoice = validate({
      operation: 'create',
      form: form({
        elements: [field({
          type: 'YesNoField',
          key: 'yes_no',
          data_name: 'yes_no',
          positive: { label: 'Yes', value: true },
          negative: { label: 'No', value: false },
          default_value: false
        })]
      })
    });
    assert.ok(falseChoice.diagnostics.some((diagnostic) => diagnostic.code === 'yes-no-choice'));
    assert.ok(!falseChoice.diagnostics.some((diagnostic) => diagnostic.code === 'yes-no-default'));
  });

  it('validates hyperlink, numeric, calculated, and AI prompt Rails boundaries', () => {
    const result = validate({
      operation: 'create',
      form: form({
        elements: [
          field({
            key: 'numeric',
            data_name: 'numeric',
            numeric: true,
            min: -10.5,
            max: 0.25,
            min_length: 0,
            max_length: 1
          }),
          field({
            type: 'HyperlinkField',
            key: 'link',
            data_name: 'link',
            default_url: 42
          }),
          field({
            type: 'CalculatedField',
            key: 'bad_style',
            data_name: 'bad_style',
            display: { style: 'time' }
          }),
          field({
            type: 'CalculatedField',
            key: 'currency',
            data_name: 'currency',
            display: { style: 'currency' }
          }),
          field({
            key: 'prompt',
            data_name: 'prompt',
            ai_prompt: 'x'.repeat(151)
          }),
          field({
            type: 'PhotoField',
            key: 'photo',
            data_name: 'photo',
            ai_prompt: 'x'.repeat(10001)
          })
        ]
      })
    });
    assert.ok(!result.diagnostics.some((diagnostic) => diagnostic.code === 'numeric-bound'));
    assert.ok(result.diagnostics.some((diagnostic) => diagnostic.code === 'hyperlink-default-url'));
    assert.strictEqual(result.diagnostics.filter(
      (diagnostic) => diagnostic.code === 'calculated-display'
    ).length, 1);
    assert.strictEqual(result.diagnostics.filter(
      (diagnostic) => diagnostic.code === 'calculated-currency'
    ).length, 1);
    assert.strictEqual(result.diagnostics.filter(
      (diagnostic) => diagnostic.code === 'ai-prompt-length'
    ).length, 2);
  });

  it('resolves newline-delimited Photo FastFill targets only in the exact scope', () => {
    const valid = validate({
      operation: 'create',
      form: form({
        elements: [
          field({ key: 'first', data_name: 'first' }),
          field({ key: 'second', data_name: 'second' }),
          field({
            type: 'PhotoField',
            key: 'photo',
            data_name: 'photo',
            ai_prompt: ' first \nsecond\n'
          })
        ]
      })
    });
    assert.ok(!valid.diagnostics.some((diagnostic) => diagnostic.code === 'fast-fill-reference'));

    const invalid = validate({
      operation: 'create',
      form: form({
        elements: [
          field({ key: 'root', data_name: 'root' }),
          {
            type: 'Repeatable',
            key: 'rows',
            label: 'Rows',
            data_name: 'rows',
            disabled: false,
            hidden: false,
            required: false,
            elements: [field({
              type: 'PhotoField',
              key: 'photo',
              data_name: 'photo',
              ai_prompt: 'root\nmissing'
            })]
          }
        ]
      })
    });
    const fastFill = invalid.diagnostics.find(
      (diagnostic) => diagnostic.code === 'fast-fill-reference'
    );
    assert.strictEqual(fastFill.path, '/elements/1/elements/0/ai_prompt');
  });

  it('validates field effects at form level and rejects ProjectField', () => {
    const validEffects = {
      effects: [{
        event: { name: 'change', field: 'source' },
        conditions: [{ field: 'source', operator: 'equals' }],
        actions: [{ type: 'setvalue' }]
      }]
    };
    const result = validate({
      operation: 'create',
      form: form({
        field_effects: validEffects,
        elements: [field({ field_effects: 'not-form-level' })]
      })
    });
    assert.ok(!result.diagnostics.some((diagnostic) => diagnostic.code.startsWith('field-effect')));

    const invalid = validate({
      operation: 'create',
      form: form({
        field_effects: { effects: [{ conditions: [], actions: [] }] },
        elements: [field({ type: 'ProjectField' })]
      })
    });
    assert.ok(invalid.diagnostics.some((diagnostic) => diagnostic.code === 'field-effect-event'));
    assert.ok(invalid.diagnostics.some((diagnostic) => diagnostic.code === 'element-type'));
  });

  it('only applies status-field requirements when enabled is exactly true', () => {
    [undefined, null, {}, { enabled: false }, { enabled: 'true' }].forEach((statusField) => {
      const candidate = form();
      if (statusField !== undefined) candidate.status_field = statusField;
      const result = validate({ operation: 'create', form: candidate });
      assert.ok(!result.diagnostics.some(
        (diagnostic) => diagnostic.code.startsWith('status-field')
          || diagnostic.code === 'status-default'
      ));
    });
    const enabled = validate({
      operation: 'create',
      form: form({ status_field: { enabled: true } })
    });
    assert.ok(enabled.diagnostics.some((diagnostic) => diagnostic.code === 'status-field-label'));
    assert.ok(enabled.diagnostics.some((diagnostic) => diagnostic.code === 'status-default'));
  });

  it('does not trust inherited status-field enablement', () => {
    const statusField = Object.create({ enabled: true });
    statusField.label = '';
    const result = validate({
      operation: 'create',
      form: form({ status_field: statusField })
    });
    assert.ok(!result.diagnostics.some(
      (diagnostic) => diagnostic.code.startsWith('status-field')
        || diagnostic.code === 'status-default'
    ));
  });

  it('matches Rails blank handling for optional status values', () => {
    [null, '', false, '  '].forEach((status) => {
      const result = validate({
        operation: 'create',
        form: form({ status })
      });
      assert.ok(!result.diagnostics.some((diagnostic) => diagnostic.code === 'form-status'));
    });
    const invalid = validate({
      operation: 'create',
      form: form({ status: 0 })
    });
    assert.ok(invalid.diagnostics.some((diagnostic) => diagnostic.code === 'form-status'));
  });

  it('reports incomplete input-only validation when contextual coverage is unavailable', () => {
    const result = validate({ operation: 'create', form: form() });
    assert.strictEqual(result.outcome, 'incomplete');
    assert.strictEqual(result.coverage.complete, false);
    assert.ok(result.coverage.requested.every(
      (check) => result.coverage.completed.includes(check)
    ));
    assert.ok(result.coverage.unsupported.includes('contextual-rails-checks'));
    assert.ok(result.coverage.provisional.includes('data-name-scope'));
    assert.ok(!result.coverage.completed.includes('contextual-rails-checks'));
  });

  it('allows valid only for an explicitly complete pure profile', () => {
    const requested = requestedChecks('create');
    const result = makeResult('v6', [], {
      requested,
      completed: requested,
      skipped: [],
      unsupported: [],
      provisional: []
    }, false);
    assert.strictEqual(result.outcome, 'valid');
    assert.strictEqual(result.coverage.complete, true);
  });

  it('does not collapse incomplete, unavailable, and invalid outcomes', () => {
    const incomplete = { ...form() };
    delete incomplete.schema_version;
    const incompleteResult = validate({ operation: 'create', form: incomplete });
    assert.strictEqual(incompleteResult.outcome, 'incomplete');
    assert.strictEqual(incompleteResult.coverage.complete, false);
    assert.ok(incompleteResult.coverage.skipped.includes('schema-version'));

    const unavailableResult = validate({
      operation: 'create',
      form: form({ schema_version: 'future-v99' })
    });
    assert.strictEqual(unavailableResult.outcome, 'unsupported');
    assert.ok(unavailableResult.coverage.unsupported.includes('schema-version'));

    const invalidResult = validate({
      operation: 'create',
      form: form({ elements: [] })
    });
    assert.strictEqual(invalidResult.outcome, 'invalid');
    assert.strictEqual(invalidResult.coverage.complete, false);
  });
});
