---
name: form-record-version-bump
description: >
  Create a new form schema version and safely add/rename system record columns.
  Use when: adding a system column to form records, bumping schema version files,
  creating new migration fixtures, wiring compareFormSchemas for a new version,
  or adding vN-to-vN+1 migration tests.
---

# Form/Record Schema Version Bump Playbook

Use this skill when a change requires a new form schema version (for example: adding
system columns like gps_device_capture or system_status).

## What This Repository Expects

A full version bump in this repo has 6 required parts:

1. Add new schema file src/schemas/vN+1.js
2. Wire the new version in src/fulcrum-schema.js
3. Add form fixture test/fixtures/form-vN+1.json
4. Add SQL fixtures for create + upgrades
5. Add migration test test/test-vN-to-vN+1.js
6. Add the new test file to package.json test script

If any part is missing, tests usually fail or downstream consumers cannot use the version.

## Canonical Workflow

### Step 1: Copy Previous Version as Base

Example (v5 -> v6):

```bash
cp src/schemas/v5.js src/schemas/v6.js
cp test/fixtures/form-v5.json test/fixtures/form-v6.json
```

Then update test/fixtures/form-v6.json:

- set form.schema_version to v6

### Step 2: Add System Column(s) in the New Schema

Edit src/schemas/vN+1.js only (do not mutate old versions).

For each new system column, update all 3 sections:

1. Schema.systemFormTableColumns
- add object with column name and type

2. Schema.systemFormViewColumns
- add mapping so the field appears as a system view alias

3. Schema.systemFormTableIndexes
- add btree index (usually nullable predicate form)

Pattern example:

```js
{
  name: "gps_device_capture",
  type: "string",
}

// in view columns:
gps_device_capture: "gps_device_capture",

// in indexes:
{
  columns: ["gps_device_capture"],
  method: "btree",
  predicate: "gps_device_capture IS NOT NULL",
},
```

### Step 3: Wire New Version in src/fulcrum-schema.js

Update all of these:

1. Import FormSchemaV{N+1}
2. Add v{N+1} entry in schemas map
3. Bump default instance.version to v{N+1}

### Step 4: Add Migration Test File

Create test/test-vN-to-vN+1.js mirroring existing version transition tests.

Required assertions:

1. new vN+1 form: null -> vN+1
2. long-hop upgrade: v2 -> vN+1
3. adjacent upgrade: vN -> vN+1
4. delete vN+1 form: vN+1 -> null

Use fixtures:

- vN+1-create-form.sql
- vN+1-update-form-from-v2.sql
- vN+1-update-form.sql
- postgres-delete-form.sql

### Step 5: Add Test File to package.json

Append the new test file to scripts.test sequence.

### Step 6: Generate SQL Fixtures from Real compareFormSchemas Output

Do not hand-edit large SQL snapshots. Generate with node + compareFormSchemas.

Template command:

```bash
node -r ts-node/register <<'NODE'
const fs = require('fs');
const path = require('path');
const { compareFormSchemas } = require('./src/fulcrum-schema');

const fixturePath = (name) => path.join('test', 'fixtures', name);
const loadForm = (name) => {
  const form = JSON.parse(fs.readFileSync(fixturePath(name))).form;
  form.row_id = 67777;
  return form;
};
const toSQL = (scripts) => scripts.join('\n').trim();

const options = {
  dialect: 'postgres',
  tableSchema: 'organization_1',
  includeMetadata: true,
};

const priorForm = loadForm('form-vN.json');
const v2Form = loadForm('form-v2.json');
const nextForm = loadForm('form-vN+1.json');

fs.writeFileSync(fixturePath('vN+1-create-form.sql'), toSQL(compareFormSchemas(null, nextForm, options)));
fs.writeFileSync(fixturePath('vN+1-update-form-from-v2.sql'), toSQL(compareFormSchemas(v2Form, nextForm, options)));
fs.writeFileSync(fixturePath('vN+1-update-form.sql'), toSQL(compareFormSchemas(priorForm, nextForm, options)));
NODE
```

Important: write without a trailing newline to match existing toSQL(...).trim() expectations.

## Validation Checklist (Mandatory)

Run these in order:

```bash
yarn install
./node_modules/.bin/mocha -r ts-node/register ./test/setup.js test/test-vN-to-vN+1.js
```

Then run the full test command from package.json.

Also check diagnostics in touched files and clear new issues before finishing.

## Common Failure Modes

1. Forgot to add schema map entry in src/fulcrum-schema.js
2. Forgot to bump form-vN+1.json schema_version
3. Added system column in table columns but not view columns
4. Added column but forgot index fixture mismatch
5. Generated SQL with trailing newline causing assertion mismatch
6. Accidentally edited older version file instead of vN+1 file

## Quick File Checklist

For vN -> vN+1, these files are typically touched:

- src/schemas/vN+1.js
- src/fulcrum-schema.js
- test/fixtures/form-vN+1.json
- test/fixtures/vN+1-create-form.sql
- test/fixtures/vN+1-update-form.sql
- test/fixtures/vN+1-update-form-from-v2.sql
- test/test-vN-to-vN+1.js
- package.json
