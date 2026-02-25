import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class IpModel extends Model {
  @attr ActivePortNumberOfEntries;
  @attr IPv4Capable;
  @attr IPv4Enable;
  @attr IPv4Status;
  @attr IPv6Capable;
  @attr IPv6Enable;
  @attr IPv6Status;
  @attr InterfaceNumberOfEntries;
  @attr ULAPrefix;
  @hasMany('ip-interface') Interface;

  @attr({
    defaultValue() {
      return 'IP.';
    },
  })
  _namespace;
}
