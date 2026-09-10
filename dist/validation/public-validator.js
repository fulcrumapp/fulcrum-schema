'use strict';
/*
 * Public v1 adapter.  The rule implementation deliberately remains isolated
 * from the SQL schema-diff singleton; this module only reads caller data.
 */
const { indexForm, isObject } = require('./traversal');
const { checkRoot, checkElements, resolveReferences, add, addWarning } = require('./rules');
const { checkCompatibility } = require('./form-validator');
const { DIAGNOSTIC_LIMIT } = require('./limits');
const PACKAGE_VERSION = '3.9.1';
const RULESET_VERSION = 'flcrm-22117-ruleset-1';
const CONTRACT_VERSION = 'v1';
const DEFAULT_CHECKS = ['structural', 'semantic'];
const SUPPORTED_CHECKS = new Set(['structural', 'semantic', 'compatibility']);
const SEVERITIES = { error: 0, warning: 1, info: 2 };
function own(value, key) {
    return value !== null && typeof value === 'object'
        && Object.prototype.hasOwnProperty.call(value, key);
}
function pointerToPath(pointer) {
    if (pointer === '')
        return '$';
    const segments = pointer.split('/').slice(1).map((segment) => segment
        .replace(/~1/g, '/').replace(/~0/g, '~'));
    let result = '$';
    segments.forEach((segment) => {
        if (/^(0|[1-9][0-9]*)$/.test(segment))
            result += `[${segment}]`;
        else if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(segment))
            result += `.${segment}`;
        else
            result += `[${JSON.stringify(segment)}]`;
    });
    return result;
}
function normalizePath(path) {
    return pointerToPath(typeof path === 'string' ? path : '');
}
function codeFor(code) {
    if (typeof code !== 'string')
        return 'VALIDATION.INVALID_DIAGNOSTIC';
    if (code.indexOf('.') >= 0)
        return code;
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
    if (typeof message !== 'string')
        return 'Validation failed.';
    return message.length <= 300 ? message : `${message.slice(0, 297)}...`;
}
function toPublicDiagnostic(diagnostic) {
    const message = diagnostic.code === 'duplicate-data-name'
        ? 'The data name is already used in this scope.'
        : safeMessage(diagnostic.message);
    const result = {
        code: codeFor(diagnostic.code),
        severity: diagnostic.severity === 'warning' ? 'warning' : 'error',
        message,
        path: normalizePath(diagnostic.path)
    };
    if (typeof diagnostic.fix === 'string' && diagnostic.fix.length <= 300) {
        result.fix = diagnostic.fix;
    }
    else {
        const fix = fixFor(diagnostic.code);
        if (fix)
            result.fix = fix;
    }
    if (diagnostic.range && isObject(diagnostic.range))
        result.range = diagnostic.range;
    return result;
}
function sortDiagnostics(diagnostics) {
    return diagnostics.slice().sort((a, b) => {
        const path = a.path.localeCompare(b.path);
        if (path)
            return path;
        const ar = a.range && a.range.start ? a.range.start : { line: 0, column: 0 };
        const br = b.range && b.range.start ? b.range.start : { line: 0, column: 0 };
        const line = (ar.line || 0) - (br.line || 0);
        if (line)
            return line;
        const column = (ar.column || 0) - (br.column || 0);
        if (column)
            return column;
        const severity = SEVERITIES[a.severity] - SEVERITIES[b.severity];
        if (severity)
            return severity;
        const code = a.code.localeCompare(b.code);
        return code || a.message.localeCompare(b.message);
    });
}
function coverageEntry(check, reasonCode, path) {
    const entry = { check, reason_code: reasonCode };
    if (typeof path === 'string')
        entry.path = normalizePath(path);
    return entry;
}
function versionValue(value) {
    return typeof value === 'string' && value.length <= 128 && value.length > 0
        ? value : 'unknown';
}
function malformed(path, message) {
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
        versions: {
            validator: `@fulcrumapp/fulcrum-schema@${PACKAGE_VERSION}/${RULESET_VERSION}`,
            schema: 'unknown',
            runtime: 'unknown'
        }
    };
}
function validateForm(request) {
    try {
        if (!isObject(request))
            return malformed('$', 'request must be a JSON object');
        if (request.contract_version !== CONTRACT_VERSION) {
            return malformed('$.contract_version', 'contract_version must be "v1"');
        }
        if (request.artifact_type !== 'form') {
            return malformed('$.artifact_type', 'artifact_type must be "form"');
        }
        if (!['create', 'update', 'validate'].includes(request.operation)) {
            return malformed('$.operation', 'operation must be create, update, or validate');
        }
        if (!own(request, 'artifact') || !isObject(request.artifact)) {
            return malformed('$.artifact', 'artifact must be a complete form object');
        }
        if (own(request, 'context')) {
            // Context is intentionally not consumed by the pure validator.  It is
            // accepted as structured input, but never authorizes external lookups.
            if (request.context !== null && typeof request.context !== 'object') {
                return malformed('$.context', 'context must be a structured JSON value');
            }
        }
        const checks = own(request, 'checks') ? request.checks : DEFAULT_CHECKS;
        if (!Array.isArray(checks) || checks.some((check) => typeof check !== 'string')) {
            return malformed('$.checks', 'checks must be an array of check-name strings');
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
        const schema = versionValue(own(request, 'schema_version')
            ? request.schema_version : request.artifact.schema_version);
        const runtime = versionValue(request.runtime_version);
        const versions = {
            validator: `@fulcrumapp/fulcrum-schema@${PACKAGE_VERSION}/${RULESET_VERSION}`,
            schema,
            runtime
        };
        if (!requested.length) {
            coverage.skipped.push(coverageEntry('validation', 'MISSING_CHECK'));
            return result(diagnostics, coverage, versions);
        }
        if (typeof request.schema_version === 'string'
            && typeof request.artifact.schema_version === 'string'
            && request.schema_version !== request.artifact.schema_version) {
            requested.forEach((check) => {
                if (SUPPORTED_CHECKS.has(check)) {
                    coverage.skipped.push(coverageEntry(check, 'VERSION_MISMATCH'));
                }
            });
        }
        const uniqueRequested = [];
        requested.forEach((check) => {
            if (!uniqueRequested.includes(check))
                uniqueRequested.push(check);
        });
        uniqueRequested.forEach((check) => {
            if (!SUPPORTED_CHECKS.has(check)) {
                coverage.unsupported.push(coverageEntry(check, 'UNSUPPORTED_CHECK'));
            }
        });
        const structural = uniqueRequested.includes('structural');
        const semantic = uniqueRequested.includes('semantic');
        if (structural || semantic) {
            // The canonical v1 form examples omit Rails' transport defaults.  The
            // validator checks malformed supplied booleans, but never invents them.
            checkRoot(request.artifact, diagnostics);
            const index = indexForm(request.artifact);
            if (structural) {
                checkElements(index, diagnostics, { requireCommonBooleans: false });
                coverage.completed.push('structural');
            }
            if (semantic) {
                if (isObject(request.artifact))
                    resolveReferences(request.artifact, index, diagnostics);
                coverage.completed.push('semantic');
            }
            if (index.tooDeep || index.cyclic || index.tooLarge) {
                coverage.skipped.push(coverageEntry(structural ? 'structural' : 'semantic', 'INPUT_LIMIT_EXCEEDED', '/elements'));
            }
            if (index.elements.some((entry) => entry.element.type === 'DynamicField')
                && semantic) {
                const dynamicPath = index.elements.find((entry) => entry.element.type === 'DynamicField').path;
                coverage.unverified.push(coverageEntry('semantic', 'DYNAMIC_REFERENCE', dynamicPath));
                addWarning(diagnostics, 'dynamic-reference', dynamicPath, 'Dynamic field references could not be verified statically.');
            }
        }
        if (uniqueRequested.includes('compatibility')) {
            if (request.operation !== 'update') {
                coverage.unsupported.push(coverageEntry('compatibility', 'UNSUPPORTED_CHECK'));
            }
            else if (!own(request, 'previous_artifact') || !isObject(request.previous_artifact)) {
                coverage.skipped.push(coverageEntry('compatibility', 'CONTEXT_REQUIRED'));
            }
            else {
                checkCompatibility(request.previous_artifact, request.artifact, diagnostics);
                coverage.completed.push('compatibility');
            }
        }
        return result(diagnostics, coverage, versions);
    }
    catch (error) {
        return malformed('$', 'validation could not complete safely');
    }
}
function result(rawDiagnostics, coverage, versions) {
    if (rawDiagnostics.overflowed) {
        coverage.requested.forEach((check) => {
            if (!coverage.skipped.some((entry) => entry.check === check)) {
                coverage.skipped.push(coverageEntry(check, 'INPUT_LIMIT_EXCEEDED'));
            }
        });
    }
    const diagnostics = sortDiagnostics(rawDiagnostics.map(toPublicDiagnostic))
        .slice(0, DIAGNOSTIC_LIMIT);
    const hasError = diagnostics.some((diagnostic) => diagnostic.severity === 'error');
    const unavailable = coverage.failures.length > 0;
    let outcome = 'valid';
    if (unavailable)
        outcome = 'unavailable';
    else if (coverage.skipped.length || coverage.unsupported.length
        || coverage.unverified.length)
        outcome = 'incomplete';
    else if (hasError)
        outcome = 'invalid';
    return {
        contract_version: CONTRACT_VERSION,
        outcome,
        diagnostics,
        coverage: {
            requested: coverage.requested.slice(),
            completed: coverage.completed.slice(),
            skipped: coverage.skipped.slice(),
            unsupported: coverage.unsupported.slice(),
            unverified: coverage.unverified.slice(),
            failures: coverage.failures.slice()
        },
        versions
    };
}
module.exports = { validateForm };
//# sourceMappingURL=public-validator.js.map