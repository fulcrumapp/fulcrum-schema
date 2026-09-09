## 1. Contract and Parity Baseline

- [ ] 1.1 Record the exact approved Rails source revision and create a rule matrix classifying each selected rule as supported, provisional, contextual, mutating, or unsupported; verify every ruleset entry cites a source path/fixture and no unsupported rule is advertised as complete.
- [ ] 1.2 Add minimal valid create and previous/update fixtures plus adversarial deltas for every supported rule; verify fixtures preserve `false`, zero, `null`, empty, and omitted values distinctly.
- [ ] 1.3 Confirm the authoritative data-name scope/reserved-name policy with the owner and update the OpenSpec/fixtures; verify the rule is no longer marked provisional before it can be publicly exported.

## 2. Pure Validation Core

- [ ] 2.1 Add isolated validation, traversal/index, rule-registry, and result modules under `src/validation/`; verify they import no singleton, schema, `sqldiff`, I/O, logging, execution, or persistence module.
- [ ] 2.2 Implement create/effective-update materialization using own-property presence and top-level replacement; verify deep-frozen inputs are unchanged and omission differs from explicit `null`, `false`, zero, empty string/object/array.
- [ ] 2.3 Implement iterative deterministic indexing with JSON Pointer paths, cycle/depth/1,400-element/diagnostic bounds, repeatable scopes, and stable ordering; verify cyclic and oversized cases terminate with explicit incomplete/malformed coverage.
- [ ] 2.4 Implement the internal diagnostics/version/coverage model behind one adapter; verify invalid, valid, incomplete, and unsupported outcomes follow the spec without exposing a public API.

## 3. Supported Rules

- [ ] 3.1 Implement root/common/container structural rules and globally unique keys; verify each valid/invalid/nested fixture produces the expected path-addressed diagnostics.
- [ ] 3.2 Implement the approved scoped data-name rule with sections transparent and repeatables isolated; verify same-scope collisions fail and separate repeatable scopes do not collide.
- [ ] 3.3 Implement the selected deterministic form-level and field-type rules; verify boundary fixtures cover choices, status field, geometry, booleans, field effects, numeric text, hyperlink, calculated, yes/no, date/time, lengths, AI prompts, sketch shape, and record-link shape.
- [ ] 3.4 Implement title, repeatable-title, condition/operator, `@status`, and FastFill reference resolution using indexed scope data; verify ancestor/current/sibling/deeper repeatable fixtures match the documented Rails rules.
- [ ] 3.5 Implement previous/effective leaf-key type compatibility without invoking schema diff; verify additions/removals pass that rule while reused keys with changed types fail.
- [ ] 3.6 Emit explicit coverage for contextual/mutating/uncertain Rails checks; verify no database/resource/entitlement/attachment lookup, regex approximation, normalization, or logging occurs.

## 4. Adversarial and Non-Regression Tests

- [ ] 4.1 Add immutability, deterministic-repeat, side-effect sentinel, cyclic/depth/size, diagnostic-order/truncation, sensitive-message, and inert script/template/import/SQL string tests; verify the focused Mocha suite passes.
- [ ] 4.2 Add parity fixture tests with source/ruleset metadata and explicit unsupported expectations; verify coverage never reports contextual or provisional checks as completed.
- [ ] 4.3 Run the existing PostgreSQL, SQLite, and v2-to-v6 migration suites and add a singleton-state isolation regression; verify SQL output and compare API behavior remain unchanged.

## 5. Shared Contract Approval Gate

- [ ] 5.1 Stop before public export and obtain explicit FLCRM-22116 approval for the method/request/result names, outcomes, diagnostics, versions, coverage IDs, update merge, limits, and unsupported-version behavior; verify the approval reference is recorded in the spec and PR evidence.
- [ ] 5.2 Reconcile the internal adapter and fixtures to the approved shared v1 contract and update OpenSpec plus `.agents/specs/active-spec.md`; verify no provisional field, enum, or code remains in the public contract.

## 6. Package Integration and Documentation

- [ ] 6.1 After task 5, add the approved stateless package export without adding mutable singleton configuration; verify CommonJS consumers can call it and existing compare methods/state are unchanged.
- [ ] 6.2 Add declarations/JSDoc and README documentation for operations, update semantics, diagnostics, versions, coverage, supported rules, unsupported contextual checks, purity, and examples; verify generated declarations describe the approved contract.
- [ ] 6.3 Follow the repository decision for reproducible `dist/` artifacts without changing the package version; verify source/build output are consistent and the diff contains no unrelated cleanup.

## 7. Verification and Review

- [ ] 7.1 Run `yarn lint`, the full `yarn test`, focused adversarial tests, `yarn build`, a CommonJS load smoke test, and `openspec validate flcrm-22117-pure-form-schema-validation --strict`; verify all commands pass and attach repository-required evidence.
- [ ] 7.2 Use the user-approved Luna implementation agents for implementation work under the approved spec, then complete audit/review without expanding into schema-service or app-mcp; verify only this repository's pure validation scope changed.
- [ ] 7.3 Prepare one cohesive reviewed PR and coordinate the future package/consumer release sequence with schema-service owners; verify no npm publish, tag, package-version bump, deployment, consumer change, or generated SQL execution occurs.
