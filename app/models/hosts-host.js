import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class HostsHostModel extends Model {
  @attr('boolean') Active;
  @attr('string') ActiveLastChange;
  @attr('string') HostName;
  @attr('string') IPAddress;
  @attr('string') PhysAddress;
  @attr('string') Layer1Interface;
  @attr('string') Layer3Interface;
  @attr('number') IPv4AddressNumberOfEntries;
  @attr('number') IPv6AddressNumberOfEntries;
  @attr('string') InterfaceType;

  @hasMany('hosts-host-ipv4address', { async: false }) IPv4Address;
  @belongsTo('hosts-host-wanstats', { async: false }) WANStats;
}
