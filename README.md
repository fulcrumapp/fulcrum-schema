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

When making changes to this library, the fulcrum-schema.js file needs to be included in the `schema-service` as a dependency. At the
same time the `fulcrum-query` repo needs to be upgraded to use the new version.

### Tests

```sh
yarn test
```
