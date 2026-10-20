import fs from 'node:fs';
import path from 'node:path';
import { compareFormSchemas } from '../src/fulcrum-schema';
import chai from 'chai';

chai.should();

let v2Form = null;
let v6Form = null;
let v7Form = null;

const fixture = (file) =>
  fs.readFileSync(path.join('test', 'fixtures', file)).toString();

beforeEach(() => {
  v2Form = JSON.parse(
    fs.readFileSync(path.join('test', 'fixtures', 'form-v2.json'))
  ).form;
  v6Form = JSON.parse(
    fs.readFileSync(path.join('test', 'fixtures', 'form-v6.json'))
  ).form;
  v7Form = JSON.parse(
    fs.readFileSync(path.join('test', 'fixtures', 'form-v7.json'))
  ).form;
  v2Form.row_id = 67777;
  v6Form.row_id = 67777;
  v7Form.row_id = 67777;
});

const toSQL = (scripts) => scripts.join('\n').trim();

const OPTIONS = {
  dialect: 'postgres',
  tableSchema: 'organization_1',
  includeMetadata: true,
};

describe('v6 to v7 form schema generator', () => {
  it('builds a schema diff for a new v7 form', () => {
    const sql = compareFormSchemas(null, v7Form, OPTIONS);

    const expected = fixture('v7-create-form.sql');

    toSQL(sql).should.eql(expected);
  });

  it('builds a schema diff for a v2 to v7 form', () => {
    const sql = compareFormSchemas(v2Form, v7Form, OPTIONS);

    const expected = fixture('v7-update-form-from-v2.sql');

    toSQL(sql).should.eql(expected);
  });

  it('builds a schema diff for a v6 to v7 form', () => {
    const sql = compareFormSchemas(v6Form, v7Form, OPTIONS);

    const expected = fixture('v7-update-form.sql');

    toSQL(sql).should.eql(expected);

    const sqlText = toSQL(sql);
    const tableCleanup = sqlText.match(
      /DELETE FROM "organization_1"\."tables" WHERE name = 'form_67777_0fe3_view';/g
    ) || [];
    const columnCleanup = sqlText.match(
      /DELETE FROM "organization_1"\."columns" WHERE table_name = 'form_67777_0fe3_view';/g
    ) || [];

    tableCleanup.length.should.eql(1);
    columnCleanup.length.should.eql(1);
  });

  it('builds a schema diff for a deleted v7 form', () => {
    const sql = compareFormSchemas(v7Form, null, OPTIONS);

    const expected = fixture('postgres-delete-form.sql');

    toSQL(sql).should.eql(expected);
  });
});
