## Fulcrum Query Table Schema

### Setup
```sh
npm install -g browserify
```

### Build

```sh
make
```

### Distribute

Builds the final output. The main output file `dist/fulcrum-schema.min.js`.

```sh
make
```

### Deploying
Once changes have been merged copy the `dist/fulcrum-schema.min.js` to the following
destinations **MAKE SURE TO COPY THE .min FILE**:
  1. `fulcrum-query` : **n/a**
  2. `fulcrum` : `public/resources/fulcrum-schema.js`
  3. `fulcrum-android` : `src/main/res/raw/fulcrum_schema.js`
  4. `fulcrum-ios` : `Fulcrum/Resources/fulcrum-schema.js`

DO NOT change the `template.sql` in the web app without a complete understanding of the
side effects. In most cases a core schema change will have to be hand-coded and applied
to all existing databases. The `template.sql` file represents the one-time V1 version
of the query schema and should never change unless there's a very good reason.

### Tests

```sh
make test
```
