require('babel-core/register');

import fs from 'fs';
import schema from '../src/schemas/postgres-query-v2';

function convertTable(className, columns, tableName, file, view) {
  const output = [];

  output.push("import TableDefinition from '../../table-definition';\n");
  output.push(`export default class ${className} extends TableDefinition {`);
  output.push('  get name() {');
  output.push(`    return '${tableName}'`);
  output.push('  }\n');

  output.push('  defineTable() {');
  for (const column of columns) {
    const params = {};
    if (column.allowNull != null) {
      params.allowNull = column.allowNull;
    }
    if (column.defaultValue != null) {
      params.defaultValue = column.defaultValue;
    }
    const jsonParams = ', ' + JSON.stringify(params);
    output.push(`    this.${column.type}('${column.name}'${jsonParams});`);
  }
  output.push('  }');

  if (view) {
    output.push('\n  defineView() {');
    for (const column of Object.keys(view)) {
      output.push(`    this.alias('${column}', '${view[column]}');`);
    }
    output.push('  }');
  }

  output.push('\n  defineIndexes() {');
  if (schema.organizationIndexes[tableName]) {
    for (const definition of schema.organizationIndexes[tableName]) {
      output.push(`    this.index(${JSON.stringify(definition)});`);
    }
  }
  output.push('  }');

  output.push('}');

  fs.writeFileSync('./src/schemas/postgres/' + file + '.js', output.join('\n'));
}

convertTable('Changesets', schema.systemChangesetsTable, 'changesets', 'changesets', schema.organizationViews.changesets);
convertTable('Forms', schema.systemFormsTable, 'forms', 'forms', schema.organizationViews.forms);
convertTable('ChoiceLists', schema.systemChoiceListsTable, 'choice_lists', 'choice-lists', schema.organizationViews.choice_lists);
convertTable('ClassificationSets', schema.systemClassificationSetsTable, 'classification_sets', 'classification-sets', schema.organizationViews.classification_sets);
convertTable('Projects', schema.systemProjectsTable, 'projects', 'projects', schema.organizationViews.projects);
convertTable('Roles', schema.systemRolesTable, 'roles', 'roles', schema.organizationViews.roles);
convertTable('Memberships', schema.systemMembershipsTable, 'memberships', 'memberships', schema.organizationViews.memberships);
convertTable('Photos', schema.systemPhotosTable, 'photos', 'photos', schema.organizationViews.photos);
convertTable('Videos', schema.systemVideosTable, 'videos', 'videos', schema.organizationViews.videos);
convertTable('Audio', schema.systemAudioTable, 'audio', 'audio', schema.organizationViews.audio);
convertTable('Signatures', schema.systemSignaturesTable, 'signatures', 'signatures', schema.organizationViews.signatures);
// convertTable('QueryRecords', schema.systemFormTableColumns, 'query-records', schema.systemFormViewColumns);
// convertTable('QueryChildRecords', schema.systemRepeatableTableColumns, 'query-child-records');
// convertTable('QueryValues', schema.systemValuesTableColumns, 'query-values');
