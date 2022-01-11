CREATE TABLE IF NOT EXISTS `account_1_form_67777` (
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
  `fb9d9` TEXT,
  `f92ab` INTEGER,
  `f92ac` TEXT,
  `f92ac_schema` TEXT
);
CREATE TABLE IF NOT EXISTS `account_1_form_67777_values` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `record_id` INTEGER NOT NULL,
  `parent_resource_id` TEXT,
  `key` TEXT NOT NULL,
  `text_value` TEXT,
  `number_value` REAL
);
CREATE TABLE IF NOT EXISTS `account_1_form_67777_4ccf` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `record_id` INTEGER NOT NULL,
  `record_resource_id` TEXT NOT NULL,
  `resource_id` TEXT NOT NULL,
  `parent_resource_id` TEXT,
  `latitude` REAL,
  `longitude` REAL,
  `created_at` REAL NOT NULL,
  `updated_at` REAL NOT NULL,
  `ff79c` TEXT,
  `f0fe3` TEXT,
  `f92ff` TEXT,
  `f92ff_names` TEXT,
  `f4cf8` TEXT,
  `f335a` TEXT,
  `f3789` TEXT
);
CREATE INDEX IF NOT EXISTS `idx_account_1_form_67777_record_id` ON `account_1_form_67777` (record_id);
CREATE INDEX IF NOT EXISTS `idx_account_1_form_67777_record_resource_id` ON `account_1_form_67777` (record_resource_id);
CREATE INDEX IF NOT EXISTS `idx_account_1_form_67777_values_record_id` ON `account_1_form_67777_values` (record_id);
CREATE INDEX IF NOT EXISTS `idx_account_1_form_67777_values_parent_resource_id` ON `account_1_form_67777_values` (parent_resource_id);
CREATE INDEX IF NOT EXISTS `idx_account_1_form_67777_4ccf_resource_id` ON `account_1_form_67777_4ccf` (resource_id);
CREATE INDEX IF NOT EXISTS `idx_account_1_form_67777_4ccf_record_id` ON `account_1_form_67777_4ccf` (record_id);
CREATE INDEX IF NOT EXISTS `idx_account_1_form_67777_4ccf_record_resource_id` ON `account_1_form_67777_4ccf` (record_resource_id);
CREATE INDEX IF NOT EXISTS `idx_account_1_form_67777_4ccf_parent_resource_id` ON `account_1_form_67777_4ccf` (parent_resource_id);