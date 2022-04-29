import fs from 'fs';
import path from 'path';
import { compareFormSchemas } from '../src/fulcrum-schema';
import chai from 'chai';

chai.should();

let oldForm = null;
let v2Form = null;
let v3Form = null;

const fixture = (file) => fs.readFileSync(path.join('test', 'fixtures', file)).toString();

beforeEach(() => {
  oldForm = JSON.parse(fs.readFileSync(path.join('test', 'fixtures', 'form.json'))).form;
  v2Form = JSON.parse(fs.readFileSync(path.join('test', 'fixtures', 'form-new.json'))).form;
  v3Form = JSON.parse(fs.readFileSync(path.join('test', 'fixtures', 'form-v3.json'))).form;
  oldForm.row_id = 67777;
  v2Form.row_id = 67777;
  v3Form.row_id = 67777;
});

const dumpScript = function(scripts) {
  console.log('----------------------------------');
  console.log(toSQL(scripts));
  console.log('----------------------------------');
};

const toSQL = (scripts) => scripts.join('\n').trim();

const OPTIONS = {
  dialect: 'postgres',
  tableSchema: 'organization_1',
  includeMetadata: true
};

describe('v2 to v3 form schema generator', () => {
  it('builds a schema diff for a new v2 form', () => {
    const sql = compareFormSchemas(null, v2Form, OPTIONS);

    const expected = fixture('postgres-create-form.sql');

    toSQL(sql).should.eql(expected);
  });

  it('builds a schema diff for a new v3 form', () => {
    const sql = compareFormSchemas(null, v3Form, OPTIONS);

    const expected = fixture('v3-create-form.sql');

    toSQL(sql).should.eql(expected);
  });

  it('builds a schema diff for a v1 to v2 form', () => {
    const sql = compareFormSchemas(oldForm, v2Form, OPTIONS);

    const expected = fixture('postgres-update-form.sql');

    toSQL(sql).should.eql(expected);
  });

  it('builds a schema diff for a v2 to v3 form', () => {
    const sql = compareFormSchemas(v2Form, v3Form, OPTIONS);

    const expected = fixture('postgres-update-form.sql');

    toSQL(sql).should.eql(expected);
  });

  it('builds a schema diff for a deleted v2 form', () => {
    const sql = compareFormSchemas(v2Form, null, OPTIONS);

    const expected = fixture('postgres-delete-form.sql');

    toSQL(sql).should.eql(expected);
  });

  it('builds a schema diff for a deleted v3 form', () => {
    const sql = compareFormSchemas(v3Form, null, OPTIONS);

    const expected = fixture('postgres-delete-form.sql');

    toSQL(sql).should.eql(expected);
  });
});
