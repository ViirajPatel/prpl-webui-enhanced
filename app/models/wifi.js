import Model, { attr, hasMany } from '@ember-data/model';

export default class WiFiModel extends Model {
  @hasMany('wifi-accesspoint', { async: false }) AccessPoint;
  @hasMany('wifi-radio', { async: false }) Radio;
  @hasMany('wifi-ssid', { async: false }) SSID;

  @attr({
    defaultValue() {
      return 'WiFi.';
    },
  })
  _namespace;
}
