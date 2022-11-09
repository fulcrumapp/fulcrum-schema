"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const audio_1 = __importDefault(require("./postgres/audio"));
const changesets_1 = __importDefault(require("./postgres/changesets"));
const choice_lists_1 = __importDefault(require("./postgres/choice-lists"));
const classification_sets_1 = __importDefault(require("./postgres/classification-sets"));
const forms_1 = __importDefault(require("./postgres/forms"));
const memberships_1 = __importDefault(require("./postgres/memberships"));
const photos_1 = __importDefault(require("./postgres/photos"));
const projects_1 = __importDefault(require("./postgres/projects"));
const roles_1 = __importDefault(require("./postgres/roles"));
const signatures_1 = __importDefault(require("./postgres/signatures"));
const videos_1 = __importDefault(require("./postgres/videos"));
const devices_1 = __importDefault(require("./postgres/devices"));
const memberships_devices_1 = __importDefault(require("./postgres/memberships-devices"));
const memberships_forms_1 = __importDefault(require("./postgres/memberships-forms"));
const memberships_projects_1 = __importDefault(require("./postgres/memberships-projects"));
const memberships_layers_1 = __importDefault(require("./postgres/memberships-layers"));
const record_links_1 = __importDefault(require("./postgres/record-links"));
const record_series_1 = __importDefault(require("./postgres/record-series"));
const tables = [
    audio_1.default,
    changesets_1.default,
    choice_lists_1.default,
    classification_sets_1.default,
    forms_1.default,
    memberships_1.default,
    photos_1.default,
    projects_1.default,
    roles_1.default,
    signatures_1.default,
    videos_1.default,
    devices_1.default,
    memberships_devices_1.default,
    memberships_forms_1.default,
    memberships_projects_1.default,
    memberships_layers_1.default,
    record_links_1.default,
    record_series_1.default
];
exports.default = tables;
//# sourceMappingURL=postgres-schema.js.map