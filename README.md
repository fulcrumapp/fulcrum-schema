## Fulcrum Query Table Schema

### Setup
```sh
yarn install --frozen-lockfile
```

### Distribute

The package compiles into the ignored `dist/` directory. Build artifacts are
created automatically for `yarn pack` and `yarn publish`, and are the only
files included in the published package.

```sh
yarn build
```

### Deploying

When making changes to this library, publish the package root; do not publish
the `dist/` directory directly.

```sh
yarn publish --new-version <version> --no-git-tag-version
```

### Tests

```sh
yarn test
```

### Pure form validation

The package root exports a stateless, non-writing validator:

```js
const result = schema.validateForm({
  contract_version: 'v1',
  artifact_type: 'form',
  operation: 'create', // create, update, or validate
  artifact: completeForm,
  checks: ['structural', 'semantic'] // omitted uses these defaults
});
```

`artifact` is always the complete candidate; it is never a patch or merged
with `previous_artifact`. For an update, provide `previous_artifact` only when
requesting the `compatibility` check. Validation never mutates, persists,
executes, logs, or resolves submitted scripts, expressions, templates, or
external identifiers.

For the public v1 contract, an explicitly supplied empty `artifact.elements`
array is a valid structural input (and is not filled from
`previous_artifact`). This preserves the canonical incomplete-update envelope:
structural validation can complete with zero diagnostics while compatibility is
reported as `CONTEXT_REQUIRED` when no previous artifact is supplied. Other
malformed root and element shapes remain errors; container child arrays remain
required to be nonempty.

The result always contains the v1 `contract_version`, one of `valid`,
`invalid`, `incomplete`, or `unavailable`, deterministic namespaced
diagnostics, `coverage` (`requested`, `completed`, `skipped`, `unsupported`,
`unverified`, and `failures`), and observed `versions` (`validator`, `schema`,
and `runtime`). A supplied empty `checks` array returns `incomplete` with a
`MISSING_CHECK` coverage entry. Outcomes use `invalid > unavailable >
incomplete > valid` precedence; an operational failure is a coverage failure,
not an error diagnostic. Non-applicable or unobserved version values are
`null`, and caller-declared version inputs are not copied into the response.
If more than the shared diagnostic limit is discarded while indexing, the
affected structural and semantic checks are reported as structured
`INPUT_LIMIT_EXCEEDED` coverage failures rather than as completed checks.
Only local structural, semantic, and leaf-type compatibility checks are
performed; resource existence, authorization, normalization, and other
contextual checks are not claimed as covered. Packaged consumers import
`validateForm` from the package root; legacy lifecycle, materialization, and
result helpers are not published as deep imports.
