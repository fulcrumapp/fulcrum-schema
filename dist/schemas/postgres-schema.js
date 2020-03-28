'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _audio = require('./postgres/audio');

var _audio2 = _interopRequireDefault(_audio);

var _changesets = require('./postgres/changesets');

var _changesets2 = _interopRequireDefault(_changesets);

var _choiceLists = require('./postgres/choice-lists');

var _choiceLists2 = _interopRequireDefault(_choiceLists);

var _classificationSets = require('./postgres/classification-sets');

var _classificationSets2 = _interopRequireDefault(_classificationSets);

var _forms = require('./postgres/forms');

var _forms2 = _interopRequireDefault(_forms);

var _memberships = require('./postgres/memberships');

var _memberships2 = _interopRequireDefault(_memberships);

var _photos = require('./postgres/photos');

var _photos2 = _interopRequireDefault(_photos);

var _projects = require('./postgres/projects');

var _projects2 = _interopRequireDefault(_projects);

var _roles = require('./postgres/roles');

var _roles2 = _interopRequireDefault(_roles);

var _signatures = require('./postgres/signatures');

var _signatures2 = _interopRequireDefault(_signatures);

var _videos = require('./postgres/videos');

var _videos2 = _interopRequireDefault(_videos);

var _devices = require('./postgres/devices');

var _devices2 = _interopRequireDefault(_devices);

var _membershipsDevices = require('./postgres/memberships-devices');

var _membershipsDevices2 = _interopRequireDefault(_membershipsDevices);

var _membershipsForms = require('./postgres/memberships-forms');

var _membershipsForms2 = _interopRequireDefault(_membershipsForms);

var _membershipsProjects = require('./postgres/memberships-projects');

var _membershipsProjects2 = _interopRequireDefault(_membershipsProjects);

var _membershipsLayers = require('./postgres/memberships-layers');

var _membershipsLayers2 = _interopRequireDefault(_membershipsLayers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tables = [_audio2.default, _changesets2.default, _choiceLists2.default, _classificationSets2.default, _forms2.default, _memberships2.default, _photos2.default, _projects2.default, _roles2.default, _signatures2.default, _videos2.default, _devices2.default, _membershipsDevices2.default, _membershipsForms2.default, _membershipsProjects2.default, _membershipsLayers2.default];

exports.default = tables;
//# sourceMappingURL=postgres-schema.js.map