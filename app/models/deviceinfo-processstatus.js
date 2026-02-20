import Model, { attr } from '@ember-data/model';

export default class DeviceInfoProcessStatusModel extends Model {
  @attr('number') CPUUsage;
  @attr('number') ProcessNumberOfEntries;
}
