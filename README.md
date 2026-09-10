## Fulcrum Query Table Schema

### Setup
```sh
npm install -g browserify
```

### Distribute

Builds the final output. The main output file `dist/fulcrum-schema.js`.

```sh
yarn build
```

### Deploying

When making changes to this library, the fulcrum-schema.js file needs to be included in the `schema-service` as a dependency.

In order to publish a new version, run `yarn publish dist --new-version $(params.version) --no-git-tag-version` where "params.version" is the version you're publishing.

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

The result always contains the v1 `contract_version`, one of `valid`,
`invalid`, `incomplete`, or `unavailable`, deterministic namespaced
diagnostics, `coverage` (`requested`, `completed`, `skipped`, `unsupported`,
`unverified`, and `failures`), and observed `versions` (`validator`, `schema`,
and `runtime`). A supplied empty `checks` array returns `incomplete` with a
`MISSING_CHECK` coverage entry. Outcomes use `invalid > unavailable >
incomplete > valid` precedence; an operational failure is a coverage failure,
not an error diagnostic. Non-applicable or unobserved version values are
`null`, and caller-declared version inputs are not copied into the response.
Only local structural, semantic, and leaf-type compatibility checks are
performed; resource existence, authorization, normalization, and other
contextual checks are not claimed as covered.
