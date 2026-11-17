## Fulcrum Query Table Schema

### Setup
```sh
yarn install --frozen-lockfile
```

This installs build tools, including `browserify`, from `devDependencies`.

### Distribute

The package compiles into the ignored `dist/` directory. The root
`package.json` and README are included with the compiled code when the package
is packed.

```sh
yarn build
```

### Deploying

`schema-service` uses `@fulcrumapp/fulcrum-schema` as a package dependency and
calls `compareFormSchemas` from that package. Update its package dependency
when a schema API change requires it; do not copy a standalone JavaScript file
into the service.

The package publishes to GitHub Packages (`https://npm.pkg.github.com`), not
to npmjs.org. Pull requests, merge queue entries, and changes to `main` run CI.
After main validation succeeds, a GitHub App commits the next version to the
root `package.json` and creates its matching SemVer tag. Do not edit the root
package version manually. The tag-triggered publish workflow builds and packs
the package root, including `dist/`, before publishing. A manual publish
workflow dispatch is also supported; do not publish the `dist/` directory
directly.

If publishing fails, rerun the failed publish workflow for the same tag; it
verifies the release commit and package version before publishing. Reruns use
the workflow and action code from that tag, so a workflow fix on `main` will
not change an older tag's run. Recovering that exact version requires a
separately reviewed procedure; do not move the existing tag.

### Tests

```sh
yarn test
```
