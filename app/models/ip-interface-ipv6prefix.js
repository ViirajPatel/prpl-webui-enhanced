import Model, { attr } from '@ember-data/model';

export default class IpInterfaceIpv6PrefixModel extends Model {
  @attr Alias;
  @attr Autonomous;
  @attr ChildPrefixBits;
  @attr Enable;
  @attr OnLink;
  @attr Origin;
  @attr ParentPrefix;
  @attr PreferredLifeTime;
  @attr Prefix;
  @attr PrefixStatus;
  @attr StaticType;
  @attr Status;
  @attr ValidLifeTime;
}
