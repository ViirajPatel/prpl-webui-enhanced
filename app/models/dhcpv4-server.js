import Model, { attr, hasMany } from '@ember-data/model';

export default class Dhcpv4ServerModel extends Model {
  @attr Enable;
  @attr PoolNumberOfEntries;
  @hasMany('dhcpv4-server-pool') Pool;
}
