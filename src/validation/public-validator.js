'use strict';

/*
 * Public v1 adapter.  The rule implementation deliberately remains isolated
 * from the SQL schema-diff singleton; this module only reads caller data.
 */
const { indexForm, isObject } = require('./traversal');
const {
  checkRoot, checkElements, resolveReferences, add, addWarning
} = require('./rules');
const { checkCompatibility } = require('./compatibility');
const { DIAGNOSTIC_LIMIT } = require('./limits');

// Source tests run from src/, while the published package runs from dist/.
// Both paths load package metadata rather than duplicating its version.
const moduleDirectories = __dirname.split(/[\\/]/);
const packageMetadata = moduleDirectories[moduleDirectories.length - 2] === 'src'
  ? require('../../package.json')
  : require('../package.json');
const VALIDATOR_VERSION = `${packageMetadata.name}@${packageMetadata.version}`;
const CONTRACT_VERSION = 'v1';
const DEFAULT_CHECKS = ['structural', 'semantic'];
const SUPPORTED_CHECKS = new Set(['structural', 'semantic', 'compatibility']);
const KNOWN_SCHEMA_VERSIONS = new Set(['v1', 'v2', 'v3', 'v4', 'v5', 'v6']);
const SEVERITIES = { error: 0, warning: 1, info: 2 };

function own(value, key) {
  return value !== null && typeof value === 'object'
    && Object.prototype.hasOwnProperty.call(value, key);
}

function pointerToPath(pointer) {
  if (pointer === '') return '$';
  const segments = pointer.split('/').slice(1).map((segment) => segment
    .replace(/~1/g, '/').replace(/~0/g, '~'));
  let result = '$';
  segments.forEach((segment) => {
    if (/^(0|[1-9][0-9]*)$/.test(segment)) {
      result += `[${segment}]`;
    } else if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(segment)) {
      result += `.${segment}`;
    } else {
      result += `[${JSON.stringify(segment)}]`;
    }
  });
  return result;
}

function normalizePath(path) {
  return pointerToPath(typeof path === 'string' ? path : '');
}

function codeFor(code) {
  if (typeof code !== 'string') return 'VALIDATION.INVALID_DIAGNOSTIC';
  if (/^(FORM|VALIDATION)\.[A-Z][A-Z0-9_]*$/.test(code)) return code;
  const normalized = code.replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '').toUpperCase() || 'RULE_FAILURE';
  return `FORM.${normalized}`;
}

function fixFor(code) {
  return {
    'duplicate-data-name': 'Choose a unique data name.',
    'duplicate-key': 'Choose a unique element key.',
    'form-name': 'Provide a nonblank form name.',
    'form-elements-array': 'Provide elements as an array.',
    'form-elements-nonempty': 'Provide at least one form element.',
    'element-key': 'Provide a unique, nonblank element key.',
    'element-label': 'Provide a nonblank element label.',
    'element-data-name': 'Provide a nonblank data name for this field.'
  }[code];
}

function safeMessage(message) {
  if (typeof message !== 'string') return 'Validation failed.';
  return message.length <= 300 ? message : `${message.slice(0, 297)}...`;
}

function toPublicDiagnostic(diagnostic) {
  const message = diagnostic.code === 'duplicate-data-name'
    ? 'The data name is already used in this scope.'
    : safeMessage(diagnostic.message);
  const result = {
    code: codeFor(diagnostic.code),
    severity: ['error', 'warning', 'info'].includes(diagnostic.severity)
      ? diagnostic.severity : 'error',
    message,
    path: normalizePath(diagnostic.path)
  };
  if (typeof diagnostic.fix === 'string' && diagnostic.fix.length <= 300) {
    result.fix = diagnostic.fix;
  } else {
    const fix = fixFor(diagnostic.code);
    if (fix) result.fix = fix;
  }
  if (diagnostic.range && isObject(diagnostic.range)) result.range = diagnostic.range;
  return result;
}

function sortDiagnostics(diagnostics) {
  return diagnostics.slice().sort((a, b) => {
    const path = a.path.localeCompare(b.path);
    if (path) return path;
    const ar = a.range && a.range.start ? a.range.start : { line: 0, column: 0 };
    const br = b.range && b.range.start ? b.range.start : { line: 0, column: 0 };
    const line = (ar.line || 0) - (br.line || 0);
    if (line) return line;
    const column = (ar.column || 0) - (br.column || 0);
    if (column) return column;
    const severity = SEVERITIES[a.severity] - SEVERITIES[b.severity];
    if (severity) return severity;
    const code = a.code.localeCompare(b.code);
    return code || a.message.localeCompare(b.message);
  });
}

function coverageEntry(check, reasonCode, path) {
  const entry = { check, reason_code: reasonCode };
  if (typeof path === 'string') entry.path = normalizePath(path);
  return entry;
}

function observedSchemaVersion(artifact) {
  if (!isObject(artifact) || !own(artifact, 'schema_version')
    || typeof artifact.schema_version !== 'string'
    || artifact.schema_version.length === 0
    || artifact.schema_version.length > 128
    || !KNOWN_SCHEMA_VERSIONS.has(artifact.schema_version)) {
    return null;
  }
  return artifact.schema_version;
}

function versionsFor(artifact, contractVersion) {
  return {
    validator: contractVersion === null || contractVersion === undefined
      ? null : VALIDATOR_VERSION,
    schema: observedSchemaVersion(artifact),
    // This package does not load a separate validation runtime.  In
    // particular, caller-declared runtime_version is not provenance.
    runtime: null
  };
}

function malformed(path, message, artifact, contractVersion) {
  return {
    contract_version: CONTRACT_VERSION,
    outcome: 'invalid',
    diagnostics: [{
      code: 'VALIDATION.INVALID_REQUEST',
      severity: 'error',
      message,
      path
    }],
    coverage: {
      requested: [],
      completed: [],
      skipped: [],
      unsupported: [],
      unverified: [],
      failures: []
    },
    versions: versionsFor(artifact, contractVersion)
  };
}

function validateForm(request) {
  try {
    if (!isObject(request)) return malformed('$', 'request must be a JSON object');
    if (!own(request, 'contract_version') || request.contract_version !== CONTRACT_VERSION) {
      return malformed(
        '$',
        'contract_version must be "v1"',
        undefined,
        own(request, 'contract_version') ? request.contract_version : undefined
      );
    }
    if (!own(request, 'artifact_type') || request.artifact_type !== 'form') {
      return malformed('$', 'artifact_type must be "form"', undefined, request.contract_version);
    }
    if (!own(request, 'operation') || !['create', 'update', 'validate'].includes(request.operation)) {
      return malformed(
        '$',
        'operation must be create, update, or validate',
        undefined,
        request.contract_version
      );
    }
    if (!own(request, 'artifact') || !isObject(request.artifact)) {
      return malformed(
        '$',
        'The request is missing the complete candidate artifact.',
        undefined,
        request.contract_version
      );
    }
    if (own(request, 'context')) {
      // Context is intentionally not consumed by the pure validator.  It is
      // accepted as structured input, but never authorizes external lookups.
      if (request.context !== null && typeof request.context !== 'object') {
        return malformed(
          '$',
          'context must be a structured JSON value',
          request.artifact,
          request.contract_version
        );
      }
    }
    const checks = own(request, 'checks') ? request.checks : DEFAULT_CHECKS;
    if (!Array.isArray(checks) || checks.some((check) => typeof check !== 'string')) {
      return malformed(
        '$',
        'checks must be an array of check-name strings',
        request.artifact,
        request.contract_version
      );
    }
    const requested = checks.slice();
    const coverage = {
      requested,
      completed: [],
      skipped: [],
      unsupported: [],
      unverified: [],
      failures: []
    };
    const diagnostics = [];
    const versions = versionsFor(request.artifact, request.contract_version);
    if (!requested.length) {
      coverage.skipped.push({ reason_code: 'MISSING_CHECK' });
      return result(diagnostics, coverage, versions);
    }

    const uniqueRequested = [];
    requested.forEach((check) => {
      if (!uniqueRequested.includes(check)) uniqueRequested.push(check);
    });
    const markDiagnosticOverflow = (check) => {
      if (!Object.prototype.hasOwnProperty.call(diagnostics, 'overflowedChecks')) {
        Object.defineProperty(diagnostics, 'overflowedChecks', {
          configurable: true,
          writable: true,
          value: []
        });
      }
      if (!diagnostics.overflowedChecks.includes(check)) {
        diagnostics.overflowedChecks.push(check);
      }
      Object.defineProperty(diagnostics, 'overflowed', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: true
      });
    };
    const mark = (bucket, check, reasonCode, path) => {
      const buckets = [
        coverage.completed,
        coverage.skipped,
        coverage.unsupported,
        coverage.unverified,
        coverage.failures
      ];
      buckets.forEach((entries) => {
        if (entries !== coverage.completed) {
          for (let i = entries.length - 1; i >= 0; i -= 1) {
            if (entries[i].check === check) entries.splice(i, 1);
          }
        }
      });
      for (let i = coverage.completed.length - 1; i >= 0; i -= 1) {
        if (coverage.completed[i] === check) coverage.completed.splice(i, 1);
      }
      if (bucket === 'completed') {
        coverage.completed.push(check);
      } else {
        coverage[bucket].push(coverageEntry(check, reasonCode, path));
      }
    };

    uniqueRequested.filter((check) => !SUPPORTED_CHECKS.has(check)).forEach((check) => {
      mark('unsupported', check, 'UNSUPPORTED_CHECK');
    });

    const requestedSupported = uniqueRequested.filter((check) => SUPPORTED_CHECKS.has(check));
    const declaredSchema = own(request, 'schema_version') ? request.schema_version : undefined;
    const artifactSchema = own(request.artifact, 'schema_version')
      ? request.artifact.schema_version : undefined;
    const requestedSchemaMismatch = declaredSchema !== undefined
      && artifactSchema !== undefined
      && (typeof declaredSchema !== 'string' || declaredSchema !== artifactSchema);
    const artifactSchemaUnsupported = artifactSchema !== undefined
      && (typeof artifactSchema !== 'string' || !KNOWN_SCHEMA_VERSIONS.has(artifactSchema));

    if (requestedSchemaMismatch || artifactSchemaUnsupported) {
      const reason = artifactSchemaUnsupported ? 'UNSUPPORTED_VERSION' : 'VERSION_MISMATCH';
      requestedSupported.forEach((check) => mark('skipped', check, reason));
      return result(diagnostics, coverage, versions);
    }

    const structural = uniqueRequested.includes('structural');
    const semantic = uniqueRequested.includes('semantic');
    let index;
    if (structural || semantic) {
      // The canonical v1 form examples omit Rails' transport defaults.  The
      // validator checks malformed supplied booleans, but never invents them.
      checkRoot(request.artifact, diagnostics, { allowEmptyElements: true });
      index = indexForm(request.artifact);
      if (structural) {
        const overflowedBefore = diagnostics.overflowed === true;
        checkElements(index, diagnostics, { requireCommonBooleans: false });
        mark('completed', 'structural');
        if (index.diagnosticOverflow || (!overflowedBefore && diagnostics.overflowed)) {
          markDiagnosticOverflow('structural');
        }
      }
      if (semantic) {
        const overflowedBefore = diagnostics.overflowed === true;
        if (isObject(request.artifact)) resolveReferences(request.artifact, index, diagnostics);
        mark('completed', 'semantic');
        if (index.diagnosticOverflow) {
          markDiagnosticOverflow('semantic');
        } else if (!overflowedBefore && diagnostics.overflowed) {
          markDiagnosticOverflow('semantic');
        }
      }
      if (index.tooDeep || index.cyclic || index.tooLarge) {
        if (structural) mark('failures', 'structural', 'INPUT_LIMIT_EXCEEDED', '/elements');
        if (semantic) mark('failures', 'semantic', 'INPUT_LIMIT_EXCEEDED', '/elements');
      }
      if (semantic && !index.tooDeep && !index.cyclic && !index.tooLarge
        && index.elements.some((entry) => entry.element.type === 'DynamicField')) {
        const dynamicPath = index.elements.find(
          (entry) => entry.element.type === 'DynamicField'
        ).path;
        mark('unverified', 'semantic', 'DYNAMIC_REFERENCE', dynamicPath);
        addWarning(
          diagnostics,
          'dynamic-reference',
          dynamicPath,
          'Dynamic field references could not be verified statically.'
        );
      }
    }

    if (uniqueRequested.includes('compatibility')) {
      if (request.operation !== 'update') {
        mark('unsupported', 'compatibility', 'UNSUPPORTED_CHECK');
      } else if (!own(request, 'previous_artifact') || !isObject(request.previous_artifact)) {
        mark('skipped', 'compatibility', 'CONTEXT_REQUIRED');
      } else {
        const overflowedBefore = diagnostics.overflowed === true;
        const compatibility = checkCompatibility(
          request.previous_artifact, request.artifact, diagnostics
        );
        if (compatibility.incomplete) {
          mark('failures', 'compatibility', 'INPUT_LIMIT_EXCEEDED', '/elements');
        } else {
          mark('completed', 'compatibility');
        }
        if (compatibility.diagnosticOverflow
          || (!overflowedBefore && diagnostics.overflowed)) {
          markDiagnosticOverflow('compatibility');
        }
      }
    }

    return result(diagnostics, coverage, versions);
  } catch (error) {
    return malformed(
      '$',
      'validation could not complete safely',
      isObject(request) ? request.artifact : undefined,
      isObject(request) && own(request, 'contract_version')
        ? request.contract_version : undefined
    );
  }
}

function result(rawDiagnostics, coverage, versions) {
  if (rawDiagnostics.overflowed) {
    const affectedChecks = Array.isArray(rawDiagnostics.overflowedChecks)
      ? rawDiagnostics.overflowedChecks
      : [];
    affectedChecks.forEach((check) => {
      for (let i = coverage.completed.length - 1; i >= 0; i -= 1) {
        if (coverage.completed[i] === check) coverage.completed.splice(i, 1);
      }
      if (!coverage.failures.some((entry) => (
        entry.check === check && entry.reason_code === 'INPUT_LIMIT_EXCEEDED'
      ))) {
        coverage.failures.push(coverageEntry(check, 'INPUT_LIMIT_EXCEEDED', '/elements'));
      }
    });
  }
  const diagnostics = sortDiagnostics(rawDiagnostics.map(toPublicDiagnostic))
    .slice(0, DIAGNOSTIC_LIMIT);
  const hasError = rawDiagnostics.hasError
    || rawDiagnostics.some((diagnostic) => diagnostic.severity === 'error');
  const unavailable = coverage.failures.length > 0;
  let outcome = 'valid';
  if (hasError) {
    outcome = 'invalid';
  } else if (unavailable) {
    outcome = 'unavailable';
  } else if (coverage.skipped.length || coverage.unsupported.length
    || coverage.unverified.length) {
    outcome = 'incomplete';
  }
  const order = new Map();
  coverage.requested.forEach((check, index) => {
    if (!order.has(check)) order.set(check, index);
  });
  const orderEntries = (entries) => entries.slice().sort((a, b) => {
    const left = order.has(a.check) ? order.get(a.check) : Number.MAX_SAFE_INTEGER;
    const right = order.has(b.check) ? order.get(b.check) : Number.MAX_SAFE_INTEGER;
    return left - right || a.check.localeCompare(b.check)
      || a.reason_code.localeCompare(b.reason_code);
  });
  const completed = coverage.completed.slice().sort((a, b) => (
    (order.has(a) ? order.get(a) : Number.MAX_SAFE_INTEGER)
      - (order.has(b) ? order.get(b) : Number.MAX_SAFE_INTEGER)
      || a.localeCompare(b)
  ));
  return {
    contract_version: CONTRACT_VERSION,
    outcome,
    diagnostics,
    coverage: {
      requested: coverage.requested.slice(),
      completed,
      skipped: orderEntries(coverage.skipped),
      unsupported: orderEntries(coverage.unsupported),
      unverified: orderEntries(coverage.unverified),
      failures: orderEntries(coverage.failures)
    },
    versions
  };
}

module.exports = { validateForm };
