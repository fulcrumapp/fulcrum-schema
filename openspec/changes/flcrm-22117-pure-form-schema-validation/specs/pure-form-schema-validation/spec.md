## Purpose

Provide deterministic, side-effect-free semantic validation of unsaved Fulcrum form definitions while reporting exactly which pure checks were and were not performed.

## ADDED Requirements

### Approved v1 contract addendum

The FLCRM-22116 shared contract is approved for this change. The package
SHALL export `validateForm(request)` from its package root. The request SHALL
use `contract_version: "v1"`, `artifact_type: "form"`, `operation` of
`create`, `update`, or `validate`, and a complete `artifact`. The optional
`previous_artifact` is required only when update compatibility is requested;
it is never merged into or used to materialize the candidate. Public results
SHALL contain exactly the v1 top-level fields `contract_version`, `outcome`,
`diagnostics`, `coverage`, and `versions`; coverage SHALL contain
`requested`, `completed`, `skipped`, `unsupported`, `unverified`, and
`failures`, and versions SHALL contain `validator`, `schema`, and `runtime`.
Public diagnostics SHALL use `FORM.*` or `VALIDATION.*` codes and
JSONPath-like paths. Outcome precedence is invalid, unavailable, incomplete,
then valid. Non-applicable or unobserved version values are `null`; caller
declared versions are not copied into response metadata. Operational failures
are coverage facts, not error diagnostics. The package version remains 3.9.1
and publication is not part of this change.

### Requirement: Approved shared contract
The package SHALL export the approved FLCRM-22116 v1 request, result,
diagnostic, coverage, and version contract and SHALL NOT introduce
route-specific aliases or a competing envelope.

#### Scenario: Contract has not been approved
- **WHEN** implementation reaches the package export or consumer-facing documentation step while FLCRM-22116 remains unapproved
- **THEN** that step remains blocked and the planning/PR evidence identifies the unresolved contract fields

#### Scenario: Contract is approved
- **WHEN** the shared contract owner supplies the approved v1 contract
- **THEN** the package maps the pure validator to that contract without changing the agreed semantics or adding a repository-specific competing envelope

### Requirement: Explicit create and update semantics
The validator SHALL validate `artifact` as the complete candidate for create,
update, and validate operations. For an update, `previous_artifact` SHALL be
required only when compatibility checks are requested and SHALL be compared
without merging, materializing, or mutating either artifact. Explicit
`null`, `false`, zero, empty strings, objects, arrays, and omissions SHALL
remain distinct input values.

#### Scenario: Complete create candidate
- **WHEN** a create operation supplies a complete JSON-compatible form
- **THEN** the validator validates that candidate without reading external state

#### Scenario: Update validates the complete candidate
- **WHEN** an update artifact omits a required property
- **THEN** the validator reports the omission on the candidate rather than
  copying it from `previous_artifact`

#### Scenario: Update lacks previous form
- **WHEN** an update operation does not supply the previous form needed for merge or compatibility
- **THEN** the result is explicitly incomplete or malformed, never a misleading valid result

### Requirement: Non-mutating deterministic validation
For the same JSON-compatible input and validator/ruleset version, validation SHALL return deeply equal results and SHALL NOT mutate either current or previous input. Validation SHALL perform no network or filesystem I/O, logging, persistence, SQL generation or execution, clock/random access, import resolution, or execution/compilation of submitted scripts, templates, calculations, or other user content.

#### Scenario: Frozen input
- **WHEN** deeply frozen current and previous forms are validated
- **THEN** validation completes without attempting mutation and both inputs remain deeply equal to their pre-validation snapshots

#### Scenario: Repeated invocation
- **WHEN** the same input is validated repeatedly
- **THEN** diagnostics, ordering, coverage, outcome, and version metadata are identical

#### Scenario: Submitted executable content
- **WHEN** a form includes script, expression, template-like, SQL-like, or import-like strings
- **THEN** validation treats them as inert data and neither executes nor resolves them

### Requirement: Structural form and element validation
The supported pure rules SHALL validate the confirmed Rails structural subset: nonblank form name; `elements` as a nonempty array for a create/effective form; no more than 1,400 flattened elements; every element as an object; globally unique, nonblank keys; nonblank labels; required `data_name` except on `Section` and `Label`; one of the confirmed form element types; explicit boolean `disabled`, `hidden`, and `required`; and nonempty element arrays for `Section` and `Repeatable`.

#### Scenario: Malformed root
- **WHEN** the candidate is not a plain JSON object or has a blank name or non-array/empty `elements`
- **THEN** path-addressed structural errors are returned without throwing

#### Scenario: Malformed nested element
- **WHEN** an element is not an object, lacks required common properties, has an unknown type, or a container has malformed or empty children
- **THEN** each supported violation has a stable diagnostic at the closest JSON path

#### Scenario: Duplicate or oversized schema
- **WHEN** keys repeat anywhere in the tree or flattened element count exceeds 1,400
- **THEN** validation returns deterministic errors without unbounded traversal

### Requirement: Scoped data-name validation
The validator SHALL enforce the approved data-name rules according to storage
scope: sections are transparent, each repeatable starts a child scope, and
names for data-producing elements must be unique within their scope.

#### Scenario: Duplicate in one scope
- **WHEN** two data-producing fields resolve to the same `data_name` in the same root or repeatable scope, including through sections
- **THEN** both the scope and conflicting paths are reported deterministically

#### Scenario: Same name in separate repeatable scopes
- **WHEN** equal data names occur only in distinct repeatable scopes
- **THEN** the validator does not report a same-scope collision

#### Scenario: Reserved-name policy
- **WHEN** a data name is checked
- **THEN** only the approved local scope rule is applied; resource and
  authorization checks are not performed

### Requirement: Pure type-specific rules
The supported subset SHALL include deterministic, input-only rules confirmed in the Rails validator for inline choices, status and enabled status-field shape, explicit geometry arrays, feature booleans, `style_mapnik`, field-effects structure, numeric text fields, hyperlinks, calculated-field display configuration, yes/no choices and defaults, date/time defaults, applicable min/max lengths, AI prompt lengths, sketch background array shape, and record-link shape/creation flags. External resource existence and entitlement portions of those rules SHALL not run in the pure package.

#### Scenario: Type-specific violation
- **WHEN** a supported field property has the wrong type, missing required shape, invalid enumerated value, inconsistent bounds, or unresolved inline default
- **THEN** the validator returns a stable error at that property or element path

#### Scenario: Explicit falsy boundary
- **WHEN** a supported numeric or boolean property is explicitly zero or false
- **THEN** it is validated according to its rule and is not treated as omitted

#### Scenario: Hostile AI prompt value
- **WHEN** `ai_prompt` is not a string and defines user-controlled coercion hooks
- **THEN** validation emits one type diagnostic without invoking `toString`, `valueOf`, or any other coercion hook

#### Scenario: Rule cannot be implemented with cross-runtime parity
- **WHEN** a rule depends on Ruby-specific regular-expression syntax, normalization, or another behavior not safely reproducible in the package
- **THEN** that check is reported as unsupported or provisional rather than silently approximated

### Requirement: Resolvable local references
The validator SHALL resolve record title keys, title field keys, repeatable title keys, conditional field keys, and photo FastFill target data names using the confirmed Rails tree and repeatable-scope rules. Conditional operators SHALL be checked against the referenced target type, and `@status` SHALL be treated as the confirmed system condition target.

#### Scenario: Title reference
- **WHEN** a record title, title-fields list, or repeatable title key references no eligible element
- **THEN** validation returns an error at the referencing property with the unresolved key

#### Scenario: Conditional reference scope
- **WHEN** a condition points to itself, an ineligible type, a sibling/deeper repeatable, or any target outside the Rails-valid ancestor/current scope
- **THEN** validation returns a stable unresolved-or-invalid-target diagnostic

#### Scenario: Conditional operator
- **WHEN** a condition's operator is not valid for the resolved target type or an empty-check operator has a nonblank value
- **THEN** validation returns a path-addressed operator/value diagnostic

#### Scenario: FastFill scope
- **WHEN** a photo AI prompt names a field outside its exact repeatable scope or of a blacklisted target type
- **THEN** validation reports that data name as an invalid FastFill target

### Requirement: Deterministic previous/new compatibility
For update operations with a previous form, the validator SHALL compare previous and effective candidates without invoking the existing SQL differ. It SHALL at minimum implement the confirmed Rails rule that an existing leaf field key cannot change type; additions and removals SHALL not be rejected by that rule. Any additional compatibility policy SHALL remain provisional until approved.

#### Scenario: Existing leaf type changes
- **WHEN** an effective update reuses an existing leaf key with a different field type
- **THEN** validation returns a compatibility error identifying the previous and new paths/types

#### Scenario: Addition or removal
- **WHEN** a leaf is added or removed without reusing its key as another type
- **THEN** the confirmed type-immutability rule does not reject the update

#### Scenario: SQL differ isolation
- **WHEN** compatibility validation runs
- **THEN** no `Schema`, `SchemaDiffer`, SQL generator, or database path is invoked

### Requirement: Structured diagnostics and outcome
The result SHALL provide a deterministic outcome and ordered diagnostics. Subject to shared-contract naming approval, every diagnostic SHALL contain a stable code, `error|warning|info` severity, RFC 6901 JSON Pointer path, actionable message, optional non-sensitive fix guidance, and optional source range only when supplied by an upstream parser. Diagnostics SHALL not echo complete forms, scripts, credentials, or suspected secret values. Required common booleans SHALL produce exactly one diagnostic per malformed property.

#### Scenario: Invalid form
- **WHEN** one or more supported rules fail
- **THEN** the outcome is invalid and diagnostics are sorted by path, then stable rule order/code

#### Scenario: No supported errors but incomplete coverage
- **WHEN** supported checks pass but a requested check is unsupported, skipped, provisional, or lacks required context
- **THEN** the outcome is incomplete/unsupported rather than unqualified valid

#### Scenario: Fully covered valid form
- **WHEN** all requested pure checks complete and no error diagnostic exists
- **THEN** the outcome is valid

#### Scenario: Malformed required common booleans
- **WHEN** `disabled`, `hidden`, or `required` is absent or is not a boolean
- **THEN** each malformed property produces exactly one common-boolean diagnostic

### Requirement: Versioned coverage
Every result SHALL include concrete contract, validator/ruleset, package, and form-schema version information where available, plus machine-readable requested, completed, skipped, unsupported, and provisional check identifiers and an unambiguous completeness indicator. Exact field names and enum spellings remain provisional until FLCRM-22116 approval.

#### Scenario: Contextual checks requested
- **WHEN** authorization, entitlement, linked-resource, attachment, or other contextual checks are requested
- **THEN** they appear as unsupported-by-pure-validator or require-context coverage entries and do not run

#### Scenario: Unknown schema version
- **WHEN** the form declares an unsupported schema version
- **THEN** the result identifies that version and is unsupported/incomplete rather than assuming current rules

#### Scenario: Reproducible report
- **WHEN** a result is persisted by a caller
- **THEN** its version and coverage metadata are sufficient to identify which ruleset and supported checks produced it

### Requirement: Explicit unsupported contextual Rails checks
Coverage SHALL explicitly exclude Rails checks that require account/application context or mutate data, including parent-form access, plan entitlements, classification/choice-list/record-link target existence or access, attachment existence and sketch-background sanitization, map-engine-dependent geometry normalization, model state beyond the supplied previous form, and any database-backed lookup. The package SHALL validate only the deterministic local shape portions where separately supported.

#### Scenario: External identifier is structurally valid
- **WHEN** a form supplies a syntactically valid external identifier but no authorized context
- **THEN** local shape checks may complete while existence/access coverage is marked unsupported

#### Scenario: Rails normalization behavior
- **WHEN** Rails would default, coerce, deduplicate, sanitize, or otherwise mutate a value
- **THEN** the package leaves the input unchanged and reports either an explicit diagnostic/fix or unsupported normalization coverage

### Requirement: Bounded and safe handling
The validator SHALL terminate safely for malformed, cyclic, excessively deep, and oversized JavaScript inputs, SHALL avoid catastrophic regular-expression evaluation, and SHALL bound diagnostic production while making truncation explicit. Diagnostic producers and result construction SHALL use one shared diagnostic limit. JSON Pointer segments SHALL accept only bounded primitive string keys or nonnegative safe-integer indexes and SHALL never coerce attacker-controlled objects.

#### Scenario: Cyclic or excessive input
- **WHEN** the caller passes a cyclic value, nesting beyond the supported JSON depth, or an oversized element collection
- **THEN** validation returns or throws only the approved structured malformed-input outcome, terminates within documented limits, and performs no partial side effect

#### Scenario: Diagnostic limit reached
- **WHEN** violations exceed the supported diagnostic limit
- **THEN** returned diagnostics use deterministic truncation and coverage indicates that validation was incomplete

#### Scenario: Hostile JSON Pointer segment
- **WHEN** path construction receives an object, symbol, boolean, invalid number, or oversized string segment
- **THEN** it emits a bounded deterministic safe segment without invoking user-defined coercion

### Requirement: Existing schema-diff compatibility
Adding validation SHALL preserve the package's existing `compareOrganization`, `compareFormSchemas`, and singleton `compareForms` behavior, output, state semantics, and supported builds.

#### Scenario: Existing fixture suite
- **WHEN** the existing PostgreSQL, SQLite, and schema-version migration fixtures run before and after the change
- **THEN** they produce the same passing results and expected SQL

#### Scenario: Validation does not alter singleton diff state
- **WHEN** validation is invoked between existing singleton compare calls
- **THEN** dialect, version, old/new form, table options, and generated diff output remain unchanged

### Requirement: Build, documentation, and release constraints
The implementation SHALL follow the repository's CommonJS JavaScript-source/TypeScript-compiler conventions, emit declarations and browser build successfully, document supported and unsupported coverage, and add no runtime dependency unless separately justified and approved. The change SHALL NOT publish, tag, bump the package version, or deploy a consumer.

#### Scenario: Repository verification
- **WHEN** the change is ready for review
- **THEN** lint, existing tests, new validation tests, TypeScript declaration emission, CommonJS loading, and browserify build all pass

#### Scenario: Release is requested implicitly by existing README
- **WHEN** implementation reaches completion
- **THEN** no `yarn publish`, npm publication, tag, or package-version change occurs without separate explicit authorization
