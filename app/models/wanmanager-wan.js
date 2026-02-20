import Model, { attr, hasMany } from '@ember-data/model';

export default class WanmanagerWanModel extends Model {
  @attr Alias;
  @attr PhysicalType;
  @attr Status;
  @hasMany('wanmanager-wan-intf') Intf;
}
