## Context

See `proposal.md` for motivation and `specs/pure-form-schema-validation/spec.md` for behavior. The package is `@fulcrumapp/fulcrum-schema` 3.9.1: JavaScript source under `src/`, compiled by TypeScript 4.8 with `allowJs`, CommonJS output/declarations under `dist/`, and a browserified main module. `src/fulcrum-schema.js` exports one mutable singleton whose existing methods generate SQL through `sqldiff`; validation must not enter that path or mutate singleton configuration. Tests are Mocha and currently cover SQL dialect/version migrations.

The authoritative source re-inspected on 2026-09-09 is `fulcrumapp/fulcrum` revision `25503ce61df71e9932c2ecef4bde348780afb15d`, especially `app/models/validators/form.rb`, its `form/*` mixins, `app/models/form.rb`, `app/classes/form/*`, and validator specs. The evidence manifest is `.agents/validation/rails-source-evidence.json`. That Rails validator mixes deterministic rules with authorization, database lookups, logging, mutation/defaulting, and schema execution in its callers. This package must reproduce only an explicit pure subset.

FLCRM-22116 blocks the final shared public API. Comment 205323 proposes, but does not approve, an operation-aware request carrying a form and optional previous form, structured diagnostics, version/coverage metadata, and explicit contextual omissions. The following API shape is therefore a review aid, not an approved contract.

## Goals / Non-Goals

**Goals:**

- Isolate validation in stateless modules that consume JSON-compatible values and return data only.
- Provide a documented parity matrix distinguishing confirmed Rails facts, ticket-directed additions, and unsupported/contextual behavior.
- Preserve partial-update and falsy-value semantics without normalization.
- Produce deterministic diagnostics and coverage suitable for adaptation to the approved shared v1 contract.
- Keep SQL schema comparison behavior unchanged.

**Non-Goals:**

- Schema-service routes, authentication, authorization, account context, app-mcp adapters, Rails changes, or consumer rollout.
- Executing or compiling scripts/templates/calculations, resolving imports, generating/executing SQL, persistence, network/filesystem access, or logging payloads.
- Perfect parity with every Rails behavior, especially mutation/defaulting and contextual checks.
- npm publication, package versioning, tagging, or deployment.
- Record-value validation, data-event semantic validation, report validation, or general-purpose JSON Schema validation.

## Decisions

### 1. Separate the validator core from the existing SQL singleton

Create focused modules such as `src/validation/form-validator.js`, `src/validation/traversal.js`, `src/validation/rules.js`, and `src/validation/result.js`. They must not import `src/schema.js`, `sqldiff`, SQL generators, filesystem/network modules, or the mutable singleton. Pure functions receive all state as arguments and allocate fresh result data.

After FLCRM-22116 approval, expose one adapter from `src/fulcrum-schema.js` using the approved name. Do not add validator state to the singleton. Until then, omit a validation directory index and exclude `src/validation/` from compiled package artifacts so neither a public export nor a package deep import is available.

### 2. Provisional public API and gate

The strawman API, derived directly from FLCRM-22115 comment 205323, is:

```js
// PROVISIONAL — names and envelope MUST NOT be finalized/exported
// until FLCRM-22116 approves the shared v1 contract.
validateForm({
  operation: 'create' | 'update',
  form: formOrPatch,
  previous_form: previousForm // required for update
}) => validationResult
```

The minimum result semantics are:

```js
// PROVISIONAL semantic sketch, not an approved wire format.
{
  outcome: 'valid' | 'invalid' | 'incomplete' | 'unsupported',
  diagnostics: [{
    code: 'stable-approved-code',
    severity: 'error' | 'warning' | 'info',
    path: '/elements/0/key',       // RFC 6901
    range: undefined,              // only if upstream supplied one
    message: 'actionable text',
    fix: undefined                 // optional, never contains sensitive data
  }],
  versions: {
    contract: 'approved-v1',
    validator: 'concrete-ruleset-version',
    package: 'concrete-package-version',
    schema: 'declared-form-schema-version'
  },
  coverage: {
    complete: true | false,
    requested: [],
    completed: [],
    skipped: [],
    unsupported: [],
    provisional: []
  }
}
```

Only semantics explicitly required by Jira are fixed: stable codes; three severities; JSON path; optional range; actionable message/fix; concrete versions; requested/completed/skipped/unsupported coverage; and distinction among valid, invalid, incomplete, and unsupported. The internal requested-check profile contains only checks that this pure core can complete (plus compatibility for updates); provisional and contextual checks remain explicit in coverage without making a result claim that they completed. An outcome is valid only when every requested check completed without errors. Exact casing, field names, check IDs, code taxonomy, `range` format, aggregation rules, package export name, exception behavior, and schema-version selection are unresolved contract questions. The implementation task must re-read the approved FLCRM-22116 artifact and update specs before exporting.

### 3. Materialize updates by presence, not truthiness

The internal core should first validate the request mode, then create an effective candidate:

- `create`: `form` is the complete candidate.
- `update`: `previous_form` is required; copy its top-level own properties, then replace only properties that are own properties of the patch.
- A present object/array replaces that top-level property; no recursive merge is inferred.
- Omitted is distinct from present `null`, `false`, `0`, `""`, `{}`, and `[]`.
- Neither source object is modified.

This matches Rails `FormUtils.update_form` treating supplied model attributes as top-level replacements while avoiding the current validator's risk of treating a partial `attrs` hash as a complete form. A recursive merge was rejected because it can invent server semantics for serialized fields and make deletion ambiguous. This merge rule is itself provisional until shared-contract approval; fixtures should lock it only after that review.

### 4. Traverse iteratively and index once

Build an immutable internal index in deterministic preorder with:

- JSON Pointer path, element key/type/data name, parent container, nearest/root repeatable, and storage scope;
- global key map;
- per-storage-scope data-name map;
- candidate lookup sets for titles, conditions, and FastFill;
- previous/effective leaf-key maps for compatibility.

Use iterative traversal with cycle detection, depth and element caps, and own-property checks. Sections preserve their parent storage scope; each repeatable's children use a child scope. Rule evaluation order is fixed, then final diagnostics are sorted by path and rule/code order. Construct JSON Pointer segments only from bounded primitive strings or nonnegative safe-integer indexes; unsupported segments use a fixed safe marker and never invoke caller-defined coercion.

### 5. Implement an explicit parity/coverage registry

Each rule has a stable internal ID, category, applicability, source citation, support state, and version introduction. Coverage derives from this registry rather than hand-built booleans. Unsupported checks are data, not silent omissions.

**Confirmed deterministic Rails facts selected for the initial pure subset:**

| Area | Confirmed behavior/source |
|---|---|
| Root | Nonblank `name`; `elements` array/nonempty unless Rails option allows empty; flattened maximum 1,400. |
| Common element | Element object; key required and globally unique; label required; `data_name` required except `Section`/`Label`; type in the 24-value `Form::TYPES`; `disabled`, `hidden`, `required` booleans. |
| Containers | `Section`/`Repeatable.elements` is a nonempty array; recursive validation; repeatable title key resolves within descendants; explicit repeatable geometry is an array of six known geometry values. |
| Form references | `record_title_key` and each string in `title_field_keys` resolve against every flattened element key, including containers; repeatable `title_field_key` uses Rails' narrower section-only flattening. |
| Conditions | `required_conditions`/`visible_conditions` arrays; type is `any|all`; behavior is `clear|preserve`; only `field_key` identifies a target; self, blacklisted types, sibling/deeper repeatable targets are rejected; `@status` is allowed; operators use Rails names `equal_to`, `not_equal_to`, `contains`, `starts_with`, `greater_than`, `less_than`, `is_empty`, and `is_not_empty` according to target type. |
| Form status/geometry | Status is `active|inactive`; enabled status-field requires label/data name/default/choice array, valid default, labels, six-digit hex colors; explicit geometry array members use the six confirmed values. |
| Basic attributes | Explicit feature flags are booleans; `style_mapnik` is string or null/omitted; form-level `field_effects.effects` entries have required event/conditions/actions shape. |
| Field-specific | ChoiceField uses `choice_list_id` or inline choices; ClassificationField ID presence; RecordLinkField `form_id` shape and at least one of `allow_creating_records`/`allow_existing_records`; YesNo choices/default; numeric Text min/max accept finite negative or positive integers/floats; Hyperlink validates `default_url`; Calculated display styles are `text|number|date|currency` and currency style requires a code; DateTime/Time default blank or `now`; applicable integer lengths/bounds; `ai_prompt` must be a string and is limited to 10,000 characters for PhotoField and 150 otherwise without coercion; Sketch backgrounds array shape; Photo FastFill resolves newline-delimited `ai_prompt` data names in the exact repeatable scope. `ProjectField` is rejected because it is absent from `Form::TYPES`. |
| Update compatibility | Existing leaf key cannot change field type; additions/removals are not rejected by that Rails rule. |

Where Rails coerces keys, booleans, geometry, colors, or backgrounds, the pure implementation validates against a local copy or emits a diagnostic but never returns mutated input. Error text need not clone Rails prose; behavior and fixtures establish parity.

**Ticket-directed but not confirmed in the inspected Rails validator:**

- Data-name uniqueness by storage scope. The proposed scope is root/repeatable table scope, with sections transparent and nested repeatables independent. Confirm source/owner expectations and reserved/system-name policy before public export.
- A common versioned diagnostic/coverage envelope. It comes from FLCRM-22115/22116, not Rails.
- Explicit merge semantics for update patches. Rails call paths show top-level partial attribute updates, but the existing validator itself assumes form structure in ways that need parity fixtures.

**Uncertain, contextual, mutating, or deliberately unsupported in the pure package:**

| Rails behavior | Pure-package treatment |
|---|---|
| Parent-form access | `requires-context`; no lookup. |
| Repeatable, video, record-link, script, project, assignment and FastFill entitlements | `requires-context`; local shape only. |
| Classification set, choice list, and record-link form existence/access | `requires-context`; identifier shape/presence only. |
| Attachment existence and sketch-background sanitization/logging | Unsupported; array shape only, no sanitization or logging. |
| Map-engine geometry normalization/defaulting | Unsupported normalization; validate only explicit values and preserve omission. |
| Status color/default and boolean coercion | No mutation; report explicit issues or fix guidance. |
| Ruby `Regexp` compilation | Pattern type can be checked, but syntax parity is provisional/unsupported until a bounded Ruby-compatible strategy is approved. Never evaluate a pattern against data. |
| Rails model callbacks/current persisted object beyond supplied previous form | Unsupported; no hidden state. |
| SQL schema generation/execution and save side effects | Forbidden. |

### 6. Treat coverage as part of validity

A result is `invalid` when any completed rule yields an error. It is `unsupported` when the declared schema version cannot be evaluated and `incomplete` when bounded production diagnostics truncate evaluation. Otherwise, successful input-only validation is `valid`; unsupported contextual and provisional checks remain explicit in coverage and keep `coverage.complete` false without misclassifying the supplied input.

Diagnostic order must not depend on object hash order except where the form array order defines paths. Use RFC 6901 escaping for `~` and `/`. Messages identify values only when safe and bounded; never include full submitted scripts, form payloads, credentials, or secret-like text.

### 7. Bound work without new dependencies

Use the confirmed 1,400-element limit and the Rails API parser's observed maximum JSON nesting of 100 as initial safety bounds. Add cycle detection for direct JavaScript callers and a deterministic diagnostic cap selected during contract approval. Keep that cap in one limits module shared by diagnostic production and result truncation. Traversal and reference indexing should be O(elements + references); avoid repeated whole-tree scans. Do not add a regex engine or schema dependency during the initial implementation unless parity evidence and dependency review justify it.

### 8. Test against parity tables and side-effect sentinels

Add compact JSON fixtures representing valid forms and one concern per adversarial delta. Each fixture records expected pure diagnostics and coverage plus a Rails source citation/commit. Include a small set of outputs captured from authoritative Rails specs where behavior is deterministic; contextual cases assert `unsupported`, not fake parity.

Tests spy/stub forbidden modules (`sqldiff`/schema constructors and console logging), deep-freeze and snapshot both inputs, repeat calls, exercise CommonJS and declaration consumers, and run all existing SQL fixture tests unchanged.

## Risks / Trade-offs

- **[Shared contract changes after implementation begins]** → Keep the core unexported and result construction behind one adapter; block export/docs until FLCRM-22116 approval and update artifacts first.
- **[Rails validator mutates and depends on ActiveSupport truthiness]** → Specify presence-based pure semantics, document intentional differences, and use falsy/null/omission parity fixtures.
- **[False claim of Rails parity]** → Version the ruleset, cite source paths/commit in fixtures, and expose completed/unsupported/provisional coverage.
- **[Data-name scope is not confirmed in `Validators::Form`]** → Mark provisional and require owner/source confirmation before export.
- **[Ruby/JavaScript regex mismatch or ReDoS]** → Do not claim syntax parity or evaluate untrusted patterns without a bounded compatible parser.
- **[Deep/cyclic input exhausts stack or memory]** → Iterative traversal, cycle/depth/element/diagnostic limits, and adversarial tests.
- **[Validation accidentally invokes SQL or changes singleton state]** → Module-boundary isolation, forbidden-call spies, and existing diff non-regression tests.
- **[Overly broad scope duplicates Rails/context adapters]** → Keep all authorization, entitlement, resource, route, MCP, and persistence logic out of this package.
- **[Generated `dist/` creates review noise or stale artifacts]** → Follow existing repository release convention confirmed by maintainers; verify build output, but do not publish or version-bump. If generated artifacts are tracked, include only reproducible output in the approved PR.

## Migration Plan

1. Approve this specification and the single-PR publication strategy.
2. Implement/test the internal pure core and parity registry without a public export.
3. Obtain FLCRM-22116 approval for request/result names, outcome/coverage enums, versions, diagnostic codes/ranges, limits, and update semantics.
4. Update OpenSpec and `.agents/specs/active-spec.md` to the approved contract before adding the export and public documentation.
5. Run lint, full existing tests, new tests, declaration compilation, CommonJS load smoke test, browserify build, and OpenSpec validation.
6. Create one reviewed PR. Do not publish, tag, bump the package version, deploy schema-service, or change consumers.

Rollback is removal/revert of the new validator modules/export/docs/tests. There is no database migration, persistence change, write-path enforcement, or package publication to reverse.

## Open Questions

These are hard approval gates, not implementation guesses:

1. What exact shared v1 package method, request/result property names, outcome enums, diagnostic code registry, range representation, and coverage check IDs will FLCRM-22116 approve?
2. Is the proposed top-level replacement merge for `update` approved, and must `previous_form` always be required or only when a patch/compatibility check is requested?
3. Which form `schema_version` values and Rails source revision identify the first supported ruleset, and what is the unsupported-version behavior?
4. What are the authoritative data-name scope, normalization, case-sensitivity, and reserved/system-name rules? They were not found in the inspected Rails form validator.
5. Are Ruby-regex syntax checks intentionally excluded from v1, or is a bounded compatible parser required?
6. What diagnostic/output cap and malformed-input behavior (structured return versus throw) does the shared contract require?
7. Does the repository expect generated `dist/` artifacts in the PR, or only source with CI build evidence?
