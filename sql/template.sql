CREATE TABLE IF NOT EXISTS audio (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  access_key text NOT NULL,
  record_id bigint,
  record_resource_id text,
  form_id bigint,
  form_resource_id text,
  metadata text,
  file_size bigint,
  created_by_id bigint,
  created_by_resource_id text,
  updated_by_id bigint,
  updated_by_resource_id text,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  file text,
  content_type text,
  uploaded_at timestamp without time zone,
  stored_at timestamp without time zone,
  processed_at timestamp without time zone,
  small_processed_at timestamp without time zone,
  medium_processed_at timestamp without time zone,
  has_track boolean,
  track text,
  geometry geometry(Geometry, 4326),
  duration double precision,
  CONSTRAINT audio_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS changesets (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  form_id bigint NOT NULL,
  form_resource_id text,
  metadata text,
  closed_at timestamp without time zone,
  created_by_id bigint,
  created_by_resource_id text,
  updated_by_id bigint,
  updated_by_resource_id text,
  closed_by_id bigint,
  closed_by_resource_id text,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  min_lat double precision,
  max_lat double precision,
  min_lon double precision,
  max_lon double precision,
  number_of_changes bigint,
  number_of_creates bigint,
  number_of_updates bigint,
  number_of_deletes bigint,
  metadata_index_text text,
  metadata_index tsvector,
  CONSTRAINT changesets_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS choice_lists (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  name text NOT NULL,
  description text,
  version bigint NOT NULL,
  items text NOT NULL,
  created_by_id bigint,
  created_by_resource_id text,
  updated_by_id bigint,
  updated_by_resource_id text,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  CONSTRAINT choice_lists_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS classification_sets (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  name text NOT NULL,
  description text,
  version bigint NOT NULL,
  items text NOT NULL,
  created_by_id bigint,
  created_by_resource_id text,
  updated_by_id bigint,
  updated_by_resource_id text,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  CONSTRAINT classification_sets_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS forms (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  name text NOT NULL,
  description text,
  version bigint NOT NULL,
  elements text,
  bounding_box geometry(Geometry, 4326),
  record_count bigint NOT NULL DEFAULT 0,
  record_changed_at timestamp without time zone,
  recent_lat_longs text,
  status text,
  status_field text,
  created_by_id bigint,
  created_by_resource_id text,
  updated_by_id bigint,
  updated_by_resource_id text,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  photo_usage bigint,
  photo_count bigint,
  video_usage bigint,
  video_count bigint,
  audio_usage bigint,
  audio_count bigint,
  signature_usage bigint,
  signature_count bigint,
  media_usage bigint,
  media_count bigint,
  auto_assign boolean NOT NULL,
  title_field_keys text[],
  hidden_on_dashboard boolean NOT NULL,
  geometry_types text[],
  geometry_required boolean NOT NULL,
  script text,
  image text,
  projects_enabled boolean NOT NULL,
  assignment_enabled boolean NOT NULL,
  CONSTRAINT forms_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS memberships (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  user_id bigint NOT NULL,
  user_resource_id text,
  first_name text,
  last_name text,
  name text,
  email text,
  role_id bigint NOT NULL,
  role_resource_id text NOT NULL,
  role_name text NOT NULL,
  status text,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  CONSTRAINT memberships_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS photos (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  access_key text NOT NULL,
  record_id bigint,
  record_resource_id text,
  form_id bigint,
  form_resource_id text,
  exif text,
  file_size bigint,
  created_by_id bigint,
  created_by_resource_id text,
  updated_by_id bigint,
  updated_by_resource_id text,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  file text,
  content_type text,
  uploaded_at timestamp without time zone,
  stored_at timestamp without time zone,
  processed_at timestamp without time zone,
  geometry geometry(Geometry, 4326),
  latitude double precision,
  longitude double precision,
  accuracy double precision,
  width bigint,
  height bigint,
  CONSTRAINT photos_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS projects (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  name text NOT NULL,
  description text,
  created_by_id bigint,
  created_by_resource_id text,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  CONSTRAINT projects_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS roles (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  name text NOT NULL,
  description text,
  created_by_id bigint,
  created_by_resource_id text,
  updated_by_id bigint,
  updated_by_resource_id text,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  is_system boolean NOT NULL,
  is_default boolean NOT NULL,
  can_manage_subscription boolean NOT NULL DEFAULT 0,
  can_update_organization boolean NOT NULL DEFAULT 0,
  can_manage_members boolean NOT NULL DEFAULT 0,
  can_manage_roles boolean NOT NULL DEFAULT 0,
  can_manage_apps boolean NOT NULL DEFAULT 0,
  can_manage_projects boolean NOT NULL DEFAULT 0,
  can_manage_choice_lists boolean NOT NULL DEFAULT 0,
  can_manage_classification_sets boolean NOT NULL DEFAULT 0,
  can_create_records boolean NOT NULL DEFAULT 0,
  can_update_records boolean NOT NULL DEFAULT 0,
  can_delete_records boolean NOT NULL DEFAULT 0,
  can_change_status boolean NOT NULL DEFAULT 0,
  can_change_project boolean NOT NULL DEFAULT 0,
  can_assign_records boolean NOT NULL DEFAULT 0,
  can_import_records boolean NOT NULL DEFAULT 0,
  can_export_records boolean NOT NULL DEFAULT 0,
  can_run_reports boolean NOT NULL DEFAULT 0,
  CONSTRAINT roles_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS signatures (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  access_key text NOT NULL,
  record_id bigint,
  record_resource_id text,
  form_id bigint,
  form_resource_id text,
  exif text,
  file_size bigint,
  created_by_id bigint,
  created_by_resource_id text,
  updated_by_id bigint,
  updated_by_resource_id text,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  file text,
  content_type text,
  uploaded_at timestamp without time zone,
  stored_at timestamp without time zone,
  processed_at timestamp without time zone,
  CONSTRAINT signatures_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS videos (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  access_key text NOT NULL,
  record_id bigint,
  record_resource_id text,
  form_id bigint,
  form_resource_id text,
  metadata text,
  file_size bigint,
  created_by_id bigint,
  created_by_resource_id text,
  updated_by_id bigint,
  updated_by_resource_id text,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  file text,
  content_type text,
  uploaded_at timestamp without time zone,
  stored_at timestamp without time zone,
  processed_at timestamp without time zone,
  small_processed_at timestamp without time zone,
  medium_processed_at timestamp without time zone,
  has_track boolean,
  track text,
  geometry geometry(Geometry, 4326),
  width bigint,
  height bigint,
  duration double precision,
  CONSTRAINT videos_pkey PRIMARY KEY (id)
);

DROP VIEW IF EXISTS audio_view;

CREATE OR REPLACE VIEW audio_view AS
SELECT
  access_key AS _audio_id,
  record_resource_id AS _record_id,
  form_resource_id AS _form_id,
  metadata AS metadata,
  file_size AS file_size,
  created_by_resource_id AS created_by_id,
  updated_by_resource_id AS updated_by_id,
  created_at AS created_at,
  updated_at AS updated_at,
  file AS file,
  content_type AS content_type,
  uploaded_at AS uploaded_at,
  stored_at AS stored_at,
  processed_at AS processed_at,
  has_track AS has_track,
  track AS track,
  geometry AS geometry,
  duration AS duration
FROM audio;

DROP VIEW IF EXISTS changesets_view;

CREATE OR REPLACE VIEW changesets_view AS
SELECT
  row_resource_id AS _changeset_id,
  form_resource_id AS _form_id,
  metadata AS metadata,
  closed_at AS closed_at,
  created_by_resource_id AS _created_by_id,
  updated_by_resource_id AS _updated_by_id,
  closed_by_resource_id AS _closed_by_id,
  created_at AS created_at,
  updated_at AS updated_at,
  min_lat AS min_lat,
  max_lat AS max_lat,
  min_lon AS min_lon,
  max_lon AS max_lon,
  number_of_changes AS number_of_changes,
  number_of_creates AS number_of_creates,
  number_of_updates AS number_of_updates,
  number_of_deletes AS number_of_deletes,
  metadata_index AS _metadata_index
FROM changesets;

DROP VIEW IF EXISTS choice_lists_view;

CREATE OR REPLACE VIEW choice_lists_view AS
SELECT
  row_resource_id AS _choice_list_id,
  name AS name,
  description AS description,
  version AS version,
  items AS items,
  created_by_resource_id AS _created_by_id,
  updated_by_resource_id AS _updated_by_id,
  created_at AS created_at,
  updated_at AS updated_at
FROM choice_lists;

DROP VIEW IF EXISTS classification_sets_view;

CREATE OR REPLACE VIEW classification_sets_view AS
SELECT
  row_resource_id AS _classification_set_id,
  name AS name,
  description AS description,
  version AS version,
  items AS items,
  created_by_resource_id AS _created_by_id,
  updated_by_resource_id AS _updated_by_id,
  created_at AS created_at,
  updated_at AS updated_at
FROM classification_sets;

DROP VIEW IF EXISTS forms_view;

CREATE OR REPLACE VIEW forms_view AS
SELECT
  row_resource_id AS _form_id,
  name AS name,
  description AS description,
  version AS version,
  elements AS elements,
  bounding_box AS bounding_box,
  status AS status,
  status_field AS status_field,
  created_by_resource_id AS _created_by_id,
  updated_by_resource_id AS _updated_by_id,
  created_at AS created_at,
  updated_at AS updated_at,
  auto_assign AS auto_assign,
  title_field_keys AS title_field_keys,
  hidden_on_dashboard AS hidden_on_dashboard,
  geometry_types AS geometry_types,
  geometry_required AS geometry_required,
  script AS script,
  image AS image,
  projects_enabled AS projects_enabled,
  assignment_enabled AS assignment_enabled
FROM forms;

DROP VIEW IF EXISTS memberships_view;

CREATE OR REPLACE VIEW memberships_view AS
SELECT
  row_resource_id AS _membership_id,
  user_resource_id AS _user_id,
  first_name AS first_name,
  last_name AS last_name,
  name AS name,
  email AS email,
  role_resource_id AS _role_id,
  role_name AS role_name,
  status AS status,
  created_at AS created_at,
  updated_at AS updated_at
FROM memberships;

DROP VIEW IF EXISTS photos_view;

CREATE OR REPLACE VIEW photos_view AS
SELECT
  access_key AS _photo_id,
  record_resource_id AS _record_id,
  form_resource_id AS _form_id,
  exif AS exif,
  file_size AS file_size,
  created_by_resource_id AS _created_by_id,
  updated_by_resource_id AS _updated_by_id,
  created_at AS created_at,
  updated_at AS updated_at,
  file AS file,
  content_type AS content_type,
  uploaded_at AS uploaded_at,
  stored_at AS stored_at,
  processed_at AS processed_at,
  geometry AS geometry,
  latitude AS latitude,
  longitude AS longitude,
  accuracy AS accuracy,
  width AS width,
  height AS height
FROM photos;

DROP VIEW IF EXISTS projects_view;

CREATE OR REPLACE VIEW projects_view AS
SELECT
  row_resource_id AS _project_id,
  name AS name,
  description AS description,
  created_by_resource_id AS _created_by_id,
  created_at AS created_at,
  updated_at AS updated_at
FROM projects;

DROP VIEW IF EXISTS roles_view;

CREATE OR REPLACE VIEW roles_view AS
SELECT
  row_resource_id AS _role_id,
  name AS name,
  description AS description,
  created_by_resource_id AS _created_by_id,
  updated_by_resource_id AS _updated_by_id,
  created_at AS created_at,
  updated_at AS updated_at,
  is_system AS is_system,
  is_default AS is_default,
  can_manage_subscription AS can_manage_subscription,
  can_update_organization AS can_update_organization,
  can_manage_members AS can_manage_members,
  can_manage_roles AS can_manage_roles,
  can_manage_apps AS can_manage_apps,
  can_manage_projects AS can_manage_projects,
  can_manage_choice_lists AS can_manage_choice_lists,
  can_manage_classification_sets AS can_manage_classification_sets,
  can_create_records AS can_create_records,
  can_update_records AS can_update_records,
  can_delete_records AS can_delete_records,
  can_change_status AS can_change_status,
  can_change_project AS can_change_project,
  can_assign_records AS can_assign_records,
  can_import_records AS can_import_records,
  can_export_records AS can_export_records,
  can_run_reports AS can_run_reports
FROM roles;

DROP VIEW IF EXISTS signatures_view;

CREATE OR REPLACE VIEW signatures_view AS
SELECT
  access_key AS _signature_id,
  record_resource_id AS _record_id,
  form_resource_id AS _form_id,
  file_size AS file_size,
  created_by_resource_id AS created_by_id,
  updated_by_resource_id AS updated_by_id,
  created_at AS created_at,
  updated_at AS updated_at,
  file AS file,
  content_type AS content_type,
  uploaded_at AS uploaded_at,
  stored_at AS stored_at,
  processed_at AS processed_at
FROM signatures;

DROP VIEW IF EXISTS videos_view;

CREATE OR REPLACE VIEW videos_view AS
SELECT
  access_key AS _video_id,
  record_resource_id AS _record_id,
  form_resource_id AS _form_id,
  metadata AS metadata,
  file_size AS file_size,
  created_by_resource_id AS _created_by_id,
  updated_by_resource_id AS _updated_by_id,
  created_at AS created_at,
  updated_at AS updated_at,
  file AS file,
  content_type AS content_type,
  uploaded_at AS uploaded_at,
  stored_at AS stored_at,
  processed_at AS processed_at,
  has_track AS has_track,
  track AS track,
  geometry AS geometry,
  width AS width,
  height AS height,
  duration AS duration
FROM videos;

CREATE INDEX idx_changesets_row_resource_id ON changesets USING btree (row_resource_id);

CREATE INDEX idx_changesets_form_id ON changesets USING btree (form_id);

CREATE INDEX idx_changesets_metadata_index ON changesets USING gin (metadata_index);

CREATE INDEX idx_changesets_form_id_updated_at ON changesets USING btree (form_id, updated_at);

CREATE INDEX idx_changesets_updated_at ON changesets USING btree (updated_at);

CREATE INDEX idx_choice_lists_row_resource_id ON choice_lists USING btree (row_resource_id);

CREATE INDEX idx_choice_lists_name ON choice_lists USING btree (name);

CREATE INDEX idx_choice_lists_updated_at ON choice_lists USING btree (updated_at);

CREATE INDEX idx_forms_row_resource_id ON forms USING btree (row_resource_id);

CREATE INDEX idx_forms_name ON forms USING btree (name);

CREATE INDEX idx_forms_updated_at ON forms USING btree (updated_at);
