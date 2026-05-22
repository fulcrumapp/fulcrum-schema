import fs from 'node:fs';
import path from 'node:path';
import { compareFormSchemas } from '../src/fulcrum-schema';
import chai from 'chai';

chai.should();

let v1Form = null;
let v2Form = null;
let v3Form = null;
let v4Form = null;
let v5Form = null;
let v6Form = null;

const fixture = (file) =>
  fs.readFileSync(path.join('test', 'fixtures', file)).toString();

beforeEach(() => {
  v1Form = JSON.parse(
    fs.readFileSync(path.join('test', 'fixtures', 'form-v1.json'))
  ).form;
  v2Form = JSON.parse(
    fs.readFileSync(path.join('test', 'fixtures', 'form-v2.json'))
  ).form;
  v3Form = JSON.parse(
    fs.readFileSync(path.join('test', 'fixtures', 'form-v3.json'))
  ).form;
  v4Form = JSON.parse(
    fs.readFileSync(path.join('test', 'fixtures', 'form-v4.json'))
  ).form;
  v5Form = JSON.parse(
    fs.readFileSync(path.join('test', 'fixtures', 'form-v5.json'))
  ).form;
  v6Form = JSON.parse(
    fs.readFileSync(path.join('test', 'fixtures', 'form-v6.json'))
  ).form;
  v1Form.row_id = 67777;
  v2Form.row_id = 67777;
  v3Form.row_id = 67777;
  v4Form.row_id = 67777;
  v5Form.row_id = 67777;
  v6Form.row_id = 67777;
});

const toSQL = (scripts) => scripts.join('\n').trim();

const OPTIONS = {
  dialect: 'postgres',
  tableSchema: 'organization_1',
  includeMetadata: true,
};

describe('v5 to v6 form schema generator', () => {
  it('builds a schema diff for a new v6 form', () => {
    const sql = compareFormSchemas(null, v6Form, OPTIONS);

    const expected = fixture('v6-create-form.sql');

    toSQL(sql).should.eql(expected);
  });

  it('builds a schema diff for a v2 to v6 form', () => {
    const sql = compareFormSchemas(v2Form, v6Form, OPTIONS);

    const expected = fixture('v6-update-form-from-v2.sql');

    toSQL(sql).should.eql(expected);
  });

  it('builds a schema diff for a v5 to v6 form', () => {
    const sql = compareFormSchemas(v5Form, v6Form, OPTIONS);

    const expected = fixture('v6-update-form.sql');

    toSQL(sql).should.eql(expected);
  });

  it('builds a schema diff for a deleted v6 form', () => {
    const sql = compareFormSchemas(v6Form, null, OPTIONS);

    const expected = fixture('postgres-delete-form.sql');

    toSQL(sql).should.eql(expected);
  });
});
