import Model, { attr, hasMany } from '@ember-data/model';

export default class WanManagerModel extends Model {
  @attr OperationMode;
  @attr WANMode;
  @hasMany('wanmanager-wan') WAN;

  @attr({
    defaultValue() {
      return 'X_PRPLWARE-COM_WANManager.';
    },
  })
  _namespace;
}
