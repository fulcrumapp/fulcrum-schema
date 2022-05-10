import fs from 'fs';
import path from 'path';
import { compareFormSchemas } from '../src/fulcrum-schema';
import chai from 'chai';

chai.should();

let oldForm = null;
let newForm = null;

const fixture = (file) => fs.readFileSync(path.join('test', 'fixtures', file)).toString();

beforeEach(() => {
  oldForm = JSON.parse(fs.readFileSync(path.join('test', 'fixtures', 'form-v1.json'))).form;
  newForm = JSON.parse(fs.readFileSync(path.join('test', 'fixtures', 'form-v2.json'))).form;
  oldForm.row_id = 67777;
  newForm.row_id = 67777;
});

const dumpScript = function(scripts) {
  console.log('----------------------------------');
  console.log(toSQL(scripts));
  console.log('----------------------------------');
};

const toSQL = (scripts) => scripts.join('\n').trim();

const OPTIONS = {
  version: 'v1',
  dialect: 'sqlite',
  tablePrefix: 'account_1_'
};

describe('sqlite form schema generator', () => {
  it('builds a schema diff for a new form', () => {
    const sql = compareFormSchemas(null, newForm, OPTIONS);

    const expected = fixture('sqlite-create-form.sql');

    toSQL(sql).should.eql(expected);
  });

  it('builds a schema diff for an updated form', () => {
    const sql = compareFormSchemas(oldForm, newForm, OPTIONS);

    const expected = fixture('sqlite-update-form.sql');

    toSQL(sql).should.eql(expected);
  });

  it('builds a schema diff for a deleted form', () => {
    const sql = compareFormSchemas(newForm, null, OPTIONS);

    const expected = fixture('sqlite-delete-form.sql');

    toSQL(sql).should.eql(expected);
  });
});
