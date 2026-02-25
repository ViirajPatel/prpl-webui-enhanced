import Model, { attr, hasMany } from '@ember-data/model';
import { later } from '@ember/runloop';

export default class HostsModel extends Model {
  @attr('number') HostNumberOfEntries;
  @attr('number') AccessControlNumberOfEntries;

  @hasMany('hosts-host', { async: false }) Host;

  @attr({
    defaultValue() {
      return 'Hosts.Host.';
    },
  })
  _namespace;
}
