CREATE TABLE IF NOT EXISTS `account_1_tmp_new_form_67777` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `record_id` INTEGER NOT NULL,
  `record_resource_id` TEXT NOT NULL,
  `project_id` INTEGER,
  `assigned_to_id` INTEGER,
  `status` TEXT,
  `latitude` REAL,
  `longitude` REAL,
  `created_at` REAL NOT NULL,
  `updated_at` REAL NOT NULL,
  `f92aa` TEXT,
  `faf33` TEXT,
  `faf00` TEXT,
  `faf01` TEXT,
  `faf02` TEXT,
  `faf72` TEXT,
  `f3fcc` TEXT,
  `f5046` REAL,
  `f196d` REAL,
  `f483d` TEXT,
  `fcff4` TEXT,
  `f0fd9` TEXT,
  `f0fd9_sub_thoroughfare` TEXT,
  `f0fd9_thoroughfare` TEXT,
  `f0fd9_suite` TEXT,
  `f0fd9_locality` TEXT,
  `f0fd9_admin_area` TEXT,
  `f0fd9_postal_code` TEXT,
  `f0fd9_sub_admin_area` TEXT,
  `f0fd9_country` TEXT,
  `f6427` TEXT,
  `fc00a` TEXT,
  `f3b66` TEXT,
  `fd088` REAL,
  `ff654` REAL,
  `f5dcd` TEXT,
  `f9f01` TEXT,
  `fc71a` TEXT,
  `fc71a_timestamp` REAL,
  `ff113` REAL,
  `fb9d9` TEXT
);
INSERT INTO `account_1_tmp_new_form_67777` (`id`, `record_id`, `record_resource_id`, `project_id`, `assigned_to_id`, `status`, `latitude`, `longitude`, `created_at`, `updated_at`, `f92aa`, `faf72`, `f3fcc`, `f5046`, `f196d`, `f483d`, `fcff4`, `f0fd9`, `f0fd9_sub_thoroughfare`, `f0fd9_thoroughfare`, `f0fd9_suite`, `f0fd9_locality`, `f0fd9_admin_area`, `f0fd9_postal_code`, `f0fd9_sub_admin_area`, `f0fd9_country`, `f6427`, `f3b66`, `fd088`, `ff654`, `f5dcd`, `f9f01`, `fc71a`, `fc71a_timestamp`, `ff113`) SELECT `id`, `record_id`, `record_resource_id`, `project_id`, `assigned_to_id`, `status`, `latitude`, `longitude`, `created_at`, `updated_at`, `f92aa`, `faf72`, `f3fcc`, `f5046`, `f196d`, `f483d`, `fcff4`, `f0fd9`, `f0fd9_sub_thoroughfare`, `f0fd9_thoroughfare`, `f0fd9_suite`, `f0fd9_locality`, `f0fd9_admin_area`, `f0fd9_postal_code`, `f0fd9_sub_admin_area`, `f0fd9_country`, `f6427`, `f3b66`, `fd088`, `ff654`, `f5dcd`, `f9f01`, `fc71a`, `fc71a_timestamp`, (CASE WHEN LENGTH(TRIM(`ff113`)) = 0 THEN NULL WHEN CAST(`ff113` AS REAL) = 0 AND LENGTH(TRIM(REPLACE(REPLACE(REPLACE(`ff113`, '.', ''), '0', ' '), '-', ''))) > 0 THEN NULL ELSE CAST(`ff113` AS REAL) END) FROM `account_1_form_67777`;
ALTER TABLE `account_1_form_67777` RENAME TO `account_1_tmp_old_form_67777`;
ALTER TABLE `account_1_tmp_new_form_67777` RENAME TO `account_1_form_67777`;
DROP TABLE IF EXISTS `account_1_tmp_old_form_67777`;
ALTER TABLE `account_1_form_67777_4ccf` ADD COLUMN `f3789` TEXT;
DROP VIEW IF EXISTS `account_1_form_67777_0fe3_view`;
CREATE VIEW IF NOT EXISTS `account_1_form_67777_0fe3_view` AS
SELECT
  `record_resource_id` AS `record_id`,
  `parent_resource_id` AS `parent_id`,
  `text_value` AS `_photo_id`
FROM `account_1_form_67777_values` WHERE key = '0fe3';
DROP VIEW IF EXISTS `account_1_form_67777_92ff_view`;
CREATE VIEW IF NOT EXISTS `account_1_form_67777_92ff_view` AS
SELECT
  `record_resource_id` AS `record_id`,
  `parent_resource_id` AS `parent_id`,
  `text_value` AS `_attachment_id`
FROM `account_1_form_67777_values` WHERE key = '92ff';
DROP VIEW IF EXISTS `account_1_form_67777_5dcd_view`;
CREATE VIEW IF NOT EXISTS `account_1_form_67777_5dcd_view` AS
SELECT
  `record_resource_id` AS `record_id`,
  `parent_resource_id` AS `parent_id`,
  `text_value` AS `_photo_id`
FROM `account_1_form_67777_values` WHERE key = '5dcd';
DROP VIEW IF EXISTS `account_1_form_67777_9f01_view`;
CREATE VIEW IF NOT EXISTS `account_1_form_67777_9f01_view` AS
SELECT
  `record_resource_id` AS `record_id`,
  `parent_resource_id` AS `parent_id`,
  `text_value` AS `_video_id`
FROM `account_1_form_67777_values` WHERE key = '9f01';
CREATE INDEX IF NOT EXISTS `idx_account_1_form_67777_record_id` ON `account_1_form_67777` (record_id);
CREATE INDEX IF NOT EXISTS `idx_account_1_form_67777_record_resource_id` ON `account_1_form_67777` (record_resource_id);