# Form validation contract

This package implements the approved `v1` transport-neutral form-validation
envelope. The contract baseline and canonical fixtures are pinned to app-mcp
PR34 at commit
`60449c84da193840804f6d2ab309d01f32ba4351`.

## Request

The package root exposes one method, `validateForm(request)`. A request has
`contract_version: "v1"`, `artifact_type: "form"`, an operation of `create`,
`update`, or `validate`, and a complete `artifact`. `previous_artifact` is
used only for an explicitly requested update compatibility check; it is never
merged into the candidate.

## Response

Responses contain exactly these top-level fields:

* `contract_version`
* `outcome`: `valid`, `invalid`, `incomplete`, or `unavailable`
* `diagnostics`
* `coverage`: `requested`, `completed`, `skipped`, `unsupported`,
  `unverified`, and `failures`
* `versions`: `validator`, `schema`, and `runtime`

Unobserved or non-applicable version values are `null`. In particular, blank
or unsupported artifact schema metadata is never copied into `versions.schema`.
`versions.validator` is read from the loaded package metadata. Caller-declared
version fields are not provenance.

Diagnostics use `FORM.*` or `VALIDATION.*` codes, `error`, `warning`, or `info`
severity, bounded actionable messages, and JSONPath-like paths. The validator
uses one shared diagnostic limit; overflow is reported through coverage and
does not hide an error diagnostic.

When indexing discards diagnostics after the shared limit, the affected
structural and semantic checks are removed from `completed` and represented by
structured `failures` entries with `reason_code: "INPUT_LIMIT_EXCEEDED"` and
the `$.elements` path. The retained diagnostics remain errors and are still
returned up to the shared limit.

## Coverage and purity

Outcome precedence is invalid, unavailable, incomplete, then valid. The
validator checks only deterministic local structure, semantics, references,
and (when requested) leaf-type compatibility. It performs no I/O, SQL/schema
diff, persistence, logging, authorization, entitlement, resource lookup,
normalization, or script/template/calculation execution. Contextual Rails
checks remain explicit coverage gaps.

The canonical request/response examples are in
`test/fixtures/validation/valid-form.json` and
`test/fixtures/validation/invalid-form.json`. The canonical incomplete update
is in `test/fixtures/validation/incomplete-missing-previous.json`; fixture
provenance is recorded in `test/fixtures/validation/metadata.json`.

The v1 public structural contract intentionally accepts an explicit empty
root `elements` array. This is a transport-neutral canonical case for an
incomplete update: it produces no structural diagnostic, while a requested
compatibility check without `previous_artifact` is skipped with
`CONTEXT_REQUIRED`. The public adapter never merges that artifact with a
previous form. This exception is limited to the root public contract; malformed
types and empty Section/Repeatable child arrays remain structural errors.

The legacy internal lifecycle validator and its materialization helper remain
available to source-level regression tests only. They are excluded from the
compiled package boundary, so `validation/form-validator` and
`validation/materialize`, along with the legacy `validation/result` helper,
are not installable deep imports.
