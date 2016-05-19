CREATE TABLE IF NOT EXISTS "changesets" (
  "id" bigserial NOT NULL,
  "row_id" bigint NOT NULL,
  "row_resource_id" text NOT NULL,
  "form_id" bigint NOT NULL,
  "form_resource_id" text,
  "metadata" text,
  "closed_at" timestamp without time zone,
  "created_by_id" bigint,
  "created_by_resource_id" text,
  "updated_by_id" bigint,
  "updated_by_resource_id" text,
  "closed_by_id" bigint,
  "closed_by_resource_id" text,
  "created_at" timestamp without time zone NOT NULL,
  "updated_at" timestamp without time zone NOT NULL,
  "min_lat" float,
  "max_lat" float,
  "min_lon" float,
  "max_lon" float,
  "number_of_changes" bigint,
  "number_of_creates" bigint,
  "number_of_updates" bigint,
  "number_of_deletes" bigint,
  "metadata_index_text" text,
  "metadata_index" tsvector,
  CONSTRAINT "changesets_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "forms" (
  "id" bigserial NOT NULL,
  "row_id" bigint NOT NULL,
  "row_resource_id" text NOT NULL,
  "name" text,
  "description" text,
  "version" bigint NOT NULL,
  "elements" text,
  "bounding_box" geometry(Geometry, 4326),
  "status" text,
  "status_field" text,
  "created_by_id" bigint,
  "created_by_resource_id" text,
  "updated_by_id" bigint,
  "updated_by_resource_id" text,
  "created_at" timestamp without time zone NOT NULL,
  "updated_at" timestamp without time zone NOT NULL,
  "auto_assign" boolean NOT NULL,
  "title_field_keys" text[],
  "hidden_on_dashboard" boolean NOT NULL,
  "geometry_types" text[],
  "geometry_required" boolean NOT NULL,
  "script" text,
  CONSTRAINT "forms_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "choice_lists" (
  "id" bigserial NOT NULL,
  "row_id" bigint NOT NULL,
  "row_resource_id" text NOT NULL,
  "name" text,
  "description" text,
  "version" bigint NOT NULL,
  "items" text NOT NULL,
  "created_by_id" bigint,
  "created_by_resource_id" text,
  "updated_by_id" bigint,
  "updated_by_resource_id" text,
  "created_at" timestamp without time zone NOT NULL,
  "updated_at" timestamp without time zone NOT NULL,
  CONSTRAINT "choice_lists_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "classification_sets" (
  "id" bigserial NOT NULL,
  "row_id" bigint NOT NULL,
  "row_resource_id" text NOT NULL,
  "name" text,
  "description" text,
  "version" bigint NOT NULL,
  "items" text,
  "created_by_id" bigint,
  "created_by_resource_id" text,
  "updated_by_id" bigint,
  "updated_by_resource_id" text,
  "created_at" timestamp without time zone NOT NULL,
  "updated_at" timestamp without time zone NOT NULL,
  CONSTRAINT "classification_sets_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "projects" (
  "id" bigserial NOT NULL,
  "row_id" bigint NOT NULL,
  "row_resource_id" text NOT NULL,
  "name" text,
  "description" text,
  "created_by_id" bigint,
  "created_by_resource_id" text,
  "created_at" timestamp without time zone NOT NULL,
  "updated_at" timestamp without time zone NOT NULL,
  CONSTRAINT "projects_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "roles" (
  "id" bigserial NOT NULL,
  "row_id" bigint NOT NULL,
  "row_resource_id" text NOT NULL,
  "name" text,
  "description" text,
  "created_by_id" bigint,
  "created_by_resource_id" text,
  "updated_by_id" bigint,
  "updated_by_resource_id" text,
  "created_at" timestamp without time zone NOT NULL,
  "updated_at" timestamp without time zone NOT NULL,
  "is_system" boolean NOT NULL,
  "is_default" boolean NOT NULL,
  "can_manage_subscription" boolean NOT NULL,
  "can_update_organization" boolean NOT NULL,
  "can_manage_members" boolean NOT NULL,
  "can_manage_roles" boolean NOT NULL,
  "can_manage_apps" boolean NOT NULL,
  "can_manage_projects" boolean NOT NULL,
  "can_manage_choice_lists" boolean NOT NULL,
  "can_manage_classification_sets" boolean NOT NULL,
  "can_create_records" boolean NOT NULL,
  "can_update_records" boolean NOT NULL,
  "can_delete_records" boolean NOT NULL,
  "can_change_status" boolean NOT NULL,
  "can_change_project" boolean NOT NULL,
  "can_assign_records" boolean NOT NULL,
  "can_import_records" boolean NOT NULL,
  "can_export_records" boolean NOT NULL,
  "can_run_reports" boolean NOT NULL,
  CONSTRAINT "roles_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "memberships" (
  "id" bigserial NOT NULL,
  "row_id" bigint NOT NULL,
  "row_resource_id" text NOT NULL,
  "user_id" bigint NOT NULL,
  "user_resource_id" text,
  "first_name" text,
  "last_name" text,
  "name" text,
  "email" text,
  "role_id" bigint NOT NULL,
  "role_resource_id" text NOT NULL,
  "role_name" text NOT NULL,
  "status" text,
  "created_at" timestamp without time zone NOT NULL,
  "updated_at" timestamp without time zone NOT NULL,
  CONSTRAINT "memberships_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "photos" (
  "id" bigserial NOT NULL,
  "row_id" bigint NOT NULL,
  "row_resource_id" text NOT NULL,
  "access_key" text NOT NULL,
  "record_id" bigint,
  "record_resource_id" text,
  "form_id" bigint,
  "form_resource_id" text,
  "exif" text,
  "file_size" bigint,
  "created_by_id" bigint,
  "created_by_resource_id" text,
  "updated_by_id" bigint,
  "updated_by_resource_id" text,
  "created_at" timestamp without time zone NOT NULL,
  "updated_at" timestamp without time zone NOT NULL,
  "file" text,
  "content_type" text,
  "uploaded_at" timestamp without time zone,
  "stored_at" timestamp without time zone,
  "processed_at" timestamp without time zone,
  "geometry" geometry(Geometry, 4326),
  "latitude" float,
  "longitude" float,
  CONSTRAINT "photos_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "videos" (
  "id" bigserial NOT NULL,
  "row_id" bigint NOT NULL,
  "row_resource_id" text NOT NULL,
  "access_key" text NOT NULL,
  "record_id" bigint,
  "record_resource_id" text,
  "form_id" bigint,
  "form_resource_id" text,
  "metadata" text,
  "file_size" bigint,
  "created_by_id" bigint,
  "created_by_resource_id" text,
  "updated_by_id" bigint,
  "updated_by_resource_id" text,
  "created_at" timestamp without time zone NOT NULL,
  "updated_at" timestamp without time zone NOT NULL,
  "file" text,
  "content_type" text,
  "uploaded_at" timestamp without time zone,
  "stored_at" timestamp without time zone,
  "processed_at" timestamp without time zone,
  "has_track" boolean,
  "track" text,
  "geometry" geometry(Geometry, 4326),
  CONSTRAINT "videos_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "audio" (
  "id" bigserial NOT NULL,
  "row_id" bigint NOT NULL,
  "row_resource_id" text NOT NULL,
  "access_key" text NOT NULL,
  "record_id" bigint,
  "record_resource_id" text,
  "form_id" bigint,
  "form_resource_id" text,
  "metadata" text,
  "file_size" bigint,
  "created_by_id" bigint,
  "created_by_resource_id" text,
  "updated_by_id" bigint,
  "updated_by_resource_id" text,
  "created_at" timestamp without time zone NOT NULL,
  "updated_at" timestamp without time zone NOT NULL,
  "file" text,
  "content_type" text,
  "uploaded_at" timestamp without time zone,
  "stored_at" timestamp without time zone,
  "processed_at" timestamp without time zone,
  "has_track" boolean,
  "track" text,
  "geometry" geometry(Geometry, 4326),
  CONSTRAINT "audio_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "signatures" (
  "id" bigserial NOT NULL,
  "row_id" bigint NOT NULL,
  "row_resource_id" text NOT NULL,
  "access_key" text NOT NULL,
  "record_id" bigint,
  "record_resource_id" text,
  "form_id" bigint,
  "form_resource_id" text,
  "exif" text,
  "file_size" bigint,
  "created_by_id" bigint,
  "created_by_resource_id" text,
  "updated_by_id" bigint,
  "updated_by_resource_id" text,
  "created_at" timestamp without time zone NOT NULL,
  "updated_at" timestamp without time zone NOT NULL,
  "file" text,
  "content_type" text,
  "uploaded_at" timestamp without time zone,
  "stored_at" timestamp without time zone,
  "processed_at" timestamp without time zone,
  CONSTRAINT "signatures_pkey" PRIMARY KEY (id)
);

DROP VIEW IF EXISTS "changesets_view";

CREATE OR REPLACE VIEW "changesets_view" AS SELECT "row_resource_id" AS "_changeset_id", "form_resource_id" AS "_form_id", "metadata" AS "metadata", "closed_at" AS "closed_at", "created_by_resource_id" AS "_created_by_id", "updated_by_resource_id" AS "_updated_by_id", "closed_by_resource_id" AS "_closed_by_id", "created_at" AS "created_at", "updated_at" AS "updated_at", "min_lat" AS "min_lat", "max_lat" AS "max_lat", "min_lon" AS "min_lon", "max_lon" AS "max_lon", "number_of_changes" AS "number_of_changes", "number_of_creates" AS "number_of_creates", "number_of_updates" AS "number_of_updates", "number_of_deletes" AS "number_of_deletes" FROM "changesets";

DROP VIEW IF EXISTS "forms_view";

CREATE OR REPLACE VIEW "forms_view" AS SELECT "row_resource_id" AS "_form_id", "name" AS "name", "description" AS "description", "version" AS "version", "elements" AS "elements", "bounding_box" AS "bounding_box", "status" AS "status", "status_field" AS "status_field", "created_by_resource_id" AS "_created_by_id", "updated_by_resource_id" AS "_updated_by_id", "created_at" AS "created_at", "updated_at" AS "updated_at", "auto_assign" AS "auto_assign", "title_field_keys" AS "title_field_keys", "hidden_on_dashboard" AS "hidden_on_dashboard", "geometry_types" AS "geometry_types", "geometry_required" AS "geometry_required", "script" AS "script" FROM "forms";

DROP VIEW IF EXISTS "choice_lists_view";

CREATE OR REPLACE VIEW "choice_lists_view" AS SELECT "row_resource_id" AS "_choice_list_id", "name" AS "name", "description" AS "description", "version" AS "version", "items" AS "items", "created_by_resource_id" AS "_created_by_id", "updated_by_resource_id" AS "_updated_by_id", "created_at" AS "created_at", "updated_at" AS "updated_at" FROM "choice_lists";

DROP VIEW IF EXISTS "classification_sets_view";

CREATE OR REPLACE VIEW "classification_sets_view" AS SELECT "row_resource_id" AS "_classification_set_id", "name" AS "name", "description" AS "description", "version" AS "version", "items" AS "items", "created_by_resource_id" AS "_created_by_id", "updated_by_resource_id" AS "_updated_by_id", "created_at" AS "created_at", "updated_at" AS "updated_at" FROM "classification_sets";

DROP VIEW IF EXISTS "projects_view";

CREATE OR REPLACE VIEW "projects_view" AS SELECT "row_resource_id" AS "_project_id", "name" AS "name", "description" AS "description", "created_by_resource_id" AS "_created_by_id", "created_at" AS "created_at", "updated_at" AS "updated_at" FROM "projects";

DROP VIEW IF EXISTS "roles_view";

CREATE OR REPLACE VIEW "roles_view" AS SELECT "row_resource_id" AS "_role_id", "name" AS "name", "description" AS "description", "created_by_resource_id" AS "_created_by_id", "updated_by_resource_id" AS "_updated_by_id", "created_at" AS "created_at", "updated_at" AS "updated_at", "is_system" AS "is_system", "is_default" AS "is_default", "can_manage_subscription" AS "can_manage_subscription", "can_update_organization" AS "can_update_organization", "can_manage_members" AS "can_manage_members", "can_manage_roles" AS "can_manage_roles", "can_manage_apps" AS "can_manage_apps", "can_manage_projects" AS "can_manage_projects", "can_manage_choice_lists" AS "can_manage_choice_lists", "can_manage_classification_sets" AS "can_manage_classification_sets", "can_create_records" AS "can_create_records", "can_update_records" AS "can_update_records", "can_delete_records" AS "can_delete_records", "can_change_status" AS "can_change_status", "can_change_project" AS "can_change_project", "can_assign_records" AS "can_assign_records", "can_import_records" AS "can_import_records", "can_export_records" AS "can_export_records", "can_run_reports" AS "can_run_reports" FROM "roles";

DROP VIEW IF EXISTS "memberships_view";

CREATE OR REPLACE VIEW "memberships_view" AS SELECT "row_resource_id" AS "_membership_id", "user_resource_id" AS "_user_id", "first_name" AS "first_name", "last_name" AS "last_name", "name" AS "name", "email" AS "email", "role_resource_id" AS "_role_id", "role_name" AS "role_name", "status" AS "status", "created_at" AS "created_at", "updated_at" AS "updated_at" FROM "memberships";

DROP VIEW IF EXISTS "photos_view";

CREATE OR REPLACE VIEW "photos_view" AS SELECT "access_key" AS "_photo_id", "record_resource_id" AS "_record_id", "form_resource_id" AS "_form_id", "exif" AS "exif", "file_size" AS "file_size", "created_by_resource_id" AS "_created_by_id", "updated_by_resource_id" AS "_updated_by_id", "created_at" AS "created_at", "updated_at" AS "updated_at", "file" AS "file", "content_type" AS "content_type", "uploaded_at" AS "uploaded_at", "stored_at" AS "stored_at", "processed_at" AS "processed_at", "geometry" AS "geometry", "latitude" AS "latitude", "longitude" AS "longitude" FROM "photos";

DROP VIEW IF EXISTS "videos_view";

CREATE OR REPLACE VIEW "videos_view" AS SELECT "access_key" AS "_video_id", "record_resource_id" AS "_record_id", "form_resource_id" AS "_form_id", "metadata" AS "metadata", "file_size" AS "file_size", "created_by_resource_id" AS "_created_by_id", "updated_by_resource_id" AS "_updated_by_id", "created_at" AS "created_at", "updated_at" AS "updated_at", "file" AS "file", "content_type" AS "content_type", "uploaded_at" AS "uploaded_at", "stored_at" AS "stored_at", "processed_at" AS "processed_at", "has_track" AS "has_track", "track" AS "track", "geometry" AS "geometry" FROM "videos";

DROP VIEW IF EXISTS "audio_view";

CREATE OR REPLACE VIEW "audio_view" AS SELECT "access_key" AS "_audio_id", "record_resource_id" AS "_record_id", "form_resource_id" AS "_form_id", "metadata" AS "metadata", "file_size" AS "file_size", "created_by_resource_id" AS "created_by_id", "updated_by_resource_id" AS "updated_by_id", "created_at" AS "created_at", "updated_at" AS "updated_at", "file" AS "file", "content_type" AS "content_type", "uploaded_at" AS "uploaded_at", "stored_at" AS "stored_at", "processed_at" AS "processed_at", "has_track" AS "has_track", "track" AS "track", "geometry" AS "geometry" FROM "audio";

DROP VIEW IF EXISTS "signatures_view";

CREATE OR REPLACE VIEW "signatures_view" AS SELECT "access_key" AS "_signature_id", "record_resource_id" AS "_record_id", "form_resource_id" AS "_form_id", "file_size" AS "file_size", "created_by_resource_id" AS "created_by_id", "updated_by_resource_id" AS "updated_by_id", "created_at" AS "created_at", "updated_at" AS "updated_at", "file" AS "file", "content_type" AS "content_type", "uploaded_at" AS "uploaded_at", "stored_at" AS "stored_at", "processed_at" AS "processed_at" FROM "signatures";

CREATE TABLE IF NOT EXISTS "tables" (name text, type text, parent text, form_id text);

CREATE TABLE IF NOT EXISTS "columns" (table_name text, name text, ordinal bigint, type text, nullable boolean, form_id text);

DELETE FROM "tables" WHERE name = 'changesets';

DELETE FROM "columns" WHERE table_name = 'changesets';

INSERT INTO "tables" (name, type, parent, form_id) SELECT 'changesets', 'system', NULL, NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = '_changeset_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', '_changeset_id', '1', 'string', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = '_form_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', '_form_id', '2', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = 'metadata';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', 'metadata', '3', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = 'closed_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', 'closed_at', '4', 'timestamp', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = '_created_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', '_created_by_id', '5', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = '_updated_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', '_updated_by_id', '6', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = '_closed_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', '_closed_by_id', '7', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = 'created_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', 'created_at', '8', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = 'updated_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', 'updated_at', '9', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = 'min_lat';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', 'min_lat', '10', 'double', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = 'max_lat';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', 'max_lat', '11', 'double', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = 'min_lon';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', 'min_lon', '12', 'double', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = 'max_lon';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', 'max_lon', '13', 'double', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = 'number_of_changes';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', 'number_of_changes', '14', 'integer', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = 'number_of_creates';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', 'number_of_creates', '15', 'integer', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = 'number_of_updates';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', 'number_of_updates', '16', 'integer', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'changesets' AND name = 'number_of_deletes';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'changesets', 'number_of_deletes', '17', 'integer', '1', NULL;

DELETE FROM "tables" WHERE name = 'forms';

DELETE FROM "columns" WHERE table_name = 'forms';

INSERT INTO "tables" (name, type, parent, form_id) SELECT 'forms', 'system', NULL, NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = '_form_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', '_form_id', '1', 'string', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = 'name';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', 'name', '2', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = 'description';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', 'description', '3', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = 'version';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', 'version', '4', 'integer', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = 'elements';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', 'elements', '5', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = 'bounding_box';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', 'bounding_box', '6', 'geometry', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = 'status';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', 'status', '7', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = 'status_field';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', 'status_field', '8', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = '_created_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', '_created_by_id', '9', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = '_updated_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', '_updated_by_id', '10', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = 'created_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', 'created_at', '11', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = 'updated_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', 'updated_at', '12', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = 'auto_assign';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', 'auto_assign', '13', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = 'title_field_keys';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', 'title_field_keys', '14', 'array', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = 'hidden_on_dashboard';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', 'hidden_on_dashboard', '15', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = 'geometry_types';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', 'geometry_types', '16', 'array', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = 'geometry_required';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', 'geometry_required', '17', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'forms' AND name = 'script';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'forms', 'script', '18', 'text', '1', NULL;

DELETE FROM "tables" WHERE name = 'choice_lists';

DELETE FROM "columns" WHERE table_name = 'choice_lists';

INSERT INTO "tables" (name, type, parent, form_id) SELECT 'choice_lists', 'system', NULL, NULL;

DELETE FROM "columns" WHERE table_name = 'choice_lists' AND name = '_choice_list_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'choice_lists', '_choice_list_id', '1', 'string', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'choice_lists' AND name = 'name';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'choice_lists', 'name', '2', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'choice_lists' AND name = 'description';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'choice_lists', 'description', '3', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'choice_lists' AND name = 'version';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'choice_lists', 'version', '4', 'integer', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'choice_lists' AND name = 'items';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'choice_lists', 'items', '5', 'string', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'choice_lists' AND name = '_created_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'choice_lists', '_created_by_id', '6', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'choice_lists' AND name = '_updated_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'choice_lists', '_updated_by_id', '7', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'choice_lists' AND name = 'created_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'choice_lists', 'created_at', '8', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'choice_lists' AND name = 'updated_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'choice_lists', 'updated_at', '9', 'timestamp', '0', NULL;

DELETE FROM "tables" WHERE name = 'classification_sets';

DELETE FROM "columns" WHERE table_name = 'classification_sets';

INSERT INTO "tables" (name, type, parent, form_id) SELECT 'classification_sets', 'system', NULL, NULL;

DELETE FROM "columns" WHERE table_name = 'classification_sets' AND name = '_classification_set_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'classification_sets', '_classification_set_id', '1', 'string', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'classification_sets' AND name = 'name';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'classification_sets', 'name', '2', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'classification_sets' AND name = 'description';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'classification_sets', 'description', '3', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'classification_sets' AND name = 'version';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'classification_sets', 'version', '4', 'integer', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'classification_sets' AND name = 'items';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'classification_sets', 'items', '5', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'classification_sets' AND name = '_created_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'classification_sets', '_created_by_id', '6', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'classification_sets' AND name = '_updated_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'classification_sets', '_updated_by_id', '7', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'classification_sets' AND name = 'created_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'classification_sets', 'created_at', '8', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'classification_sets' AND name = 'updated_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'classification_sets', 'updated_at', '9', 'timestamp', '0', NULL;

DELETE FROM "tables" WHERE name = 'projects';

DELETE FROM "columns" WHERE table_name = 'projects';

INSERT INTO "tables" (name, type, parent, form_id) SELECT 'projects', 'system', NULL, NULL;

DELETE FROM "columns" WHERE table_name = 'projects' AND name = '_project_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'projects', '_project_id', '1', 'string', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'projects' AND name = 'name';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'projects', 'name', '2', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'projects' AND name = 'description';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'projects', 'description', '3', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'projects' AND name = '_created_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'projects', '_created_by_id', '4', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'projects' AND name = 'created_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'projects', 'created_at', '5', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'projects' AND name = 'updated_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'projects', 'updated_at', '6', 'timestamp', '0', NULL;

DELETE FROM "tables" WHERE name = 'roles';

DELETE FROM "columns" WHERE table_name = 'roles';

INSERT INTO "tables" (name, type, parent, form_id) SELECT 'roles', 'system', NULL, NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = '_role_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', '_role_id', '1', 'string', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'name';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'name', '2', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'description';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'description', '3', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = '_created_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', '_created_by_id', '4', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = '_updated_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', '_updated_by_id', '5', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'created_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'created_at', '6', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'updated_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'updated_at', '7', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'is_system';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'is_system', '8', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'is_default';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'is_default', '9', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_manage_subscription';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_manage_subscription', '10', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_update_organization';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_update_organization', '11', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_manage_members';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_manage_members', '12', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_manage_roles';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_manage_roles', '13', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_manage_apps';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_manage_apps', '14', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_manage_projects';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_manage_projects', '15', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_manage_choice_lists';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_manage_choice_lists', '16', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_manage_classification_sets';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_manage_classification_sets', '17', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_create_records';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_create_records', '18', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_update_records';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_update_records', '19', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_delete_records';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_delete_records', '20', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_change_status';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_change_status', '21', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_change_project';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_change_project', '22', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_assign_records';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_assign_records', '23', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_import_records';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_import_records', '24', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_export_records';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_export_records', '25', 'boolean', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'roles' AND name = 'can_run_reports';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'roles', 'can_run_reports', '26', 'boolean', '0', NULL;

DELETE FROM "tables" WHERE name = 'memberships';

DELETE FROM "columns" WHERE table_name = 'memberships';

INSERT INTO "tables" (name, type, parent, form_id) SELECT 'memberships', 'system', NULL, NULL;

DELETE FROM "columns" WHERE table_name = 'memberships' AND name = '_membership_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'memberships', '_membership_id', '1', 'string', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'memberships' AND name = '_user_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'memberships', '_user_id', '2', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'memberships' AND name = 'first_name';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'memberships', 'first_name', '3', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'memberships' AND name = 'last_name';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'memberships', 'last_name', '4', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'memberships' AND name = 'name';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'memberships', 'name', '5', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'memberships' AND name = 'email';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'memberships', 'email', '6', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'memberships' AND name = '_role_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'memberships', '_role_id', '7', 'string', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'memberships' AND name = 'role_name';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'memberships', 'role_name', '8', 'string', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'memberships' AND name = 'status';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'memberships', 'status', '9', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'memberships' AND name = 'created_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'memberships', 'created_at', '10', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'memberships' AND name = 'updated_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'memberships', 'updated_at', '11', 'timestamp', '0', NULL;

DELETE FROM "tables" WHERE name = 'photos';

DELETE FROM "columns" WHERE table_name = 'photos';

INSERT INTO "tables" (name, type, parent, form_id) SELECT 'photos', 'system', NULL, NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = '_photo_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', '_photo_id', '1', 'string', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = '_record_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', '_record_id', '2', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = '_form_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', '_form_id', '3', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = 'exif';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', 'exif', '4', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = 'file_size';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', 'file_size', '5', 'integer', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = '_created_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', '_created_by_id', '6', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = '_updated_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', '_updated_by_id', '7', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = 'created_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', 'created_at', '8', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = 'updated_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', 'updated_at', '9', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = 'file';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', 'file', '10', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = 'content_type';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', 'content_type', '11', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = 'uploaded_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', 'uploaded_at', '12', 'timestamp', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = 'stored_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', 'stored_at', '13', 'timestamp', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = 'processed_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', 'processed_at', '14', 'timestamp', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = 'geometry';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', 'geometry', '15', 'geometry', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = 'latitude';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', 'latitude', '16', 'double', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'photos' AND name = 'longitude';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'photos', 'longitude', '17', 'double', '1', NULL;

DELETE FROM "tables" WHERE name = 'videos';

DELETE FROM "columns" WHERE table_name = 'videos';

INSERT INTO "tables" (name, type, parent, form_id) SELECT 'videos', 'system', NULL, NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = '_video_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', '_video_id', '1', 'string', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = '_record_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', '_record_id', '2', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = '_form_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', '_form_id', '3', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = 'metadata';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', 'metadata', '4', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = 'file_size';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', 'file_size', '5', 'integer', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = '_created_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', '_created_by_id', '6', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = '_updated_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', '_updated_by_id', '7', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = 'created_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', 'created_at', '8', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = 'updated_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', 'updated_at', '9', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = 'file';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', 'file', '10', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = 'content_type';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', 'content_type', '11', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = 'uploaded_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', 'uploaded_at', '12', 'timestamp', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = 'stored_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', 'stored_at', '13', 'timestamp', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = 'processed_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', 'processed_at', '14', 'timestamp', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = 'has_track';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', 'has_track', '15', 'boolean', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = 'track';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', 'track', '16', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'videos' AND name = 'geometry';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'videos', 'geometry', '17', 'geometry', '1', NULL;

DELETE FROM "tables" WHERE name = 'audio';

DELETE FROM "columns" WHERE table_name = 'audio';

INSERT INTO "tables" (name, type, parent, form_id) SELECT 'audio', 'system', NULL, NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = '_audio_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', '_audio_id', '1', 'string', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = '_record_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', '_record_id', '2', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = '_form_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', '_form_id', '3', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = 'metadata';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', 'metadata', '4', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = 'file_size';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', 'file_size', '5', 'integer', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = 'created_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', 'created_by_id', '6', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = 'updated_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', 'updated_by_id', '7', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = 'created_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', 'created_at', '8', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = 'updated_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', 'updated_at', '9', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = 'file';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', 'file', '10', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = 'content_type';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', 'content_type', '11', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = 'uploaded_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', 'uploaded_at', '12', 'timestamp', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = 'stored_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', 'stored_at', '13', 'timestamp', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = 'processed_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', 'processed_at', '14', 'timestamp', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = 'has_track';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', 'has_track', '15', 'boolean', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = 'track';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', 'track', '16', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'audio' AND name = 'geometry';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'audio', 'geometry', '17', 'geometry', '1', NULL;

DELETE FROM "tables" WHERE name = 'signatures';

DELETE FROM "columns" WHERE table_name = 'signatures';

INSERT INTO "tables" (name, type, parent, form_id) SELECT 'signatures', 'system', NULL, NULL;

DELETE FROM "columns" WHERE table_name = 'signatures' AND name = '_signature_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'signatures', '_signature_id', '1', 'string', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'signatures' AND name = '_record_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'signatures', '_record_id', '2', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'signatures' AND name = '_form_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'signatures', '_form_id', '3', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'signatures' AND name = 'file_size';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'signatures', 'file_size', '4', 'integer', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'signatures' AND name = 'created_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'signatures', 'created_by_id', '5', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'signatures' AND name = 'updated_by_id';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'signatures', 'updated_by_id', '6', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'signatures' AND name = 'created_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'signatures', 'created_at', '7', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'signatures' AND name = 'updated_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'signatures', 'updated_at', '8', 'timestamp', '0', NULL;

DELETE FROM "columns" WHERE table_name = 'signatures' AND name = 'file';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'signatures', 'file', '9', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'signatures' AND name = 'content_type';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'signatures', 'content_type', '10', 'string', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'signatures' AND name = 'uploaded_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'signatures', 'uploaded_at', '11', 'timestamp', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'signatures' AND name = 'stored_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'signatures', 'stored_at', '12', 'timestamp', '1', NULL;

DELETE FROM "columns" WHERE table_name = 'signatures' AND name = 'processed_at';

INSERT INTO "columns" (table_name, name, ordinal, type, nullable, form_id) SELECT 'signatures', 'processed_at', '13', 'timestamp', '1', NULL;
