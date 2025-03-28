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
