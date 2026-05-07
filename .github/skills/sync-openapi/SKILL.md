---
name: sync-openapi
description: >
  When form schema source files change in this repo, open a PR against fulcrumapp/api to update
  the OpenAPI specification. Use when: data-elements.js changed, schema.js changed, form fixtures
  updated, new element type added, element properties changed, form field structure modified,
  keeping fulcrumapp/api in sync with fulcrum-schema changes.
---

# Sync OpenAPI Spec in fulcrumapp/api

This skill is invoked any time form-related source files change in `fulcrumapp/fulcrum-schema`.
It produces a pull request against `fulcrumapp/api` that updates `reference/rest-api.json` to
match the new schema shape.

## Trigger Files

Watch for changes to any of these files — they all affect the OpenAPI form schemas:

| File | Impact on OpenAPI |
|------|-------------------|
| `src/data-elements.js` | Element `type` enum values in `FormBaseElement` and `FormElement.oneOf` |
| `src/schema.js` | Per-element column definitions → per-element schema properties |
| `src/metadata.js` | Form-level metadata fields → `FormBody` properties |
| `test/fixtures/form-v5.json` | Authoritative JSON shape for all element types |

## Mapping: fulcrum-schema → OpenAPI

### Element Types (`src/data-elements.js`)

Each entry in `DATA_ELEMENT_TYPES` maps to:
- A type string in `FormBaseElement.properties.type.enum`
- A `$ref` entry in `FormElement.oneOf`
- A dedicated `Form{TypeName}Element` schema in `components.schemas`

### Element Properties (`src/schema.js` columns)

The column definitions for each element type reveal what properties the element stores in JSON.
For each column group in `schema.js`, map columns → OpenAPI properties:

| SQL column pattern | OpenAPI property | Schema |
|-------------------|-----------------|--------|
| `numeric`, `format` | TextField numeric settings | `FormTextFieldElement` |
| `choices` JSON | Array of `FormElementChoice` | `FormChoiceFieldElement` |
| `classification_set_id` | String ref | `FormClassificationFieldElement` |
| `track_enabled`, `audio_enabled` | Booleans | `FormVideoFieldElement` |
| `expression` | Calculated expression | `FormCalculatedFieldElement` |
| `linked_form_id` | RecordLink target | `FormRecordLinkFieldElement` |
| `min_length`, `max_length` | Integer bounds | Multiple element schemas |
| `agreement_text` | Signature text | `FormSignatureFieldElement` |
| `auto_populate` | Address auto-fill | `FormAddressFieldElement` |

### Form-Level Attributes (`src/metadata.js`)

Form-level fields map to `FormBody.properties` in the OpenAPI spec:
`name`, `description`, `elements`, `status_field`, `title_field_keys`, `record_prefix`,
`geometry_types`, `geometry_required`, `script`, `projects_enabled`, `assignment_enabled`,
`auto_assign`, `hidden_on_dashboard`

## Workflow

### Step 1 — Understand What Changed

Review the diff for this PR / commit. Identify which of the trigger files changed and what
specifically changed within them:

```bash
# If running after a merge/push, diff against previous commit
git diff HEAD~1 -- src/data-elements.js src/schema.js src/metadata.js test/fixtures/form-v5.json
```

Categorize each change as one of:
- **New element type** — requires new `Form*Element` schema + additions to `FormElement.oneOf` and `FormBaseElement` enum
- **New element property** — add property to existing `Form*Element` schema
- **Changed element property** — update type, description, or enum in existing property
- **Removed element property** — remove from schema (note if breaking)
- **New form-level attribute** — add to `FormBody.properties`
- **Changed form-level attribute** — update existing `FormBody` property

### Step 2 — Clone / Check Out fulcrumapp/api

```bash
# If api repo is not already cloned locally:
gh repo clone fulcrumapp/api /tmp/fulcrum-api
cd /tmp/fulcrum-api
git checkout v2
git pull origin v2

# Create a feature branch
git checkout -b chore/sync-form-schemas-from-fulcrum-schema
```

### Step 3 — Apply Changes to reference/rest-api.json

Edit `reference/rest-api.json` in the `api` repo. All schemas are inline under `components.schemas`.

**Adding a new element type** (e.g., `NewField`):

1. Add `"NewField"` to `FormBaseElement.properties.type.enum`
2. Create `FormNewFieldElement` schema following this pattern:
   ```json
   "FormNewFieldElement": {
     "description": "Description of what this field does.",
     "allOf": [
       { "$ref": "#/components/schemas/FormBaseElement" },
       {
         "type": "object",
         "properties": {
           "type": { "type": "string", "enum": ["NewField"] },
           "new_property": {
             "type": "string",
             "description": "Description of new_property"
           }
         }
       }
     ]
   }
   ```
3. Add to `FormElement.oneOf`:
   ```json
   { "$ref": "#/components/schemas/FormNewFieldElement" }
   ```

**Adding a property to an existing element**:

Locate the `Form*Element` schema and add the property under the second `allOf` entry's
`properties` object.

**Adding a form-level attribute**:

Add to `FormBody.properties`.

### Step 4 — Validate (MANDATORY per fulcrumapp/api AGENTS.md)

```bash
cd /tmp/fulcrum-api

# 1. JSON syntax
node -e "const fs = require('fs'); try { JSON.parse(fs.readFileSync('reference/rest-api.json', 'utf-8')); console.log('✅ Valid JSON'); } catch(e) { console.log('❌ Invalid JSON:', e.message); }"

# 2. OpenAPI spec validation
cd reference && npx --yes rdme openapi validate rest-api.json && cd ..

# 3. RAW_BODY check (must be 0)
grep -c "RAW_BODY" reference/rest-api.json || echo "0 ✅"

# 4. External ref check (must be 0)
grep -c '"./components/schemas' reference/rest-api.json || echo "0 ✅"
```

Fix any errors before opening the PR.

### Step 5 — Commit and Open PR

```bash
cd /tmp/fulcrum-api

git add reference/rest-api.json
git commit -m "chore: sync form element schemas from fulcrum-schema

Triggered by changes in fulcrumapp/fulcrum-schema:
- <list changed files here>

Changes:
- <list each schema change and why>"

git push origin chore/sync-form-schemas-from-fulcrum-schema

gh pr create \
  --repo fulcrumapp/api \
  --base v2 \
  --title "chore: sync form element OpenAPI schemas from fulcrum-schema" \
  --body "## Summary

Automated sync of form element schemas in \`reference/rest-api.json\` triggered by changes
in [fulcrumapp/fulcrum-schema](https://github.com/fulcrumapp/fulcrum-schema).

## Source Changes

<!-- Link to the fulcrum-schema commit or PR that triggered this -->

## OpenAPI Schema Changes

<!-- List each schema changed, e.g.:
- Added \`FormNewFieldElement\` for new \`NewField\` element type
- Added \`new_property\` to \`FormTextFieldElement\`
- Updated description on \`FormBody.geometry_types\`
-->

## Breaking Changes

<!-- List any removed or renamed properties that could break existing API consumers -->
None

## Validation

- [ ] JSON syntax valid (\`node -e JSON.parse\`)
- [ ] OpenAPI spec validates (\`npx rdme openapi validate\`)
- [ ] No RAW_BODY anti-patterns
- [ ] No external \$ref paths (\`./components/schemas/...\`)
- [ ] VS Code shows no errors in \`reference/rest-api.json\`"
```

## Critical Rules for reference/rest-api.json

- **Never use external `$ref` paths** — ReadMe does not support them; use `"#/components/schemas/SchemaName"` only
- **All schemas inline** — define everything under `components.schemas`, never in separate files
- **No RAW_BODY anti-patterns** — never use `RAW_BODY` as a property name with an inline JSON string default
- **Validate after every change** — even single-line edits can break JSON structure
- **Use `allOf` + base pattern** — all typed element schemas extend `FormBaseElement` via `allOf`
- **Discriminator is `type`** — `FormElement.discriminator.propertyName` must always be `"type"`

## Schema Naming Conventions

- Element schemas: `Form{TypeName}Element` where `TypeName` matches the enum value exactly (e.g., `FormTextFieldElement` for `"TextField"`)
- Support schemas: `Form{ConceptName}` (e.g., `FormElementChoice`, `FormStatusField`, `FormBody`)
- Use PascalCase for all schema names
