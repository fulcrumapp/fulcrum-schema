import fs from 'fs';
import buildSchema from '../src/schema';
import SchemaDiff from '../src/schema-diff';
import SqliteSchemaGenerator from '../src/postgres-schema-generator';
import chai from 'chai';

chai.should();

import _ from 'underscore';

// const shouldBeNull = function(value) {
//   return (value === null).should.be["true"];
// };

// const shouldHaveNoValue = function(value) {
//   return (value === NO_VALUE).should.be["true"];
// };

// const shouldBeUndefined = function(value) {
//   return (value === void 0).should.be["true"];
// };

let form = null;
let newForm = null;

beforeEach(function () {
  form = JSON.parse(fs.readFileSync('./test/form.json')).form;
  newForm = JSON.parse(fs.readFileSync('./test/form-new.json')).form;
  form.id = 67;
  newForm.id = 67;
});

describe('buildSchema', () => {
  it('builds a table schema from a form', () => {
  });
});

describe('SchemaDiff', () => {
  it('builds a schema diff from a form', () => {
  });
});

const dumpScript = function (scripts) {
  console.log('----------------------------------');
  console.log(_.flatten(scripts).join('\n\n'));
  console.log('----------------------------------');
};

describe('SqliteSchemaGenerator', () => {
  it('builds a schema diff from a form', () => {
    const oldSchema = buildSchema(form, { full: true, mediaCaptions: true });
    const newSchema = buildSchema(newForm, { full: true, mediaCaptions: true });

    const schemaDiff = new SchemaDiff(oldSchema, newSchema);

    // console.log(schemaDiff);

    const diff = schemaDiff.diff();

    console.log('DIFFFFF', diff);

    const sqlite = new SqliteSchemaGenerator(diff, schemaDiff, { enableViews: true });

    sqlite.tableSchema = 'org_1';

    const sql = sqlite.generate();

    dumpScript(sql);

    sql.should.eql('');
  });
});
