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

Pull requests, merge queue entries and main changes run CI on GitHub-hosted
runners. After main validation succeeds, a GitHub App commits
the next version to the root `package.json` and creates its matching SemVer tag.
Do not edit the root package version manually. Tag creation builds and publishes
the `dist` package to GitHub Packages; this repository does not publish to
npmjs.org.

Before enabling releases, configure fork-run approval, required CI checks,
GitHub Packages access, and the release App's branch and tag
protection bypasses. Disable the old Tekton publisher at cutover. If publishing
fails, rerun the failed publish workflow for the same tag; it verifies the
release commit and package version before publishing.

### Tests

```sh
yarn test
```
