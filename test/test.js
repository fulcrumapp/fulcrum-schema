import fs from 'fs';
import Schema from '../src/schema';
import OrganizationSchema from '../src/organization-schema';
import V1 from '../src/schemas/postgres-query-v1';
import V2 from '../src/schemas/postgres-query-v2';
// import V1 from '../src/schemas/sqlite-query-v1';
// import V2 from '../src/schemas/sqlite-query-v2';
import Metadata from '../src/metadata';
import sqldiff from 'sqldiff';
import chai from 'chai';

chai.should();

const SchemaDiffer = sqldiff.SchemaDiffer;
const Postgres = sqldiff.Postgres;
const Sqlite = sqldiff.Sqlite;

// import _ from 'underscore';

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
  form.row_id = 67777;
  newForm.row_id = 67777;
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
  console.log(scripts);
  console.log('----------------------------------');
};

function generatePostgres(differ) {
  const meta = new Metadata(differ, {quote: '"', schema: 'organization_1'});
  const gen = new Postgres(differ, {enableViews: true, afterTransform: meta.build.bind(meta)});
  gen.tableSchema = 'organization_1';
  return gen.generate().join('\n').trim();
}

function generateSqlite(differ) {
  const gen = new Sqlite(differ, {enableViews: true});
  gen.tablePrefix = 'account_1_';
  return gen.generate().join('\n').trim();
}

// describe('form schema generator', () => {
//   it('builds a schema diff from a form', () => {
//     const oldSchema = null;
//     const newSchema = new Schema(newForm, V2, null);

//     const differ = new SchemaDiffer(oldSchema, newSchema);

//     const pg = generatePostgres(differ);

//     dumpScript(pg);

//     // const clean = new SchemaDiffer(newSchema, null);
//     // const differ = new SchemaDiffer(null, newSchema);

//     // const cleanPG = generatePostgres(clean);
//     // const createPG = generatePostgres(differ);

//     // dumpScript(cleanPG);
//     // dumpScript(createPG);

//     'yo'.should.eql('');
//   });
// });

describe('organization schema generator', () => {
  it('builds the organization schema', () => {
    const oldSchema = null;
    const newSchema = new OrganizationSchema(V2);

    const clean = new SchemaDiffer(newSchema, null);
    const differ = new SchemaDiffer(oldSchema, newSchema);

    const cleanPG = generatePostgres(clean);
    const createPG = generatePostgres(differ);

    dumpScript(cleanPG);
    dumpScript(createPG);

    pg.should.eql('');
  });
});
