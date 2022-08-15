"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _audio = _interopRequireDefault(require("./postgres/audio"));

var _changesets = _interopRequireDefault(require("./postgres/changesets"));

var _choiceLists = _interopRequireDefault(require("./postgres/choice-lists"));

var _classificationSets = _interopRequireDefault(require("./postgres/classification-sets"));

var _forms = _interopRequireDefault(require("./postgres/forms"));

var _memberships = _interopRequireDefault(require("./postgres/memberships"));

var _photos = _interopRequireDefault(require("./postgres/photos"));

var _projects = _interopRequireDefault(require("./postgres/projects"));

var _roles = _interopRequireDefault(require("./postgres/roles"));

var _signatures = _interopRequireDefault(require("./postgres/signatures"));

var _videos = _interopRequireDefault(require("./postgres/videos"));

var _devices = _interopRequireDefault(require("./postgres/devices"));

var _membershipsDevices = _interopRequireDefault(require("./postgres/memberships-devices"));

var _membershipsForms = _interopRequireDefault(require("./postgres/memberships-forms"));

var _membershipsProjects = _interopRequireDefault(require("./postgres/memberships-projects"));

var _membershipsLayers = _interopRequireDefault(require("./postgres/memberships-layers"));

var _recordLinks = _interopRequireDefault(require("./postgres/record-links"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var tables = [_audio["default"], _changesets["default"], _choiceLists["default"], _classificationSets["default"], _forms["default"], _memberships["default"], _photos["default"], _projects["default"], _roles["default"], _signatures["default"], _videos["default"], _devices["default"], _membershipsDevices["default"], _membershipsForms["default"], _membershipsProjects["default"], _membershipsLayers["default"], _recordLinks["default"]];
var _default = tables;
exports["default"] = _default;
//# sourceMappingURL=postgres-schema.js.map