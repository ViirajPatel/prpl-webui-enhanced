import Model, { attr, belongsTo } from '@ember-data/model';

export default class WanmanagerWanIntfModel extends Model {
  @attr Alias;
  @attr DefaultInterface;
  @attr IPv4Mode;
  @attr IPv6Mode;
  @attr Name;
  @attr password;
  @attr Type;
  @attr Username;
  @attr VlanID;
  @attr VlanPriority;
  @belongsTo('ip-interface') IPv4Reference;
  @belongsTo('ip-interface') IPv6Reference;
}
