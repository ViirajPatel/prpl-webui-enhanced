import Model, { attr } from '@ember-data/model';

export default class DeviceInfoMemoryStatusModel extends Model {
  @attr('number') Total;
  @attr('number') Free;
}
