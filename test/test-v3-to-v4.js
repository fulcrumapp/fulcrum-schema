import fs from 'fs';
import path from 'path';
import { compareFormSchemas } from '../src/fulcrum-schema';
import chai from 'chai';

chai.should();

let v1Form = null;
let v2Form = null;
let v3Form = null;
let v4Form = null;

const fixture = (file) => fs.readFileSync(path.join('test', 'fixtures', file)).toString();

beforeEach(() => {
  v1Form = JSON.parse(fs.readFileSync(path.join('test', 'fixtures', 'form-v1.json'))).form;
  v2Form = JSON.parse(fs.readFileSync(path.join('test', 'fixtures', 'form-v2.json'))).form;
  v3Form = JSON.parse(fs.readFileSync(path.join('test', 'fixtures', 'form-v3.json'))).form;
  v4Form = JSON.parse(fs.readFileSync(path.join('test', 'fixtures', 'form-v4.json'))).form;
  v1Form.row_id = 67777;
  v2Form.row_id = 67777;
  v3Form.row_id = 67777;
  v4Form.row_id = 67777;
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

describe('v3 to v4 form schema generator', () => {
  it('builds a schema diff for a new v4 form', () => {
    const sql = compareFormSchemas(null, v4Form, OPTIONS);

    const expected = fixture('v4-create-form.sql');

    toSQL(sql).should.eql(expected);
  });

  it('builds a schema diff for a v2 to v4 form', () => {
    const sql = compareFormSchemas(v2Form, v4Form, OPTIONS);

    const expected = fixture('v4-update-form-from-v2.sql');

    toSQL(sql).should.eql(expected);
  });

  it('builds a schema diff for a v3 to v4 form', () => {
    const sql = compareFormSchemas(v3Form, v4Form, OPTIONS);

    const expected = fixture('v4-update-form.sql');

    toSQL(sql).should.eql(expected);
  });

  it('builds a schema diff for a deleted v4 form', () => {
    const sql = compareFormSchemas(v4Form, null, OPTIONS);

    const expected = fixture('postgres-delete-form.sql');

    toSQL(sql).should.eql(expected);
  });
});
