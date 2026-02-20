import Model, { attr } from '@ember-data/model';

export default class IpInterfaceIpv6AddressModel extends Model {
  @attr Alias;
  @attr Anycast;
  @attr Enable;
  @attr IPAddress;
  @attr IPAddressStatus;
  @attr Origin;
  @attr PreferredLifeTime;
  @attr Status;
  @attr ValidLifeTime;
}
