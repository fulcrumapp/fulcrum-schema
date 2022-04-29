CREATE TABLE IF NOT EXISTS organization_1.tmp_new_form_67777 (
  id bigserial NOT NULL,
  record_id bigint NOT NULL,
  record_resource_id text NOT NULL,
  record_key text,
  record_sequence bigint,
  project_id bigint,
  project_resource_id text,
  assigned_to_id bigint,
  assigned_to_resource_id text,
  status text,
  latitude double precision,
  longitude double precision,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  version bigint NOT NULL,
  created_by_id bigint NOT NULL,
  created_by_resource_id text,
  updated_by_id bigint NOT NULL,
  updated_by_resource_id text,
  server_created_at timestamp with time zone NOT NULL,
  server_updated_at timestamp with time zone NOT NULL,
  record_index_text text,
  record_index tsvector,
  geometry geometry(Geometry, 4326),
  altitude double precision,
  speed double precision,
  course double precision,
  horizontal_accuracy double precision,
  vertical_accuracy double precision,
  form_values text,
  changeset_id bigint,
  changeset_resource_id text,
  title text,
  created_latitude double precision,
  created_longitude double precision,
  created_geometry geometry(Geometry, 4326),
  created_altitude double precision,
  created_horizontal_accuracy double precision,
  updated_latitude double precision,
  updated_longitude double precision,
  updated_geometry geometry(Geometry, 4326),
  updated_altitude double precision,
  updated_horizontal_accuracy double precision,
  created_duration bigint,
  updated_duration bigint,
  edited_duration bigint,
  f92aa text,
  faf33 text,
  faf00 text,
  faf01 text,
  faf02 text,
  faf72 text,
  f3fcc text,
  f5046 double precision,
  f196d double precision,
  f483d text,
  fcff4 text,
  f0fd9 text,
  f0fd9_sub_thoroughfare text,
  f0fd9_thoroughfare text,
  f0fd9_suite text,
  f0fd9_locality text,
  f0fd9_admin_area text,
  f0fd9_postal_code text,
  f0fd9_sub_admin_area text,
  f0fd9_country text,
  f6427 text,
  fc00a text[],
  f3b66 text[],
  fd088 date,
  ff654 time without time zone,
  f5dcd text[],
  f5dcd_captions text[],
  f9f01 text[],
  f9f01_captions text[],
  fc71a text,
  fc71a_timestamp timestamp with time zone,
  ff113 double precision,
  fb9d9 text,
  CONSTRAINT tmp_new_form_67777_pkey PRIMARY KEY (id)
);
INSERT INTO organization_1.tmp_new_form_67777 (id, record_id, record_resource_id, project_id, project_resource_id, assigned_to_id, assigned_to_resource_id, status, latitude, longitude, created_at, updated_at, version, created_by_id, created_by_resource_id, updated_by_id, updated_by_resource_id, server_created_at, server_updated_at, record_index_text, record_index, geometry, altitude, speed, course, horizontal_accuracy, vertical_accuracy, form_values, changeset_id, changeset_resource_id, title, created_latitude, created_longitude, created_geometry, created_altitude, created_horizontal_accuracy, updated_latitude, updated_longitude, updated_geometry, updated_altitude, updated_horizontal_accuracy, created_duration, updated_duration, edited_duration, f92aa, faf33, faf00, faf01, faf02, faf72, f3fcc, f5046, f196d, f483d, fcff4, f0fd9, f0fd9_sub_thoroughfare, f0fd9_thoroughfare, f0fd9_suite, f0fd9_locality, f0fd9_admin_area, f0fd9_postal_code, f0fd9_sub_admin_area, f0fd9_country, f6427, fc00a, f3b66, fd088, ff654, f5dcd, f5dcd_captions, f9f01, f9f01_captions, fc71a, fc71a_timestamp, ff113, fb9d9) SELECT id, record_id, record_resource_id, project_id, project_resource_id, assigned_to_id, assigned_to_resource_id, status, latitude, longitude, created_at, updated_at, version, created_by_id, created_by_resource_id, updated_by_id, updated_by_resource_id, server_created_at, server_updated_at, record_index_text, record_index, geometry, altitude, speed, course, horizontal_accuracy, vertical_accuracy, form_values, changeset_id, changeset_resource_id, title, created_latitude, created_longitude, created_geometry, created_altitude, created_horizontal_accuracy, updated_latitude, updated_longitude, updated_geometry, updated_altitude, updated_horizontal_accuracy, created_duration, updated_duration, edited_duration, f92aa, faf33, faf00, faf01, faf02, faf72, f3fcc, f5046, f196d, f483d, fcff4, f0fd9, f0fd9_sub_thoroughfare, f0fd9_thoroughfare, f0fd9_suite, f0fd9_locality, f0fd9_admin_area, f0fd9_postal_code, f0fd9_sub_admin_area, f0fd9_country, f6427, fc00a, f3b66, fd088, ff654, f5dcd, f5dcd_captions, f9f01, f9f01_captions, fc71a, fc71a_timestamp, ff113, fb9d9 FROM organization_1.form_67777;
SELECT setval('organization_1.tmp_new_form_67777_id_seq', (SELECT MAX(id) FROM organization_1.tmp_new_form_67777));
ALTER TABLE organization_1.form_67777 RENAME TO tmp_old_form_67777;
ALTER TABLE organization_1.tmp_old_form_67777 RENAME CONSTRAINT form_67777_pkey TO tmp_old_form_67777_pkey;
ALTER SEQUENCE organization_1.form_67777_id_seq RENAME TO tmp_old_form_67777_id_seq;
ALTER TABLE organization_1.tmp_new_form_67777 RENAME TO form_67777;
ALTER TABLE organization_1.form_67777 RENAME CONSTRAINT tmp_new_form_67777_pkey TO form_67777_pkey;
ALTER SEQUENCE organization_1.tmp_new_form_67777_id_seq RENAME TO form_67777_id_seq;
DROP TABLE IF EXISTS organization_1.tmp_old_form_67777 CASCADE;
CREATE TABLE IF NOT EXISTS organization_1.tmp_new_form_67777_4ccf (
  id bigserial NOT NULL,
  resource_id text NOT NULL,
  record_id bigint NOT NULL,
  record_resource_id text NOT NULL,
  parent_resource_id text,
  record_record_key text,
  record_record_sequence bigint,
  record_project_id bigint,
  record_project_resource_id text,
  record_assigned_to_id bigint,
  record_assigned_to_resource_id text,
  record_status text,
  index bigint,
  latitude double precision,
  longitude double precision,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  version bigint NOT NULL,
  created_by_id bigint NOT NULL,
  created_by_resource_id text,
  updated_by_id bigint NOT NULL,
  updated_by_resource_id text,
  server_created_at timestamp with time zone NOT NULL,
  server_updated_at timestamp with time zone NOT NULL,
  record_index_text text,
  record_index tsvector,
  geometry geometry(Geometry, 4326),
  altitude double precision,
  speed double precision,
  course double precision,
  horizontal_accuracy double precision,
  vertical_accuracy double precision,
  form_values text,
  changeset_id bigint,
  changeset_resource_id text,
  title text,
  created_latitude double precision,
  created_longitude double precision,
  created_geometry geometry(Geometry, 4326),
  created_altitude double precision,
  created_horizontal_accuracy double precision,
  updated_latitude double precision,
  updated_longitude double precision,
  updated_geometry geometry(Geometry, 4326),
  updated_altitude double precision,
  updated_horizontal_accuracy double precision,
  created_duration bigint,
  updated_duration bigint,
  edited_duration bigint,
  ff79c text[],
  f0fe3 text[],
  f0fe3_captions text[],
  f92ff text[],
  f92ff_names text[],
  f4cf8 text,
  f335a text,
  f3789 text,
  CONSTRAINT tmp_new_form_67777_4ccf_pkey PRIMARY KEY (id)
);
INSERT INTO organization_1.tmp_new_form_67777_4ccf (id, resource_id, record_id, record_resource_id, parent_resource_id, record_project_id, record_project_resource_id, record_assigned_to_id, record_assigned_to_resource_id, record_status, index, latitude, longitude, created_at, updated_at, version, created_by_id, created_by_resource_id, updated_by_id, updated_by_resource_id, server_created_at, server_updated_at, record_index_text, record_index, geometry, altitude, speed, course, horizontal_accuracy, vertical_accuracy, form_values, changeset_id, changeset_resource_id, title, created_latitude, created_longitude, created_geometry, created_altitude, created_horizontal_accuracy, updated_latitude, updated_longitude, updated_geometry, updated_altitude, updated_horizontal_accuracy, created_duration, updated_duration, edited_duration, ff79c, f0fe3, f0fe3_captions, f92ff, f92ff_names, f4cf8, f335a, f3789) SELECT id, resource_id, record_id, record_resource_id, parent_resource_id, record_project_id, record_project_resource_id, record_assigned_to_id, record_assigned_to_resource_id, record_status, index, latitude, longitude, created_at, updated_at, version, created_by_id, created_by_resource_id, updated_by_id, updated_by_resource_id, server_created_at, server_updated_at, record_index_text, record_index, geometry, altitude, speed, course, horizontal_accuracy, vertical_accuracy, form_values, changeset_id, changeset_resource_id, title, created_latitude, created_longitude, created_geometry, created_altitude, created_horizontal_accuracy, updated_latitude, updated_longitude, updated_geometry, updated_altitude, updated_horizontal_accuracy, created_duration, updated_duration, edited_duration, ff79c, f0fe3, f0fe3_captions, f92ff, f92ff_names, f4cf8, f335a, f3789 FROM organization_1.form_67777_4ccf;
SELECT setval('organization_1.tmp_new_form_67777_4ccf_id_seq', (SELECT MAX(id) FROM organization_1.tmp_new_form_67777_4ccf));
ALTER TABLE organization_1.form_67777_4ccf RENAME TO tmp_old_form_67777_4ccf;
ALTER TABLE organization_1.tmp_old_form_67777_4ccf RENAME CONSTRAINT form_67777_4ccf_pkey TO tmp_old_form_67777_4ccf_pkey;
ALTER SEQUENCE organization_1.form_67777_4ccf_id_seq RENAME TO tmp_old_form_67777_4ccf_id_seq;
ALTER TABLE organization_1.tmp_new_form_67777_4ccf RENAME TO form_67777_4ccf;
ALTER TABLE organization_1.form_67777_4ccf RENAME CONSTRAINT tmp_new_form_67777_4ccf_pkey TO form_67777_4ccf_pkey;
ALTER SEQUENCE organization_1.tmp_new_form_67777_4ccf_id_seq RENAME TO form_67777_4ccf_id_seq;
DROP TABLE IF EXISTS organization_1.tmp_old_form_67777_4ccf CASCADE;
DROP VIEW IF EXISTS organization_1.form_67777_0fe3_view CASCADE;
CREATE OR REPLACE VIEW organization_1.form_67777_0fe3_view AS
SELECT
  record_resource_id AS record_id,
  parent_resource_id AS parent_id,
  text_value AS _photo_id
FROM organization_1.form_67777_values WHERE key = '0fe3';
DROP VIEW IF EXISTS organization_1.form_67777_92ff_view CASCADE;
CREATE OR REPLACE VIEW organization_1.form_67777_92ff_view AS
SELECT
  record_resource_id AS record_id,
  parent_resource_id AS parent_id,
  text_value AS _attachment_id
FROM organization_1.form_67777_values WHERE key = '92ff';
DROP VIEW IF EXISTS organization_1.form_67777_5dcd_view CASCADE;
CREATE OR REPLACE VIEW organization_1.form_67777_5dcd_view AS
SELECT
  record_resource_id AS record_id,
  parent_resource_id AS parent_id,
  text_value AS _photo_id
FROM organization_1.form_67777_values WHERE key = '5dcd';
DROP VIEW IF EXISTS organization_1.form_67777_9f01_view CASCADE;
CREATE OR REPLACE VIEW organization_1.form_67777_9f01_view AS
SELECT
  record_resource_id AS record_id,
  parent_resource_id AS parent_id,
  text_value AS _video_id
FROM organization_1.form_67777_values WHERE key = '9f01';
DROP VIEW IF EXISTS organization_1.form_67777_view CASCADE;
CREATE OR REPLACE VIEW organization_1.form_67777_view AS
SELECT
  record_resource_id AS _record_id,
  record_key AS _record_key,
  record_sequence AS _record_sequence,
  project_resource_id AS _project_id,
  assigned_to_resource_id AS _assigned_to_id,
  status AS _status,
  latitude AS _latitude,
  longitude AS _longitude,
  created_at AS _created_at,
  updated_at AS _updated_at,
  version AS _version,
  created_by_resource_id AS _created_by_id,
  updated_by_resource_id AS _updated_by_id,
  server_created_at AS _server_created_at,
  server_updated_at AS _server_updated_at,
  geometry AS _geometry,
  altitude AS _altitude,
  speed AS _speed,
  course AS _course,
  horizontal_accuracy AS _horizontal_accuracy,
  vertical_accuracy AS _vertical_accuracy,
  changeset_resource_id AS _changeset_id,
  title AS _title,
  created_latitude AS _created_latitude,
  created_longitude AS _created_longitude,
  created_geometry AS _created_geometry,
  created_altitude AS _created_altitude,
  created_horizontal_accuracy AS _created_horizontal_accuracy,
  updated_latitude AS _updated_latitude,
  updated_longitude AS _updated_longitude,
  updated_geometry AS _updated_geometry,
  updated_altitude AS _updated_altitude,
  updated_horizontal_accuracy AS _updated_horizontal_accuracy,
  created_duration AS _created_duration,
  updated_duration AS _updated_duration,
  edited_duration AS _edited_duration,
  f92aa AS open,
  faf33 AS status,
  faf00 AS this_is_a_really_long_data_name_that_exceeds_the_maximum_column,
  faf01 AS this_is_a_really_long_data_name_that_exceeds_the_maximum_colum1,
  faf02 AS this_is_a_really_long_data_name_that_exceeds_the_maximum_colum2,
  faf72 AS park_name,
  f3fcc AS barcode,
  f5046 AS cost,
  f196d AS age,
  f483d AS operator,
  fcff4 AS type_of_facility,
  f0fd9 AS address,
  f0fd9_sub_thoroughfare AS address_sub_thoroughfare,
  f0fd9_thoroughfare AS address_thoroughfare,
  f0fd9_suite AS address_suite,
  f0fd9_locality AS address_locality,
  f0fd9_admin_area AS address_admin_area,
  f0fd9_postal_code AS address_postal_code,
  f0fd9_sub_admin_area AS address_sub_admin_area,
  f0fd9_country AS address_country,
  f6427 AS operating_hours,
  fc00a AS select_colors,
  f3b66 AS classification_test,
  fd088 AS date,
  ff654 AS time,
  f5dcd AS park_photos,
  f5dcd_captions AS park_photos_captions,
  f9f01 AS videos,
  f9f01_captions AS videos_captions,
  fc71a AS signature,
  fc71a_timestamp AS signature_timestamp,
  ff113 AS calculated_park_name,
  fb9d9 AS calculation_description
FROM organization_1.form_67777;
DROP VIEW IF EXISTS organization_1.form_67777_view_full CASCADE;
CREATE OR REPLACE VIEW organization_1.form_67777_view_full AS
SELECT
  record_resource_id AS _record_id,
  record_key AS _record_key,
  record_sequence AS _record_sequence,
  project_resource_id AS _project_id,
  assigned_to_resource_id AS _assigned_to_id,
  status AS _status,
  latitude AS _latitude,
  longitude AS _longitude,
  created_at AS _created_at,
  updated_at AS _updated_at,
  version AS _version,
  created_by_resource_id AS _created_by_id,
  updated_by_resource_id AS _updated_by_id,
  server_created_at AS _server_created_at,
  server_updated_at AS _server_updated_at,
  record_index_text AS _record_index_text,
  record_index AS _record_index,
  geometry AS _geometry,
  altitude AS _altitude,
  speed AS _speed,
  course AS _course,
  horizontal_accuracy AS _horizontal_accuracy,
  vertical_accuracy AS _vertical_accuracy,
  form_values AS _form_values,
  changeset_resource_id AS _changeset_id,
  title AS _title,
  created_latitude AS _created_latitude,
  created_longitude AS _created_longitude,
  created_geometry AS _created_geometry,
  created_altitude AS _created_altitude,
  created_horizontal_accuracy AS _created_horizontal_accuracy,
  updated_latitude AS _updated_latitude,
  updated_longitude AS _updated_longitude,
  updated_geometry AS _updated_geometry,
  updated_altitude AS _updated_altitude,
  updated_horizontal_accuracy AS _updated_horizontal_accuracy,
  created_duration AS _created_duration,
  updated_duration AS _updated_duration,
  edited_duration AS _edited_duration,
  f92aa AS open,
  faf33 AS status,
  faf00 AS this_is_a_really_long_data_name_that_exceeds_the_maximum_column,
  faf01 AS this_is_a_really_long_data_name_that_exceeds_the_maximum_colum1,
  faf02 AS this_is_a_really_long_data_name_that_exceeds_the_maximum_colum2,
  faf72 AS park_name,
  f3fcc AS barcode,
  f5046 AS cost,
  f196d AS age,
  f483d AS operator,
  fcff4 AS type_of_facility,
  f0fd9 AS address,
  f0fd9_sub_thoroughfare AS address_sub_thoroughfare,
  f0fd9_thoroughfare AS address_thoroughfare,
  f0fd9_suite AS address_suite,
  f0fd9_locality AS address_locality,
  f0fd9_admin_area AS address_admin_area,
  f0fd9_postal_code AS address_postal_code,
  f0fd9_sub_admin_area AS address_sub_admin_area,
  f0fd9_country AS address_country,
  f6427 AS operating_hours,
  fc00a AS select_colors,
  f3b66 AS classification_test,
  fd088 AS date,
  ff654 AS time,
  f5dcd AS park_photos,
  f5dcd_captions AS park_photos_captions,
  f9f01 AS videos,
  f9f01_captions AS videos_captions,
  fc71a AS signature,
  fc71a_timestamp AS signature_timestamp,
  ff113 AS calculated_park_name,
  fb9d9 AS calculation_description
FROM organization_1.form_67777;
DROP VIEW IF EXISTS organization_1.form_67777_4ccf_view CASCADE;
CREATE OR REPLACE VIEW organization_1.form_67777_4ccf_view AS
SELECT
  resource_id AS _child_record_id,
  record_resource_id AS _record_id,
  parent_resource_id AS _parent_id,
  record_record_key AS _record_record_key,
  record_record_sequence AS _record_record_sequence,
  record_project_resource_id AS _record_project_id,
  record_assigned_to_resource_id AS _record_assigned_to_id,
  record_status AS _record_status,
  index AS _index,
  latitude AS _latitude,
  longitude AS _longitude,
  created_at AS _created_at,
  updated_at AS _updated_at,
  version AS _version,
  created_by_resource_id AS _created_by_id,
  updated_by_resource_id AS _updated_by_id,
  server_created_at AS _server_created_at,
  server_updated_at AS _server_updated_at,
  geometry AS _geometry,
  changeset_resource_id AS _changeset_id,
  title AS _title,
  created_latitude AS _created_latitude,
  created_longitude AS _created_longitude,
  created_geometry AS _created_geometry,
  created_altitude AS _created_altitude,
  created_horizontal_accuracy AS _created_horizontal_accuracy,
  updated_latitude AS _updated_latitude,
  updated_longitude AS _updated_longitude,
  updated_geometry AS _updated_geometry,
  updated_altitude AS _updated_altitude,
  updated_horizontal_accuracy AS _updated_horizontal_accuracy,
  created_duration AS _created_duration,
  updated_duration AS _updated_duration,
  edited_duration AS _edited_duration,
  ff79c AS feature_type,
  f0fe3 AS photos,
  f0fe3_captions AS photos_captions,
  f92ff AS attachments,
  f92ff_names AS attachments_names,
  f4cf8 AS status,
  f335a AS issue_comment,
  f3789 AS new_repeatable_text_field
FROM organization_1.form_67777_4ccf;
DROP VIEW IF EXISTS organization_1.form_67777_4ccf_view_full CASCADE;
CREATE OR REPLACE VIEW organization_1.form_67777_4ccf_view_full AS
SELECT
  resource_id AS _child_record_id,
  record_resource_id AS _record_id,
  parent_resource_id AS _parent_id,
  record_record_key AS _record_record_key,
  record_record_sequence AS _record_record_sequence,
  record_project_resource_id AS _record_project_id,
  record_assigned_to_resource_id AS _record_assigned_to_id,
  record_status AS _record_status,
  index AS _index,
  latitude AS _latitude,
  longitude AS _longitude,
  created_at AS _created_at,
  updated_at AS _updated_at,
  version AS _version,
  created_by_resource_id AS _created_by_id,
  updated_by_resource_id AS _updated_by_id,
  server_created_at AS _server_created_at,
  server_updated_at AS _server_updated_at,
  record_index_text AS _record_index_text,
  record_index AS _record_index,
  geometry AS _geometry,
  form_values AS _form_values,
  changeset_resource_id AS _changeset_id,
  title AS _title,
  created_latitude AS _created_latitude,
  created_longitude AS _created_longitude,
  created_geometry AS _created_geometry,
  created_altitude AS _created_altitude,
  created_horizontal_accuracy AS _created_horizontal_accuracy,
  updated_latitude AS _updated_latitude,
  updated_longitude AS _updated_longitude,
  updated_geometry AS _updated_geometry,
  updated_altitude AS _updated_altitude,
  updated_horizontal_accuracy AS _updated_horizontal_accuracy,
  created_duration AS _created_duration,
  updated_duration AS _updated_duration,
  edited_duration AS _edited_duration,
  ff79c AS feature_type,
  f0fe3 AS photos,
  f0fe3_captions AS photos_captions,
  f92ff AS attachments,
  f92ff_names AS attachments_names,
  f4cf8 AS status,
  f335a AS issue_comment,
  f3789 AS new_repeatable_text_field
FROM organization_1.form_67777_4ccf;
CREATE UNIQUE INDEX idx_form_67777_record_resource_id ON organization_1.form_67777 USING btree (record_resource_id);
CREATE INDEX idx_form_67777_geometry ON organization_1.form_67777 USING gist (geometry);
CREATE INDEX idx_form_67777_record_index ON organization_1.form_67777 USING gin (record_index) WITH (fastupdate = off);
CREATE INDEX idx_form_67777_status ON organization_1.form_67777 USING btree (status);
CREATE INDEX idx_form_67777_server_updated_at ON organization_1.form_67777 USING btree (server_updated_at);
CREATE INDEX idx_form_67777_record_key ON organization_1.form_67777 USING btree (record_key);
CREATE INDEX idx_form_67777_record_sequence ON organization_1.form_67777 USING btree (record_sequence);
CREATE INDEX idx_form_67777_project_resource_id ON organization_1.form_67777 USING btree (project_resource_id);
CREATE INDEX idx_form_67777_assigned_to_resource_id ON organization_1.form_67777 USING btree (assigned_to_resource_id);
CREATE INDEX idx_form_67777_changeset_resource_id ON organization_1.form_67777 USING btree (changeset_resource_id);
CREATE UNIQUE INDEX idx_form_67777_4ccf_resource_id ON organization_1.form_67777_4ccf USING btree (resource_id);
CREATE INDEX idx_form_67777_4ccf_record_resource_id ON organization_1.form_67777_4ccf USING btree (record_resource_id);
CREATE INDEX idx_form_67777_4ccf_parent_resource_id ON organization_1.form_67777_4ccf USING btree (parent_resource_id);
CREATE INDEX idx_form_67777_4ccf_geometry ON organization_1.form_67777_4ccf USING gist (geometry);
CREATE INDEX idx_form_67777_4ccf_record_index ON organization_1.form_67777_4ccf USING gin (record_index) WITH (fastupdate = off);
CREATE INDEX idx_form_67777_4ccf_record_status ON organization_1.form_67777_4ccf USING btree (record_status);
CREATE INDEX idx_form_67777_4ccf_updated_at ON organization_1.form_67777_4ccf USING btree (updated_at);
CREATE INDEX idx_form_67777_4ccf_record_project_resource_id ON organization_1.form_67777_4ccf USING btree (record_project_resource_id);
CREATE INDEX idx_form_67777_4ccf_record_assigned_to_resource_id ON organization_1.form_67777_4ccf USING btree (record_assigned_to_resource_id);
CREATE INDEX idx_form_67777_4ccf_changeset_resource_id ON organization_1.form_67777_4ccf USING btree (changeset_resource_id);
DELETE FROM "organization_1"."tables" WHERE name = 'form_67777_0fe3_view';
DELETE FROM "organization_1"."columns" WHERE table_name = 'form_67777_0fe3_view';
DELETE FROM "organization_1"."tables" WHERE name = 'form_67777_92ff_view';
DELETE FROM "organization_1"."columns" WHERE table_name = 'form_67777_92ff_view';
DELETE FROM "organization_1"."tables" WHERE name = 'form_67777_5dcd_view';
DELETE FROM "organization_1"."columns" WHERE table_name = 'form_67777_5dcd_view';
DELETE FROM "organization_1"."tables" WHERE name = 'form_67777_9f01_view';
DELETE FROM "organization_1"."columns" WHERE table_name = 'form_67777_9f01_view';
DELETE FROM "organization_1"."tables" WHERE name = 'form_67777_view';
DELETE FROM "organization_1"."columns" WHERE table_name = 'form_67777_view';
DELETE FROM "organization_1"."tables" WHERE name = 'form_67777_view_full';
DELETE FROM "organization_1"."columns" WHERE table_name = 'form_67777_view_full';
DELETE FROM "organization_1"."tables" WHERE name = 'form_67777_values_view';
DELETE FROM "organization_1"."columns" WHERE table_name = 'form_67777_values_view';
DELETE FROM "organization_1"."tables" WHERE name = 'form_67777_4ccf_view';
DELETE FROM "organization_1"."columns" WHERE table_name = 'form_67777_4ccf_view';
DELETE FROM "organization_1"."tables" WHERE name = 'form_67777_4ccf_view_full';
DELETE FROM "organization_1"."columns" WHERE table_name = 'form_67777_4ccf_view_full';
DELETE FROM "organization_1"."tables" WHERE name = 'form_67777_0fe3_view';
DELETE FROM "organization_1"."columns" WHERE table_name = 'form_67777_0fe3_view';
INSERT INTO "organization_1"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'form_67777_0fe3_view', 'Park Inventory Test/photos', 'media', NULL, 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '0fe3', 'PhotoField', 'photos';
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_0fe3_view', 'Park Inventory Test/photos', 'record_id', '1', 'string', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_0fe3_view', 'Park Inventory Test/photos', 'parent_id', '2', 'string', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_0fe3_view', 'Park Inventory Test/photos', '_photo_id', '3', 'string', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
DELETE FROM "organization_1"."tables" WHERE name = 'form_67777_92ff_view';
DELETE FROM "organization_1"."columns" WHERE table_name = 'form_67777_92ff_view';
INSERT INTO "organization_1"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'form_67777_92ff_view', 'Park Inventory Test/attachments', 'media', NULL, 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '92ff', 'AttachmentField', 'attachments';
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_92ff_view', 'Park Inventory Test/attachments', 'record_id', '1', 'string', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_92ff_view', 'Park Inventory Test/attachments', 'parent_id', '2', 'string', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_92ff_view', 'Park Inventory Test/attachments', '_attachment_id', '3', 'string', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
DELETE FROM "organization_1"."tables" WHERE name = 'form_67777_5dcd_view';
DELETE FROM "organization_1"."columns" WHERE table_name = 'form_67777_5dcd_view';
INSERT INTO "organization_1"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'form_67777_5dcd_view', 'Park Inventory Test/park_photos', 'media', NULL, 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '5dcd', 'PhotoField', 'park_photos';
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_5dcd_view', 'Park Inventory Test/park_photos', 'record_id', '1', 'string', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_5dcd_view', 'Park Inventory Test/park_photos', 'parent_id', '2', 'string', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_5dcd_view', 'Park Inventory Test/park_photos', '_photo_id', '3', 'string', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
DELETE FROM "organization_1"."tables" WHERE name = 'form_67777_9f01_view';
DELETE FROM "organization_1"."columns" WHERE table_name = 'form_67777_9f01_view';
INSERT INTO "organization_1"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'form_67777_9f01_view', 'Park Inventory Test/videos', 'media', NULL, 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '9f01', 'VideoField', 'videos';
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_9f01_view', 'Park Inventory Test/videos', 'record_id', '1', 'string', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_9f01_view', 'Park Inventory Test/videos', 'parent_id', '2', 'string', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_9f01_view', 'Park Inventory Test/videos', '_video_id', '3', 'string', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
DELETE FROM "organization_1"."tables" WHERE name = 'form_67777_view';
DELETE FROM "organization_1"."columns" WHERE table_name = 'form_67777_view';
INSERT INTO "organization_1"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'form_67777_view', 'Park Inventory Test', 'form', NULL, 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_record_id', '1', 'string', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_record_key', '2', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_record_sequence', '3', 'integer', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_project_id', '4', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_assigned_to_id', '5', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_status', '6', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_latitude', '7', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_longitude', '8', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_created_at', '9', 'timestamp', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_updated_at', '10', 'timestamp', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_version', '11', 'integer', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_created_by_id', '12', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_updated_by_id', '13', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_server_created_at', '14', 'timestamp', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_server_updated_at', '15', 'timestamp', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_geometry', '16', 'geometry', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_altitude', '17', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_speed', '18', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_course', '19', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_horizontal_accuracy', '20', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_vertical_accuracy', '21', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_changeset_id', '22', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_title', '23', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_created_latitude', '24', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_created_longitude', '25', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_created_geometry', '26', 'geometry', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_created_altitude', '27', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_created_horizontal_accuracy', '28', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_updated_latitude', '29', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_updated_longitude', '30', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_updated_geometry', '31', 'geometry', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_updated_altitude', '32', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_updated_horizontal_accuracy', '33', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_created_duration', '34', 'integer', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_updated_duration', '35', 'integer', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', '_edited_duration', '36', 'integer', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'open', '37', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '92aa', 'YesNoField', 'open', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'status', '38', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', 'af33', 'TextField', 'status', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'this_is_a_really_long_data_name_that_exceeds_the_maximum_column', '39', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', 'af00', 'TextField', 'this_is_a_really_long_data_name_that_exceeds_the_maximum_column_length_of_the_database', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'this_is_a_really_long_data_name_that_exceeds_the_maximum_colum1', '40', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', 'af01', 'TextField', 'this_is_a_really_long_data_name_that_exceeds_the_maximum_column_length_of_the_database_1', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'this_is_a_really_long_data_name_that_exceeds_the_maximum_colum2', '41', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', 'af02', 'TextField', 'this_is_a_really_long_data_name_that_exceeds_the_maximum_column_length_of_the_database_2', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'park_name', '42', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', 'af72', 'TextField', 'park_name', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'barcode', '43', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '3fcc', 'BarcodeField', 'barcode', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'cost', '44', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '5046', 'TextField', 'cost', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'age', '45', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '196d', 'TextField', 'age', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'operator', '46', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '483d', 'TextField', 'operator', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'type_of_facility', '47', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', 'cff4', 'ChoiceField', 'type_of_facility', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'address', '48', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '0fd9', 'AddressField', 'address', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'address_sub_thoroughfare', '49', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '0fd9', 'AddressField', 'address', 'sub_thoroughfare', NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'address_thoroughfare', '50', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '0fd9', 'AddressField', 'address', 'thoroughfare', NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'address_suite', '51', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '0fd9', 'AddressField', 'address', 'suite', NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'address_locality', '52', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '0fd9', 'AddressField', 'address', 'locality', NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'address_admin_area', '53', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '0fd9', 'AddressField', 'address', 'admin_area', NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'address_postal_code', '54', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '0fd9', 'AddressField', 'address', 'postal_code', NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'address_sub_admin_area', '55', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '0fd9', 'AddressField', 'address', 'sub_admin_area', NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'address_country', '56', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '0fd9', 'AddressField', 'address', 'country', NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'operating_hours', '57', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '6427', 'TextField', 'operating_hours', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'select_colors', '58', 'array', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', 'c00a', 'ChoiceField', 'select_colors', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'classification_test', '59', 'array', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '3b66', 'ClassificationField', 'classification_test', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'date', '60', 'date', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', 'd088', 'DateTimeField', 'date', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'time', '61', 'time', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', 'f654', 'TimeField', 'time', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'park_photos', '62', 'array', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '5dcd', 'PhotoField', 'park_photos', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'park_photos_captions', '63', 'array', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '5dcd', 'PhotoField', 'park_photos', 'captions', NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'videos', '64', 'array', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '9f01', 'VideoField', 'videos', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'videos_captions', '65', 'array', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '9f01', 'VideoField', 'videos', 'captions', NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'signature', '66', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', 'c71a', 'SignatureField', 'signature', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'signature_timestamp', '67', 'timestamp', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', 'c71a', 'SignatureField', 'signature', 'timestamp', NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'calculated_park_name', '68', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', 'f113', 'CalculatedField', 'calculated_park_name', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_view', 'Park Inventory Test', 'calculation_description', '69', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', 'b9d9', 'TextField', 'calculation_description', NULL, NULL;
DELETE FROM "organization_1"."tables" WHERE name = 'form_67777_4ccf_view';
DELETE FROM "organization_1"."columns" WHERE table_name = 'form_67777_4ccf_view';
INSERT INTO "organization_1"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', 'repeatable', 'Park Inventory Test', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '4ccf', 'Repeatable', 'park_features';
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_child_record_id', '1', 'string', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_record_id', '2', 'string', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_parent_id', '3', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_record_record_key', '4', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_record_record_sequence', '5', 'integer', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_record_project_id', '6', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_record_assigned_to_id', '7', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_record_status', '8', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_index', '9', 'integer', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_latitude', '10', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_longitude', '11', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_created_at', '12', 'timestamp', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_updated_at', '13', 'timestamp', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_version', '14', 'integer', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_created_by_id', '15', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_updated_by_id', '16', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_server_created_at', '17', 'timestamp', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_server_updated_at', '18', 'timestamp', '0', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_geometry', '19', 'geometry', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_changeset_id', '20', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_title', '21', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_created_latitude', '22', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_created_longitude', '23', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_created_geometry', '24', 'geometry', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_created_altitude', '25', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_created_horizontal_accuracy', '26', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_updated_latitude', '27', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_updated_longitude', '28', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_updated_geometry', '29', 'geometry', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_updated_altitude', '30', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_updated_horizontal_accuracy', '31', 'double', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_created_duration', '32', 'integer', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_updated_duration', '33', 'integer', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', '_edited_duration', '34', 'integer', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', NULL, NULL, NULL, NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', 'feature_type', '35', 'array', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', 'f79c', 'ClassificationField', 'feature_type', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', 'photos', '36', 'array', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '0fe3', 'PhotoField', 'photos', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', 'photos_captions', '37', 'array', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '0fe3', 'PhotoField', 'photos', 'captions', NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', 'attachments', '38', 'array', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '92ff', 'AttachmentField', 'attachments', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', 'attachments_names', '39', 'array', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '92ff', 'AttachmentField', 'attachments', 'names', NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', 'status', '40', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '4cf8', 'ChoiceField', 'status', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', 'issue_comment', '41', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '335a', 'TextField', 'issue_comment', NULL, NULL;
INSERT INTO "organization_1"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'form_67777_4ccf_view', 'Park Inventory Test/park_features', 'new_repeatable_text_field', '42', 'string', '1', 'd3720dff-de27-4e79-a4ec-9dddb6553a45', '3789', 'TextField', 'new_repeatable_text_field', NULL, NULL;