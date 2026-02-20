import Model, { attr, belongsTo } from '@ember-data/model';

export default class Dhcpv4Model extends Model {
  @belongsTo('dhcpv4-server') Server;
}
