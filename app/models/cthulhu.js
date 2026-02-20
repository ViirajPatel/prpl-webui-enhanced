import Model, { attr, belongsTo } from '@ember-data/model';

export default class CthulhuModel extends Model {
  @belongsTo('cthulhu-information') Information;
}
