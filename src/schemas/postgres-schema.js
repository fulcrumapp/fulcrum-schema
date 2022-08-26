import Audio from './postgres/audio';
import Changesets from './postgres/changesets';
import ChoiceLists from './postgres/choice-lists';
import ClassificationSets from './postgres/classification-sets';
import Forms from './postgres/forms';
import Memberships from './postgres/memberships';
import Photos from './postgres/photos';
import Projects from './postgres/projects';
import Roles from './postgres/roles';
import Signatures from './postgres/signatures';
import Videos from './postgres/videos';
import Devices from './postgres/devices';
import MembershipsDevices from './postgres/memberships-devices';
import MembershipsForms from './postgres/memberships-forms';
import MembershipsProjects from './postgres/memberships-projects';
import MembershipsLayers from './postgres/memberships-layers';
import RecordLinks from './postgres/record-links';
import RecordSeries from './postgres/record-series';

const tables = [
  Audio,
  Changesets,
  ChoiceLists,
  ClassificationSets,
  Forms,
  Memberships,
  Photos,
  Projects,
  Roles,
  Signatures,
  Videos,
  Devices,
  MembershipsDevices,
  MembershipsForms,
  MembershipsProjects,
  MembershipsLayers,
  RecordLinks,
  RecordSeries
];

export default tables;
