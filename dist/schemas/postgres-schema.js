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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tables = [_audio2.default, _changesets2.default, _choiceLists2.default, _classificationSets2.default, _forms2.default, _memberships2.default, _photos2.default, _projects2.default, _roles2.default, _signatures2.default, _videos2.default];

exports.default = tables;
//# sourceMappingURL=postgres-schema.js.map