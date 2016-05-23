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
  Videos
];

export default tables;
