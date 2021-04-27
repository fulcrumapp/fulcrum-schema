## Fulcrum Query Table Schema [![Build Status](https://secure.travis-ci.org/fulcrumapp/fulcrum-schema.svg)](http://travis-ci.org/fulcrumapp/fulcrum-schema)

### Setup
```sh
npm install -g browserify
```

### Build

```sh
make
```

### Distribute

Builds the final output. The main output file `dist/schema-generator.js`.

```sh
make
```

### Deploying

When making changes to this library, the schema-generator.js file needs to be copied to the Fulcrum web app directory in `public`. At the
same time the `fulcrum-query` repo needs to be upgraded to use the new version.

DO NOT change the `template.sql` in the web app without a complete understanding of the side effects. In most cases a core schema
change will have to be hand-coded and applied to all existing databases. The `template.sql` file represents the one-time V1 version
of the query schema and should never change unless there's a very good reason.

### Copy files to other repositories

Copies the build output and docs to the other repositories (each are optional, but at least one is needed).

You can define the paths to the Fulcrum repos using environment variables in your shell config:

```sh
export FULCRUM_ANDROID=/path/to/android/app
export FULCRUM_IOS=/path/to/ios/app
export FULCRUM_WEB=/path/to/web/app
export FULCRUM_SITE=/path/to/website
```

Or you can assign them in the make command:

```sh
FULCRUM_SITE=$HOME/dev/fulcrumapp.com make dist copy
```

Once you have the environment variables set, you can run:

```sh
make copy

or

make dist copy # clean, build and deploy everything
```

### Tests

```sh
make test
```
