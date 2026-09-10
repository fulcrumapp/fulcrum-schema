'use strict';

const { DIAGNOSTIC_LIMIT } = require('./limits');

const PACKAGE_VERSION = '3.9.1';
const VALIDATOR_VERSION = 'flcrm-22117-ruleset-1';
const CONTRACT_VERSION = 'pending-flcrm-22116';

const CHECKS = [
  'root-structure', 'element-structure', 'key-uniqueness', 'data-name-scope',
  'container-children', 'field-types', 'form-references', 'conditions',
  'type-specific', 'regex-syntax', 'compatibility', 'contextual-rails-checks',
  'schema-version', 'bounded-traversal', 'diagnostic-overflow'
];

// The coordinator's internal profile requests only checks this pure core can
// complete. Provisional and contextual checks remain visible in coverage but
// are not silently treated as completed requested work.
const PURE_REQUESTED_CHECKS = [
  'root-structure', 'element-structure', 'key-uniqueness',
  'container-children', 'field-types', 'form-references', 'conditions',
  'type-specific', 'schema-version', 'bounded-traversal', 'diagnostic-overflow'
];

function requestedChecks(operation) {
  return operation === 'update'
    ? PURE_REQUESTED_CHECKS.concat('compatibility')
    : PURE_REQUESTED_CHECKS.slice();
}

function makeResult(schemaVersion, diagnostics, coverage, unsupported) {
  const errors = diagnostics.hasError
    || diagnostics.some((diagnostic) => diagnostic.severity === 'error');
  const ordered = diagnostics.slice(0, DIAGNOSTIC_LIMIT);
  const truncated = diagnostics.length > DIAGNOSTIC_LIMIT || diagnostics.overflowed;
  const requested = coverage.requested || CHECKS;
  const completed = new Set(coverage.completed);
  const skipped = coverage.skipped || [];
  const unavailable = coverage.unsupported || [];
  const provisional = coverage.provisional || [];
  const requestedComplete = requested.every((check) => completed.has(check))
    && skipped.every((check) => !requested.includes(check))
    && unavailable.every((check) => !requested.includes(check))
    && provisional.every((check) => !requested.includes(check));
  const requestedUnsupported = unavailable.some(
    (check) => requested.includes(check)
  );
  // A valid result is a claim about the requested work, not merely an
  // absence of errors.  Any unrun, unavailable, provisional, or contextual
  // coverage must prevent that claim.  The coordinator reports contextual
  // gaps as incomplete; an explicitly unavailable requested check remains
  // unsupported.
  const complete = requestedComplete && !truncated
    && skipped.length === 0
    && unavailable.length === 0
    && provisional.length === 0;
  let outcome = 'incomplete';
  if (errors) outcome = 'invalid';
  else if (unsupported || requestedUnsupported) outcome = 'unsupported';
  else if (complete) outcome = 'valid';
  return {
    outcome,
    diagnostics: ordered,
    versions: {
      contract: CONTRACT_VERSION,
      validator: VALIDATOR_VERSION,
      package: PACKAGE_VERSION,
      schema: schemaVersion || 'unknown'
    },
    coverage: {
      complete,
      requested: requested.slice(),
      completed: coverage.completed.slice(),
      skipped: skipped.slice(),
      unsupported: unavailable.slice(),
      provisional: provisional.slice()
    }
  };
}

module.exports = {
  CHECKS,
  requestedChecks,
  makeResult
};
