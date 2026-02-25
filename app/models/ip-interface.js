import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class IpInterfaceModel extends Model {
  @attr Alias;
  @attr AutoIPEnable;
  @attr Enable;
  @attr IPv4AddressNumberOfEntries;
  @attr IPv4Enable;
  @attr IPv6AddressNumberOfEntries;
  @attr IPv6Enable;
  @attr IPv6PrefixNumberOfEntries;
  @attr LastChange;
  @attr Loopback;
  @attr LowerLayers;
  @attr MaxMTUSize;
  @attr Name;
  @attr Router;
  @attr Status;
  @attr Type;
  @attr ULAEnable;
  @hasMany('ip-interface-ipv4address') IPv4Address;
  @hasMany('ip-interface-ipv6address') IPv6Address;
  @hasMany('ip-interface-ipv6prefix') IPv6Prefix;
  @belongsTo('ip-interface-stats') Stats;

  @attr({
    defaultValue() {
      return 'IP.Interface.';
    },
  })
  _namespace;
}
