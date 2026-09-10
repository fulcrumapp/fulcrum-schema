'use strict';

const { materialize } = require('./materialize');
const { indexForm, isObject } = require('./traversal');
const {
  checkRoot, checkElements, resolveReferences, add, addWarning
} = require('./rules');
const { checkCompatibility } = require('./compatibility');
const { DIAGNOSTIC_LIMIT } = require('./limits');
const { makeResult, requestedChecks } = require('./result');
const KNOWN_SCHEMA_VERSIONS = new Set(['v1', 'v2', 'v3', 'v4', 'v5', 'v6']);

function sortDiagnostics(diagnostics) {
  const ordered = diagnostics
    .map((diagnostic, order) => ({ diagnostic, order }))
    .sort((left, right) => {
      const path = left.diagnostic.path.localeCompare(right.diagnostic.path);
      if (path !== 0) return path;
      const code = left.diagnostic.code.localeCompare(right.diagnostic.code);
      return code !== 0 ? code : left.order - right.order;
    })
    .map((item) => item.diagnostic);
  ['hasError', 'overflowed'].forEach((flag) => {
    if (diagnostics[flag]) {
      Object.defineProperty(ordered, flag, {
        configurable: true,
        enumerable: flag === 'overflowed',
        writable: true,
        value: true
      });
    }
  });
  return ordered;
}

function addMaterializationErrors(errors, diagnostics) {
  errors.forEach((error) => add(diagnostics, error.code, error.path, error.message));
}

function validate(request) {
  const materialized = materialize(request);
  const diagnostics = [];
  addMaterializationErrors(materialized.errors, diagnostics);
  const coverage = {
    requested: requestedChecks(materialized.operation),
    completed: [],
    skipped: [],
    unsupported: ['contextual-rails-checks'],
    provisional: []
  };
  const hasSchemaVersion = isObject(materialized.candidate)
    && Object.prototype.hasOwnProperty.call(materialized.candidate, 'schema_version');
  const schemaVersion = hasSchemaVersion ? materialized.candidate.schema_version : undefined;
  const schemaUnsupported = hasSchemaVersion
    && (typeof schemaVersion !== 'string'
      || !schemaVersion.trim() || !KNOWN_SCHEMA_VERSIONS.has(schemaVersion));

  if (schemaUnsupported) {
    addWarning(
      diagnostics,
      'unsupported-schema-version',
      '/schema_version',
      'schema version is not supported; no version-specific rules were run'
    );
    coverage.unsupported.push('schema-version');
  }

  if (materialized.candidate !== undefined && !schemaUnsupported) {
    coverage.provisional.push('data-name-scope');
    checkRoot(materialized.candidate, diagnostics);
    coverage.completed.push('root-structure');
    const index = indexForm(materialized.candidate);
    checkElements(index, diagnostics);
    if (index.diagnosticOverflow) diagnostics.overflowed = true;
    coverage.completed.push(
      'element-structure',
      'key-uniqueness',
      'container-children',
      'field-types'
    );
    if (isObject(materialized.candidate)) {
      resolveReferences(materialized.candidate, index, diagnostics);
      coverage.completed.push('form-references', 'conditions');
    } else {
      coverage.skipped.push('form-references', 'conditions');
    }
    coverage.completed.push('type-specific');
    coverage.provisional.push('regex-syntax');
    if (materialized.operation === 'update') {
      checkCompatibility(materialized.previous, materialized.candidate, diagnostics);
      coverage.completed.push('compatibility');
    } else {
      coverage.skipped.push('compatibility');
    }
    if (index.tooDeep || index.cyclic) {
      coverage.skipped.push('bounded-traversal');
    } else {
      coverage.completed.push('bounded-traversal');
    }
  } else if (materialized.candidate === undefined) {
    coverage.skipped.push(
      'root-structure', 'element-structure', 'key-uniqueness', 'data-name-scope',
      'container-children', 'field-types', 'form-references', 'conditions',
      'type-specific', 'regex-syntax', 'compatibility', 'bounded-traversal'
    );
  } else {
    coverage.skipped.push(
      'root-structure', 'element-structure', 'key-uniqueness', 'data-name-scope',
      'container-children', 'field-types', 'form-references', 'conditions',
      'type-specific', 'regex-syntax', 'compatibility', 'bounded-traversal'
    );
  }

  if (hasSchemaVersion && !schemaUnsupported) {
    coverage.completed.push('schema-version');
  } else if (!schemaUnsupported) {
    coverage.skipped.push('schema-version');
  }
  if (diagnostics.length > DIAGNOSTIC_LIMIT || diagnostics.overflowed) {
    coverage.skipped.push('diagnostic-overflow');
  } else {
    coverage.completed.push('diagnostic-overflow');
  }

  return makeResult(
    safeSchemaVersion(schemaVersion),
    sortDiagnostics(diagnostics),
    coverage,
    coverage.unsupported.includes('schema-version')
  );
}

function safeSchemaVersion(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  return value.length <= 64 ? value : `${value.slice(0, 61)}...`;
}

module.exports = {
  validate,
  checkCompatibility,
  sortDiagnostics
};
