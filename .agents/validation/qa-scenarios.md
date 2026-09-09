# QA Scenarios: FLCRM-22117 Pure Form-Schema Validation

## 1. Purity and Determinism

1. Deep-freeze complete create input; validate; assert no exception from attempted writes and exact deep equality afterward.
2. Deep-freeze update patch and previous form; validate; assert neither changed and no parent pointers/defaults/sanitized arrays were introduced.
3. Run identical input at least three times; assert byte-equivalent serialized result and deterministic diagnostic/coverage ordering.
4. Seed existing singleton compare configuration, invoke validation, and compare again; assert singleton state and SQL output are unchanged.
5. Spy on console logging, schema constructors, `sqldiff`, filesystem/network/process APIs, dynamic imports, and execution primitives; assert none are called.
6. Put JavaScript, EJS, SQL, import syntax, and secret-like strings in supported string properties; assert they remain inert and are not echoed wholesale in diagnostics.

## 2. Create and Update Semantics

1. Validate a minimal complete create form and a create missing each required root property.
2. Update only `name` with `elements` omitted; assert previous elements are validated as part of the effective candidate.
3. For each of `false`, `0`, `null`, `""`, `{}`, and `[]`, compare explicit presence with omission and assert different effective values/results.
4. Replace `elements`, `status_field`, and another object/array at the top level; assert replacement rather than recursive merge.
5. Submit update without `previous_form`; assert incomplete/malformed result and absent compatibility success.
6. Assert previous and effective candidates use only own properties and do not trust prototype-inherited values.

## 3. Root, Elements, and Limits

1. Non-object/cyclic root, blank name, absent/non-array/empty elements.
2. Non-object element; unknown type; missing/blank key, label, or required data name.
3. Missing and non-boolean `disabled`, `hidden`, `required`, including explicit false as valid.
4. Duplicate keys at siblings, through Sections, and across repeatable branches; assert global collision.
5. Section/Repeatable children absent, non-array, or empty; deeply nested valid structure.
6. Exactly 1,400 flattened elements and 1,401 elements; assert the boundary and bounded processing.
7. Nesting at and beyond the approved depth; assert deterministic bounded handling.
8. More violations than the approved diagnostic cap; assert deterministic truncation and incomplete coverage.

## 4. Data-Name Scopes

1. Duplicate data names among root siblings and across a transparent Section; assert collision.
2. Duplicate names within one repeatable, including through nested Sections; assert collision.
3. Same name at root and inside a repeatable, and in sibling/nested repeatable scopes; assert behavior matches approved scope policy.
4. Exercise case, whitespace, punctuation, underscore/system prefixes, and reserved names; keep expected outcomes blocked until owner policy is approved.
5. Confirm `Section` and `Label` do not require data names and only data-producing elements participate according to the approved matrix.

## 5. Type-Specific Rules

1. Inline ChoiceField: missing/non-array/empty choices, non-object choice, blank label, and valid false/zero values where allowed.
2. ClassificationField and RecordLinkField: local identifier/flag shape passes or fails as specified; existence/access always reports contextual coverage and performs no lookup.
3. YesNoField: boolean neutral flag, required positive/negative/conditional neutral choices, and valid/invalid default.
4. TextField: numeric flag, format enum, integer/float/zero min/max, wrong types, and min/max boundaries.
5. CalculatedField: expression type, display object/style, and currency requirement; expression is never compiled.
6. DateTimeField/TimeField: omitted, null/blank, `now`, and invalid defaults.
7. Applicable min/max lengths: integers, zero, negative, wrong type, equal bounds, and min greater than max.
8. Status/status field: active/inactive, enabled/disabled, required shape, choice labels/colors, and default membership without default mutation.
9. Geometry: omitted/null/empty/valid/invalid/non-array for form and repeatable; assert no defaulting/normalization.
10. Feature flags, `style_mapnik`, field effects, hyperlink URL type, AI prompt length boundaries, and Sketch backgrounds array shape.
11. Pattern: type check only; assert Ruby-specific syntax is not claimed complete or evaluated unless a bounded parity strategy is approved.

## 6. Reference and Scope Rules

1. Valid and missing `record_title_key`; valid array, non-array, mixed-type, and unresolved `title_field_keys`.
2. Repeatable `title_field_key` resolving to direct child, child through Section, outside/sibling/deeper repeatable, and missing key.
3. Conditions with missing field key, unknown key, self-reference, blacklisted target type, root/ancestor/current/sibling/deeper repeatable targets.
4. `@status` target and target-type-specific allowed/disallowed operators.
5. `is_empty`/`is_not_empty` with blank versus nonblank values.
6. Condition arrays/types/behaviors malformed or invalid.
7. Photo FastFill targets in exact scope, ancestor, descendant, sibling repeatable, unknown name, and blacklisted type.

## 7. Previous/New Compatibility

1. Existing leaf key retains type; no compatibility error.
2. Existing leaf key changes type at same or moved path; deterministic compatibility error includes safe previous/new locations.
3. Leaf addition and removal; no type-change error.
4. Container key changes and leaf/container reuse; assert behavior matches the documented initial Rails subset and coverage identifies any unsupported extension.
5. Duplicate keys in either previous/effective candidate; structural diagnostics prevent misleading compatibility success.
6. Assert no SQL/schema generator/differ is loaded or called.

## 8. Diagnostics, Versions, and Coverage

1. Every diagnostic has an approved stable code, severity, RFC 6901-escaped path, bounded actionable message, and optional safe fix/range.
2. Diagnostics sort by path then fixed rule/code order, independent of object key insertion order.
3. Fully covered/no-error result is valid; error result is invalid; skipped/contextual/provisional result is incomplete or unsupported.
4. Coverage lists requested/completed/skipped/unsupported/provisional checks without overlap inconsistent with the approved contract.
5. Versions identify approved contract, ruleset/validator, package, and declared schema; unknown schema is unsupported/incomplete.
6. Contextual identifiers produce local shape results plus explicit requires-context coverage, not false existence success.
7. Messages never include full form JSON, full scripts, credentials, tokens, or candidate secret values.
8. A result is `valid` only when every check in the internal requested pure-check profile completed; requested omissions are `incomplete`, unavailable requested checks are `unsupported`, and completed-rule errors are `invalid`. Provisional/contextual checks remain explicit but are not silently counted as completed.

## 9. Build, Compatibility, and Release

1. Run `yarn lint`, focused tests, and full `yarn test`.
2. Run `yarn build`; inspect declaration output and load `dist/fulcrum-schema.js` via CommonJS.
3. Run existing PostgreSQL, SQLite, and v2-to-v6 fixtures unchanged and compare expected SQL.
4. Browserify the distribution and smoke test the approved validation export after the contract gate.
5. Run `openspec validate flcrm-22117-pure-form-schema-validation --strict`.
6. Inspect git diff for only planned source/tests/docs/OpenSpec/generated artifacts according to repository policy.
7. Assert `package.json` version is unchanged and no tag, npm publish, schema-service route, app-mcp adapter, deployment, or consumer change occurred.

## Audit verification (2026-09-09)

- Rails source revision `25503ce61df71e9932c2ecef4bde348780afb15d` reports 24
  `Form::TYPES`; the internal profile contains 24 types and rejects `ProjectField`.
- Focused pure-validation suite: 38 passing.
- `yarn lint`, `tsc --noEmit`, `yarn build`, and strict OpenSpec validation: PASS.
- `npm pack --dry-run --json --ignore-scripts`: 172 files; no `.agents/`,
  `openspec/`, `src/validation/`, or packaged validation paths.
- CommonJS public-gate/deep-import smoke: PASS; no public validation export.
- Full suite: 48 passing, 14 failing. The unchanged baseline suite is 10 passing,
  14 failing; all 14 failures are pre-existing SQL fixture/runtime assertions.
- No SQL/schema diff source or fixture was changed; package version remains 3.9.1.

## Remaining audit blocker verification (2026-09-09)

- Result orchestration: `valid` requires a complete requested pure profile
  and no skipped, unsupported, provisional, or contextual coverage. A
  minimal input-only result is `incomplete`; completed-rule errors remain
  `invalid`, missing requested checks are `incomplete`, and unavailable
  requested checks are `unsupported`. Contextual checks are never counted as
  completed.
- ChoiceField: `choice_list_id` branch selection mirrors Ruby truthiness
  (`nil`/`false` are false; empty/whitespace strings and zero are true), so
  inline choices are checked only when Rails would take the inline branch.
- Lengths: optional `min_length`/`max_length` skip only nil/false; blank and
  whitespace strings are rejected as non-integers, while zero is validated
  (`min_length: 0` allowed and `max_length: 0` rejected).
- SketchField: `backgrounds: null` is accepted; every non-null value must be an
  array, and array members are not inspected by the pure validator.
