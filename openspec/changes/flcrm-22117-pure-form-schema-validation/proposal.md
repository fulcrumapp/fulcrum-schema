## Why

`@fulcrumapp/fulcrum-schema` currently generates and compares SQL schemas but cannot safely validate an unsaved Fulcrum form definition. FLCRM-22117 needs a deterministic, reusable, non-mutating subset of the authoritative Rails form validator so downstream preflight consumers can distinguish invalid input from checks that require application context, without executing SQL or submitted content.

## What Changes

- Add a pure form-schema validation capability covering documented structural rules, field-type rules, scoped identifiers, nested/repeatable relationships, internal references, and deterministic old/new compatibility.
- Preserve create versus partial-update semantics and the distinction among omitted, `null`, `false`, zero, empty string, and empty collections; never normalize or mutate caller-owned input.
- Return stable structured diagnostics plus validator/schema versions and explicit performed/skipped/unsupported coverage.
- Add adversarial parity fixtures and tests for immutability, determinism, side effects, boundaries, and non-regression of the existing SQL schema-diff API.
- Add package documentation and declarations following the existing CommonJS/TypeScript-over-JavaScript build conventions.
- Treat all public method/input/result names as **provisional and blocked on FLCRM-22116 shared-contract approval**. Implementations may prepare an internal core, but must not finalize or expose a competing public contract before that gate.
- Do not publish an npm package as part of this change.

## Capabilities

### New Capabilities

- `pure-form-schema-validation`: Side-effect-free validation of create and update form-schema candidates with versioned diagnostics and explicit coverage.

### Modified Capabilities

None.

## Impact

- Expected implementation targets: new validator modules under `src/`, a provisional export integration in `src/fulcrum-schema.js` only after contract approval, focused Mocha tests/fixtures under `test/`, README documentation, and generated declarations/build output only according to repository conventions.
- Existing `compareOrganization`, `compareFormSchemas`, and singleton `compareForms` behavior must remain unchanged.
- No schema-service route, app-mcp adapter, Rails change, persistence, database migration, I/O, logging, script/template execution, import resolution, SQL generation, SQL execution, package-version bump, or npm publication is in scope.
- The owning shared-contract task FLCRM-22116 blocks final public API shape and export. Schema-service consumption/release coordination is downstream work, not an endpoint design in this repository.
