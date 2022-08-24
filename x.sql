CREATE TABLE IF NOT EXISTS organization.audio (
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
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  file text,
  content_type text,
  uploaded_at timestamp with time zone,
  stored_at timestamp with time zone,
  processed_at timestamp with time zone,
  small_processed_at timestamp with time zone,
  medium_processed_at timestamp with time zone,
  has_track boolean,
  track text,
  geometry geometry(Geometry, 4326),
  duration double precision,
  deleted_at timestamp with time zone,
  CONSTRAINT audio_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization.changesets (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  form_id bigint NOT NULL,
  form_resource_id text,
  metadata text,
  closed_at timestamp with time zone,
  created_by_id bigint,
  created_by_resource_id text,
  updated_by_id bigint,
  updated_by_resource_id text,
  closed_by_id bigint,
  closed_by_resource_id text,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
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

CREATE TABLE IF NOT EXISTS organization.choice_lists (
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
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  CONSTRAINT choice_lists_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization.classification_sets (
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
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  system_type text,
  CONSTRAINT classification_sets_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization.forms (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  name text NOT NULL,
  description text,
  version bigint NOT NULL,
  elements text,
  bounding_box geometry(Geometry, 4326),
  record_count bigint NOT NULL DEFAULT 0,
  record_changed_at timestamp with time zone,
  recent_lat_longs text,
  status text,
  status_field text,
  created_by_id bigint,
  created_by_resource_id text,
  updated_by_id bigint,
  updated_by_resource_id text,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
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
  title_field_keys text,
  hidden_on_dashboard boolean NOT NULL,
  geometry_types text,
  geometry_required boolean NOT NULL,
  script text,
  image text,
  projects_enabled boolean NOT NULL,
  assignment_enabled boolean NOT NULL,
  system_type text,
  CONSTRAINT forms_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization.memberships (
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
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  is_managed boolean,
  CONSTRAINT memberships_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization.photos (
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
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  file text,
  content_type text,
  uploaded_at timestamp with time zone,
  stored_at timestamp with time zone,
  processed_at timestamp with time zone,
  geometry geometry(Geometry, 4326),
  latitude double precision,
  longitude double precision,
  altitude double precision,
  accuracy double precision,
  direction double precision,
  width bigint,
  height bigint,
  make text,
  model text,
  software text,
  deleted_at timestamp with time zone,
  labels text,
  labels_index_content text,
  labels_index tsvector,
  labels_processed_at timestamp with time zone,
  text text,
  text_index_content text,
  text_index tsvector,
  text_processed_at timestamp with time zone,
  CONSTRAINT photos_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization.projects (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  name text NOT NULL,
  description text,
  created_by_id bigint,
  created_by_resource_id text,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  CONSTRAINT projects_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization.roles (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  name text NOT NULL,
  description text,
  created_by_id bigint,
  created_by_resource_id text,
  updated_by_id bigint,
  updated_by_resource_id text,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  is_system boolean NOT NULL,
  is_default boolean NOT NULL,
  can_manage_subscription boolean NOT NULL DEFAULT false,
  can_update_organization boolean NOT NULL DEFAULT false,
  can_manage_members boolean NOT NULL DEFAULT false,
  can_manage_roles boolean NOT NULL DEFAULT false,
  can_manage_apps boolean NOT NULL DEFAULT false,
  can_manage_projects boolean NOT NULL DEFAULT false,
  can_manage_choice_lists boolean NOT NULL DEFAULT false,
  can_manage_classification_sets boolean NOT NULL DEFAULT false,
  can_create_records boolean NOT NULL DEFAULT false,
  can_update_records boolean NOT NULL DEFAULT false,
  can_delete_records boolean NOT NULL DEFAULT false,
  can_change_status boolean NOT NULL DEFAULT false,
  can_change_project boolean NOT NULL DEFAULT false,
  can_assign_records boolean NOT NULL DEFAULT false,
  can_import_records boolean NOT NULL DEFAULT false,
  can_export_records boolean NOT NULL DEFAULT false,
  can_run_reports boolean NOT NULL DEFAULT false,
  can_manage_authorizations boolean NOT NULL DEFAULT false,
  CONSTRAINT roles_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization.signatures (
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
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  file text,
  content_type text,
  uploaded_at timestamp with time zone,
  stored_at timestamp with time zone,
  processed_at timestamp with time zone,
  deleted_at timestamp with time zone,
  CONSTRAINT signatures_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization.videos (
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
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  file text,
  content_type text,
  uploaded_at timestamp with time zone,
  stored_at timestamp with time zone,
  processed_at timestamp with time zone,
  small_processed_at timestamp with time zone,
  medium_processed_at timestamp with time zone,
  has_track boolean,
  track text,
  geometry geometry(Geometry, 4326),
  width bigint,
  height bigint,
  duration double precision,
  deleted_at timestamp with time zone,
  CONSTRAINT videos_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization.query_devices (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  identifier text NOT NULL,
  platform text,
  platform_version text,
  manufacturer text,
  model text,
  application_version text,
  application_build text,
  ip_address text,
  location text,
  latitude double precision,
  longitude double precision,
  accuracy double precision,
  locality text,
  admin_area text,
  postal_code text,
  country text,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  CONSTRAINT query_devices_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization.query_memberships_devices (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  user_id bigint NOT NULL,
  user_resource_id text,
  device_id bigint NOT NULL,
  device_resource_id text,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  CONSTRAINT query_memberships_devices_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization.query_memberships_forms (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  user_id bigint NOT NULL,
  user_resource_id text,
  form_id bigint NOT NULL,
  form_resource_id text,
  CONSTRAINT query_memberships_forms_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization.query_memberships_projects (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  user_id bigint NOT NULL,
  user_resource_id text,
  project_id bigint NOT NULL,
  project_resource_id text,
  CONSTRAINT query_memberships_projects_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization.query_memberships_layers (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  user_id bigint NOT NULL,
  user_resource_id text,
  layer_id bigint NOT NULL,
  layer_resource_id text,
  CONSTRAINT query_memberships_layers_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization.record_links (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  key text NOT NULL,
  form_id bigint NOT NULL,
  form_resource_id text NOT NULL,
  record_id bigint,
  record_resource_id text,
  linked_form_id bigint,
  linked_form_resource_id text,
  linked_record_id bigint,
  linked_record_resource_id text,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  CONSTRAINT record_links_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization.record_series (
  id bigserial NOT NULL,
  row_id bigint NOT NULL,
  row_resource_id text NOT NULL,
  enabled boolean NOT NULL,
  rrule text,
  template text,
  form_id bigint NOT NULL,
  form_resource_id text NOT NULL,
  assigned_to_id bigint,
  assigned_to_resource_id text,
  project_by_id bigint,
  project_resource_id text,
  created_by_id bigint,
  created_by_resource_id text,
  updated_by_id bigint,
  updated_by_resource_id text,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  CONSTRAINT record_series_pkey PRIMARY KEY (id)
);

DROP VIEW IF EXISTS organization.audio_view CASCADE;

CREATE OR REPLACE VIEW organization.audio_view AS
SELECT
  access_key AS audio_id,
  record_resource_id AS record_id,
  form_resource_id AS form_id,
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
  duration AS duration,
  deleted_at AS deleted_at
FROM organization.audio;

DROP VIEW IF EXISTS organization.changesets_view CASCADE;

CREATE OR REPLACE VIEW organization.changesets_view AS
SELECT
  row_resource_id AS changeset_id,
  form_resource_id AS form_id,
  metadata AS metadata,
  closed_at AS closed_at,
  created_by_resource_id AS created_by_id,
  updated_by_resource_id AS updated_by_id,
  closed_by_resource_id AS closed_by_id,
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
  metadata_index AS metadata_index
FROM organization.changesets;

DROP VIEW IF EXISTS organization.choice_lists_view CASCADE;

CREATE OR REPLACE VIEW organization.choice_lists_view AS
SELECT
  row_resource_id AS choice_list_id,
  name AS name,
  description AS description,
  version AS version,
  items AS items,
  created_by_resource_id AS created_by_id,
  updated_by_resource_id AS updated_by_id,
  created_at AS created_at,
  updated_at AS updated_at
FROM organization.choice_lists;

DROP VIEW IF EXISTS organization.classification_sets_view CASCADE;

CREATE OR REPLACE VIEW organization.classification_sets_view AS
SELECT
  row_resource_id AS classification_set_id,
  name AS name,
  description AS description,
  version AS version,
  items AS items,
  created_by_resource_id AS created_by_id,
  updated_by_resource_id AS updated_by_id,
  created_at AS created_at,
  updated_at AS updated_at,
  system_type AS system_type
FROM organization.classification_sets;

DROP VIEW IF EXISTS organization.forms_view CASCADE;

CREATE OR REPLACE VIEW organization.forms_view AS
SELECT
  row_resource_id AS form_id,
  name AS name,
  description AS description,
  version AS version,
  elements AS elements,
  bounding_box AS bounding_box,
  status AS status,
  status_field AS status_field,
  created_by_resource_id AS created_by_id,
  updated_by_resource_id AS updated_by_id,
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
FROM organization.forms;

DROP VIEW IF EXISTS organization.memberships_view CASCADE;

CREATE OR REPLACE VIEW organization.memberships_view AS
SELECT
  row_resource_id AS membership_id,
  user_resource_id AS user_id,
  first_name AS first_name,
  last_name AS last_name,
  name AS name,
  email AS email,
  role_resource_id AS role_id,
  role_name AS role_name,
  status AS status,
  created_at AS created_at,
  updated_at AS updated_at,
  is_managed AS is_managed
FROM organization.memberships;

DROP VIEW IF EXISTS organization.photos_view CASCADE;

CREATE OR REPLACE VIEW organization.photos_view AS
SELECT
  access_key AS photo_id,
  record_resource_id AS record_id,
  form_resource_id AS form_id,
  exif AS exif,
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
  geometry AS geometry,
  latitude AS latitude,
  longitude AS longitude,
  altitude AS altitude,
  accuracy AS accuracy,
  direction AS direction,
  width AS width,
  height AS height,
  make AS make,
  model AS model,
  software AS software,
  deleted_at AS deleted_at,
  labels AS labels,
  labels_index_content AS labels_index_content,
  labels_index AS labels_index,
  labels_processed_at AS labels_processed_at,
  text AS text,
  text_index_content AS text_index_content,
  text_index AS text_index,
  text_processed_at AS text_processed_at
FROM organization.photos;

DROP VIEW IF EXISTS organization.projects_view CASCADE;

CREATE OR REPLACE VIEW organization.projects_view AS
SELECT
  row_resource_id AS project_id,
  name AS name,
  description AS description,
  created_by_resource_id AS created_by_id,
  created_at AS created_at,
  updated_at AS updated_at
FROM organization.projects;

DROP VIEW IF EXISTS organization.roles_view CASCADE;

CREATE OR REPLACE VIEW organization.roles_view AS
SELECT
  row_resource_id AS role_id,
  name AS name,
  description AS description,
  created_by_resource_id AS created_by_id,
  updated_by_resource_id AS updated_by_id,
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
  can_run_reports AS can_run_reports,
  can_manage_authorizations AS can_manage_authorizations
FROM organization.roles;

DROP VIEW IF EXISTS organization.signatures_view CASCADE;

CREATE OR REPLACE VIEW organization.signatures_view AS
SELECT
  access_key AS signature_id,
  record_resource_id AS record_id,
  form_resource_id AS form_id,
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
  deleted_at AS deleted_at
FROM organization.signatures;

DROP VIEW IF EXISTS organization.videos_view CASCADE;

CREATE OR REPLACE VIEW organization.videos_view AS
SELECT
  access_key AS video_id,
  record_resource_id AS record_id,
  form_resource_id AS form_id,
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
  width AS width,
  height AS height,
  duration AS duration,
  deleted_at AS deleted_at
FROM organization.videos;

DROP VIEW IF EXISTS organization.devices_view CASCADE;

CREATE OR REPLACE VIEW organization.devices_view AS
SELECT
  row_resource_id AS device_id,
  identifier AS identifier,
  platform AS platform,
  platform_version AS platform_version,
  manufacturer AS manufacturer,
  model AS model,
  application_version AS application_version,
  application_build AS application_build,
  ip_address AS ip_address,
  location AS location,
  latitude AS latitude,
  longitude AS longitude,
  accuracy AS accuracy,
  locality AS locality,
  admin_area AS admin_area,
  country AS country,
  created_at AS created_at,
  updated_at AS updated_at
FROM organization.query_devices;

DROP VIEW IF EXISTS organization.memberships_devices_view CASCADE;

CREATE OR REPLACE VIEW organization.memberships_devices_view AS
SELECT
  user_resource_id AS user_id,
  device_resource_id AS device_id,
  created_at AS created_at,
  updated_at AS updated_at
FROM organization.query_memberships_devices;

DROP VIEW IF EXISTS organization.memberships_forms_view CASCADE;

CREATE OR REPLACE VIEW organization.memberships_forms_view AS
SELECT
  user_resource_id AS user_id,
  form_resource_id AS form_id
FROM organization.query_memberships_forms;

DROP VIEW IF EXISTS organization.memberships_projects_view CASCADE;

CREATE OR REPLACE VIEW organization.memberships_projects_view AS
SELECT
  user_resource_id AS user_id,
  project_resource_id AS project_id
FROM organization.query_memberships_projects;

DROP VIEW IF EXISTS organization.memberships_layers_view CASCADE;

CREATE OR REPLACE VIEW organization.memberships_layers_view AS
SELECT
  user_resource_id AS user_id,
  layer_resource_id AS layer_id
FROM organization.query_memberships_layers;

DROP VIEW IF EXISTS organization.record_links_view CASCADE;

CREATE OR REPLACE VIEW organization.record_links_view AS
SELECT
  row_resource_id AS record_link_id,
  key AS key,
  form_resource_id AS form_id,
  record_resource_id AS record_id,
  linked_form_resource_id AS linked_form_id,
  linked_record_resource_id AS linked_record_id,
  created_at AS created_at,
  updated_at AS updated_at
FROM organization.record_links;

DROP VIEW IF EXISTS organization.record_series_view CASCADE;

CREATE OR REPLACE VIEW organization.record_series_view AS
SELECT
  row_resource_id AS record_link_id,
  enabled AS enabled,
  rrule AS rrule,
  template AS template,
  form_resource_id AS form_id,
  assigned_to_resource_id AS assigned_to_id,
  project_resource_id AS project_id,
  created_by_resource_id AS created_by_id,
  updated_by_resource_id AS updated_by_id,
  created_at AS created_at,
  updated_at AS updated_at
FROM organization.record_series;

CREATE UNIQUE INDEX idx_audio_row_resource_id ON organization.audio USING btree (row_resource_id);

CREATE UNIQUE INDEX idx_audio_row_id ON organization.audio USING btree (row_id);

CREATE INDEX idx_audio_access_key ON organization.audio USING btree (access_key);

CREATE INDEX idx_audio_record_resource_id ON organization.audio USING btree (record_resource_id);

CREATE INDEX idx_audio_form_resource_id ON organization.audio USING btree (form_resource_id);

CREATE INDEX idx_audio_created_by_resource_id ON organization.audio USING btree (created_by_resource_id);

CREATE INDEX idx_audio_geometry ON organization.audio USING gist (geometry);

CREATE INDEX idx_audio_updated_at ON organization.audio USING btree (updated_at);

CREATE UNIQUE INDEX idx_changesets_row_resource_id ON organization.changesets USING btree (row_resource_id);

CREATE UNIQUE INDEX idx_changesets_row_id ON organization.changesets USING btree (row_id);

CREATE INDEX idx_changesets_form_id ON organization.changesets USING btree (form_id);

CREATE INDEX idx_changesets_metadata_index ON organization.changesets USING gin (metadata_index) WITH (fastupdate = off);

CREATE INDEX idx_changesets_form_id_updated_at ON organization.changesets USING btree (form_id, updated_at);

CREATE INDEX idx_changesets_updated_at ON organization.changesets USING btree (updated_at);

CREATE INDEX idx_changesets_form_resource_id_updated_at ON organization.changesets USING btree (form_resource_id, updated_at);

CREATE INDEX idx_changesets_created_by_resource_id_updated_at ON organization.changesets USING btree (created_by_resource_id, updated_at);

CREATE UNIQUE INDEX idx_choice_lists_row_resource_id ON organization.choice_lists USING btree (row_resource_id);

CREATE UNIQUE INDEX idx_choice_lists_row_id ON organization.choice_lists USING btree (row_id);

CREATE INDEX idx_choice_lists_name ON organization.choice_lists USING btree (name);

CREATE INDEX idx_choice_lists_updated_at ON organization.choice_lists USING btree (updated_at);

CREATE UNIQUE INDEX idx_classification_sets_row_resource_id ON organization.classification_sets USING btree (row_resource_id);

CREATE UNIQUE INDEX idx_classification_sets_row_id ON organization.classification_sets USING btree (row_id);

CREATE INDEX idx_classification_sets_name ON organization.classification_sets USING btree (name);

CREATE INDEX idx_classification_sets_updated_at ON organization.classification_sets USING btree (updated_at);

CREATE UNIQUE INDEX idx_forms_row_resource_id ON organization.forms USING btree (row_resource_id);

CREATE UNIQUE INDEX idx_forms_row_id ON organization.forms USING btree (row_id);

CREATE INDEX idx_forms_name ON organization.forms USING btree (name);

CREATE INDEX idx_forms_updated_at ON organization.forms USING btree (updated_at);

CREATE UNIQUE INDEX idx_memberships_row_resource_id ON organization.memberships USING btree (row_resource_id);

CREATE UNIQUE INDEX idx_memberships_row_id ON organization.memberships USING btree (row_id);

CREATE INDEX idx_memberships_user_resource_id ON organization.memberships USING btree (user_resource_id);

CREATE INDEX idx_memberships_role_resource_id ON organization.memberships USING btree (role_resource_id);

CREATE INDEX idx_memberships_name ON organization.memberships USING btree (name);

CREATE INDEX idx_memberships_updated_at ON organization.memberships USING btree (updated_at);

CREATE UNIQUE INDEX idx_photos_row_resource_id ON organization.photos USING btree (row_resource_id);

CREATE UNIQUE INDEX idx_photos_row_id ON organization.photos USING btree (row_id);

CREATE INDEX idx_photos_access_key ON organization.photos USING btree (access_key);

CREATE INDEX idx_photos_record_resource_id ON organization.photos USING btree (record_resource_id);

CREATE INDEX idx_photos_form_resource_id ON organization.photos USING btree (form_resource_id);

CREATE INDEX idx_photos_created_by_resource_id ON organization.photos USING btree (created_by_resource_id);

CREATE INDEX idx_photos_geometry ON organization.photos USING gist (geometry);

CREATE INDEX idx_photos_updated_at ON organization.photos USING btree (updated_at);

CREATE INDEX idx_photos_labels_index ON organization.photos USING gin (labels_index) WITH (fastupdate = off);

CREATE INDEX idx_photos_text_index ON organization.photos USING gin (text_index) WITH (fastupdate = off);

CREATE UNIQUE INDEX idx_projects_row_resource_id ON organization.projects USING btree (row_resource_id);

CREATE UNIQUE INDEX idx_projects_row_id ON organization.projects USING btree (row_id);

CREATE INDEX idx_projects_name ON organization.projects USING btree (name);

CREATE INDEX idx_projects_updated_at ON organization.projects USING btree (updated_at);

CREATE UNIQUE INDEX idx_roles_row_resource_id ON organization.roles USING btree (row_resource_id);

CREATE UNIQUE INDEX idx_roles_row_id ON organization.roles USING btree (row_id);

CREATE INDEX idx_roles_name ON organization.roles USING btree (name);

CREATE INDEX idx_roles_updated_at ON organization.roles USING btree (updated_at);

CREATE UNIQUE INDEX idx_signatures_row_resource_id ON organization.signatures USING btree (row_resource_id);

CREATE UNIQUE INDEX idx_signatures_row_id ON organization.signatures USING btree (row_id);

CREATE INDEX idx_signatures_access_key ON organization.signatures USING btree (access_key);

CREATE INDEX idx_signatures_record_resource_id ON organization.signatures USING btree (record_resource_id);

CREATE INDEX idx_signatures_form_resource_id ON organization.signatures USING btree (form_resource_id);

CREATE INDEX idx_signatures_created_by_resource_id ON organization.signatures USING btree (created_by_resource_id);

CREATE INDEX idx_signatures_updated_at ON organization.signatures USING btree (updated_at);

CREATE UNIQUE INDEX idx_videos_row_resource_id ON organization.videos USING btree (row_resource_id);

CREATE UNIQUE INDEX idx_videos_row_id ON organization.videos USING btree (row_id);

CREATE INDEX idx_videos_access_key ON organization.videos USING btree (access_key);

CREATE INDEX idx_videos_record_resource_id ON organization.videos USING btree (record_resource_id);

CREATE INDEX idx_videos_form_resource_id ON organization.videos USING btree (form_resource_id);

CREATE INDEX idx_videos_created_by_resource_id ON organization.videos USING btree (created_by_resource_id);

CREATE INDEX idx_videos_geometry ON organization.videos USING gist (geometry);

CREATE INDEX idx_videos_updated_at ON organization.videos USING btree (updated_at);

CREATE UNIQUE INDEX idx_query_devices_row_resource_id ON organization.query_devices USING btree (row_resource_id);

CREATE UNIQUE INDEX idx_query_devices_row_id ON organization.query_devices USING btree (row_id);

CREATE INDEX idx_query_devices_identifier ON organization.query_devices USING btree (identifier);

CREATE INDEX idx_query_devices_platform ON organization.query_devices USING btree (platform);

CREATE INDEX idx_query_devices_manufacturer ON organization.query_devices USING btree (manufacturer);

CREATE INDEX idx_query_devices_updated_at ON organization.query_devices USING btree (updated_at);

CREATE UNIQUE INDEX idx_query_memberships_devices_row_id ON organization.query_memberships_devices USING btree (row_id);

CREATE INDEX idx_query_memberships_devices_user_resource_id ON organization.query_memberships_devices USING btree (user_resource_id);

CREATE INDEX idx_query_memberships_devices_device_resource_id ON organization.query_memberships_devices USING btree (device_resource_id);

CREATE INDEX idx_query_memberships_devices_updated_at ON organization.query_memberships_devices USING btree (updated_at);

CREATE UNIQUE INDEX idx_query_memberships_forms_row_id ON organization.query_memberships_forms USING btree (row_id);

CREATE INDEX idx_query_memberships_forms_user_resource_id ON organization.query_memberships_forms USING btree (user_resource_id);

CREATE INDEX idx_query_memberships_forms_form_resource_id ON organization.query_memberships_forms USING btree (form_resource_id);

CREATE UNIQUE INDEX idx_query_memberships_projects_row_id ON organization.query_memberships_projects USING btree (row_id);

CREATE INDEX idx_query_memberships_projects_user_resource_id ON organization.query_memberships_projects USING btree (user_resource_id);

CREATE INDEX idx_query_memberships_projects_project_resource_id ON organization.query_memberships_projects USING btree (project_resource_id);

CREATE UNIQUE INDEX idx_query_memberships_layers_row_id ON organization.query_memberships_layers USING btree (row_id);

CREATE INDEX idx_query_memberships_layers_user_resource_id ON organization.query_memberships_layers USING btree (user_resource_id);

CREATE INDEX idx_query_memberships_layers_layer_resource_id ON organization.query_memberships_layers USING btree (layer_resource_id);

CREATE UNIQUE INDEX idx_record_links_row_resource_id ON organization.record_links USING btree (row_resource_id);

CREATE UNIQUE INDEX idx_record_links_row_id ON organization.record_links USING btree (row_id);

CREATE INDEX idx_record_links_form_id_key ON organization.record_links USING btree (form_id, key);

CREATE INDEX idx_record_links_form_resource_id_record_resource_id ON organization.record_links USING btree (form_resource_id, record_resource_id);

CREATE INDEX idx_record_links_linked_form_resource_id ON organization.record_links USING btree (linked_form_resource_id);

CREATE INDEX idx_record_links_linked_form_resource_id_linked_record_resource_id ON organization.record_links USING btree (linked_form_resource_id, linked_record_resource_id);

CREATE INDEX idx_record_links_record_resource_id ON organization.record_links USING btree (record_resource_id);

CREATE INDEX idx_record_links_linked_record_resource_id ON organization.record_links USING btree (linked_record_resource_id);

CREATE UNIQUE INDEX idx_record_series_row_resource_id ON organization.record_series USING btree (row_resource_id);

CREATE UNIQUE INDEX idx_record_series_row_id ON organization.record_series USING btree (row_id);

DELETE FROM "organization"."tables" WHERE name = 'audio_view';

DELETE FROM "organization"."columns" WHERE table_name = 'audio_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'audio_view', 'audio', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'audio_id', '1', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'record_id', '2', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'form_id', '3', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'metadata', '4', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'file_size', '5', 'integer', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'created_by_id', '6', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'updated_by_id', '7', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'created_at', '8', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'updated_at', '9', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'file', '10', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'content_type', '11', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'uploaded_at', '12', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'stored_at', '13', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'processed_at', '14', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'has_track', '15', 'boolean', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'track', '16', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'geometry', '17', 'geometry', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'duration', '18', 'double', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'audio_view', 'audio', 'deleted_at', '19', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'changesets_view';

DELETE FROM "organization"."columns" WHERE table_name = 'changesets_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'changesets_view', 'changesets', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'changeset_id', '1', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'form_id', '2', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'metadata', '3', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'closed_at', '4', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'created_by_id', '5', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'updated_by_id', '6', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'closed_by_id', '7', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'created_at', '8', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'updated_at', '9', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'min_lat', '10', 'double', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'max_lat', '11', 'double', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'min_lon', '12', 'double', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'max_lon', '13', 'double', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'number_of_changes', '14', 'integer', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'number_of_creates', '15', 'integer', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'number_of_updates', '16', 'integer', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'number_of_deletes', '17', 'integer', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'changesets_view', 'changesets', 'metadata_index', '18', 'fts', '1', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'choice_lists_view';

DELETE FROM "organization"."columns" WHERE table_name = 'choice_lists_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'choice_lists_view', 'choice_lists', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'choice_lists_view', 'choice_lists', 'choice_list_id', '1', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'choice_lists_view', 'choice_lists', 'name', '2', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'choice_lists_view', 'choice_lists', 'description', '3', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'choice_lists_view', 'choice_lists', 'version', '4', 'integer', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'choice_lists_view', 'choice_lists', 'items', '5', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'choice_lists_view', 'choice_lists', 'created_by_id', '6', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'choice_lists_view', 'choice_lists', 'updated_by_id', '7', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'choice_lists_view', 'choice_lists', 'created_at', '8', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'choice_lists_view', 'choice_lists', 'updated_at', '9', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'classification_sets_view';

DELETE FROM "organization"."columns" WHERE table_name = 'classification_sets_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'classification_sets_view', 'classification_sets', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'classification_sets_view', 'classification_sets', 'classification_set_id', '1', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'classification_sets_view', 'classification_sets', 'name', '2', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'classification_sets_view', 'classification_sets', 'description', '3', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'classification_sets_view', 'classification_sets', 'version', '4', 'integer', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'classification_sets_view', 'classification_sets', 'items', '5', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'classification_sets_view', 'classification_sets', 'created_by_id', '6', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'classification_sets_view', 'classification_sets', 'updated_by_id', '7', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'classification_sets_view', 'classification_sets', 'created_at', '8', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'classification_sets_view', 'classification_sets', 'updated_at', '9', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'classification_sets_view', 'classification_sets', 'system_type', '10', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'forms_view';

DELETE FROM "organization"."columns" WHERE table_name = 'forms_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'forms_view', 'forms', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'form_id', '1', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'name', '2', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'description', '3', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'version', '4', 'integer', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'elements', '5', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'bounding_box', '6', 'geometry', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'status', '7', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'status_field', '8', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'created_by_id', '9', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'updated_by_id', '10', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'created_at', '11', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'updated_at', '12', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'auto_assign', '13', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'title_field_keys', '14', 'json', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'hidden_on_dashboard', '15', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'geometry_types', '16', 'json', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'geometry_required', '17', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'script', '18', 'text', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'image', '19', 'text', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'projects_enabled', '20', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'forms_view', 'forms', 'assignment_enabled', '21', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'memberships_view';

DELETE FROM "organization"."columns" WHERE table_name = 'memberships_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'memberships_view', 'memberships', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_view', 'memberships', 'membership_id', '1', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_view', 'memberships', 'user_id', '2', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_view', 'memberships', 'first_name', '3', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_view', 'memberships', 'last_name', '4', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_view', 'memberships', 'name', '5', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_view', 'memberships', 'email', '6', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_view', 'memberships', 'role_id', '7', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_view', 'memberships', 'role_name', '8', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_view', 'memberships', 'status', '9', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_view', 'memberships', 'created_at', '10', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_view', 'memberships', 'updated_at', '11', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_view', 'memberships', 'is_managed', '12', 'boolean', '1', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'photos_view';

DELETE FROM "organization"."columns" WHERE table_name = 'photos_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'photos_view', 'photos', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'photo_id', '1', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'record_id', '2', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'form_id', '3', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'exif', '4', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'file_size', '5', 'integer', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'created_by_id', '6', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'updated_by_id', '7', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'created_at', '8', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'updated_at', '9', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'file', '10', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'content_type', '11', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'uploaded_at', '12', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'stored_at', '13', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'processed_at', '14', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'geometry', '15', 'geometry', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'latitude', '16', 'double', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'longitude', '17', 'double', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'altitude', '18', 'double', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'accuracy', '19', 'double', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'direction', '20', 'double', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'width', '21', 'integer', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'height', '22', 'integer', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'make', '23', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'model', '24', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'software', '25', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'deleted_at', '26', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'labels', '27', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'labels_index_content', '28', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'labels_index', '29', 'fts', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'labels_processed_at', '30', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'text', '31', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'text_index_content', '32', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'text_index', '33', 'fts', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'photos_view', 'photos', 'text_processed_at', '34', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'projects_view';

DELETE FROM "organization"."columns" WHERE table_name = 'projects_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'projects_view', 'projects', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'projects_view', 'projects', 'project_id', '1', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'projects_view', 'projects', 'name', '2', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'projects_view', 'projects', 'description', '3', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'projects_view', 'projects', 'created_by_id', '4', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'projects_view', 'projects', 'created_at', '5', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'projects_view', 'projects', 'updated_at', '6', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'roles_view';

DELETE FROM "organization"."columns" WHERE table_name = 'roles_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'roles_view', 'roles', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'role_id', '1', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'name', '2', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'description', '3', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'created_by_id', '4', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'updated_by_id', '5', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'created_at', '6', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'updated_at', '7', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'is_system', '8', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'is_default', '9', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_manage_subscription', '10', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_update_organization', '11', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_manage_members', '12', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_manage_roles', '13', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_manage_apps', '14', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_manage_projects', '15', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_manage_choice_lists', '16', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_manage_classification_sets', '17', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_create_records', '18', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_update_records', '19', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_delete_records', '20', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_change_status', '21', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_change_project', '22', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_assign_records', '23', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_import_records', '24', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_export_records', '25', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_run_reports', '26', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'roles_view', 'roles', 'can_manage_authorizations', '27', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'signatures_view';

DELETE FROM "organization"."columns" WHERE table_name = 'signatures_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'signatures_view', 'signatures', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'signatures_view', 'signatures', 'signature_id', '1', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'signatures_view', 'signatures', 'record_id', '2', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'signatures_view', 'signatures', 'form_id', '3', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'signatures_view', 'signatures', 'file_size', '4', 'integer', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'signatures_view', 'signatures', 'created_by_id', '5', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'signatures_view', 'signatures', 'updated_by_id', '6', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'signatures_view', 'signatures', 'created_at', '7', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'signatures_view', 'signatures', 'updated_at', '8', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'signatures_view', 'signatures', 'file', '9', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'signatures_view', 'signatures', 'content_type', '10', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'signatures_view', 'signatures', 'uploaded_at', '11', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'signatures_view', 'signatures', 'stored_at', '12', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'signatures_view', 'signatures', 'processed_at', '13', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'signatures_view', 'signatures', 'deleted_at', '14', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'videos_view';

DELETE FROM "organization"."columns" WHERE table_name = 'videos_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'videos_view', 'videos', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'video_id', '1', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'record_id', '2', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'form_id', '3', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'metadata', '4', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'file_size', '5', 'integer', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'created_by_id', '6', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'updated_by_id', '7', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'created_at', '8', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'updated_at', '9', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'file', '10', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'content_type', '11', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'uploaded_at', '12', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'stored_at', '13', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'processed_at', '14', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'has_track', '15', 'boolean', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'track', '16', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'geometry', '17', 'geometry', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'width', '18', 'integer', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'height', '19', 'integer', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'duration', '20', 'double', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'videos_view', 'videos', 'deleted_at', '21', 'timestamp', '1', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'devices_view';

DELETE FROM "organization"."columns" WHERE table_name = 'devices_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'devices_view', 'devices', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'device_id', '1', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'identifier', '2', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'platform', '3', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'platform_version', '4', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'manufacturer', '5', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'model', '6', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'application_version', '7', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'application_build', '8', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'ip_address', '9', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'location', '10', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'latitude', '11', 'double', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'longitude', '12', 'double', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'accuracy', '13', 'double', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'locality', '14', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'admin_area', '15', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'country', '16', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'created_at', '17', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'devices_view', 'devices', 'updated_at', '18', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'memberships_devices_view';

DELETE FROM "organization"."columns" WHERE table_name = 'memberships_devices_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'memberships_devices_view', 'memberships_devices', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_devices_view', 'memberships_devices', 'user_id', '1', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_devices_view', 'memberships_devices', 'device_id', '2', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_devices_view', 'memberships_devices', 'created_at', '3', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_devices_view', 'memberships_devices', 'updated_at', '4', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'memberships_forms_view';

DELETE FROM "organization"."columns" WHERE table_name = 'memberships_forms_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'memberships_forms_view', 'memberships_forms', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_forms_view', 'memberships_forms', 'user_id', '1', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_forms_view', 'memberships_forms', 'form_id', '2', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'memberships_projects_view';

DELETE FROM "organization"."columns" WHERE table_name = 'memberships_projects_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'memberships_projects_view', 'memberships_projects', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_projects_view', 'memberships_projects', 'user_id', '1', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_projects_view', 'memberships_projects', 'project_id', '2', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'memberships_layers_view';

DELETE FROM "organization"."columns" WHERE table_name = 'memberships_layers_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'memberships_layers_view', 'memberships_layers', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_layers_view', 'memberships_layers', 'user_id', '1', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'memberships_layers_view', 'memberships_layers', 'layer_id', '2', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'record_links_view';

DELETE FROM "organization"."columns" WHERE table_name = 'record_links_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'record_links_view', 'record_links', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_links_view', 'record_links', 'record_link_id', '1', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_links_view', 'record_links', 'key', '2', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_links_view', 'record_links', 'form_id', '3', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_links_view', 'record_links', 'record_id', '4', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_links_view', 'record_links', 'linked_form_id', '5', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_links_view', 'record_links', 'linked_record_id', '6', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_links_view', 'record_links', 'created_at', '7', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_links_view', 'record_links', 'updated_at', '8', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

DELETE FROM "organization"."tables" WHERE name = 'record_series_view';

DELETE FROM "organization"."columns" WHERE table_name = 'record_series_view';

INSERT INTO "organization"."tables" (name, alias, type, parent, form_id, field, field_type, data_name) SELECT 'record_series_view', 'record_series', 'system', NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_series_view', 'record_series', 'record_link_id', '1', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_series_view', 'record_series', 'enabled', '2', 'boolean', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_series_view', 'record_series', 'rrule', '3', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_series_view', 'record_series', 'template', '4', 'jsonb', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_series_view', 'record_series', 'form_id', '5', 'string', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_series_view', 'record_series', 'assigned_to_id', '6', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_series_view', 'record_series', 'project_id', '7', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_series_view', 'record_series', 'created_by_id', '8', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_series_view', 'record_series', 'updated_by_id', '9', 'string', '1', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_series_view', 'record_series', 'created_at', '10', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;

INSERT INTO "organization"."columns" (table_name, table_alias, name, ordinal, type, nullable, form_id, field, field_type, data_name, part, data)
SELECT 'record_series_view', 'record_series', 'updated_at', '11', 'timestamp', '0', NULL, NULL, NULL, NULL, NULL, NULL;
