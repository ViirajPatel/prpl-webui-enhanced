import Model, { attr } from '@ember-data/model';

export default class CthulhuInformationModel extends Model {
  @attr Version;
  @attr BackendVersion;
}
