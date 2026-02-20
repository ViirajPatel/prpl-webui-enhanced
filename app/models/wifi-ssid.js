import Model, { attr, belongsTo } from '@ember-data/model';

export default class WifiSsidModel extends Model {
  @attr Alias;
  @attr BSSID;
  @attr Enable;
  @attr Index;
  @attr LowerLayers;
  @attr MACAddress;
  @attr Name;
  @attr SSID;
  @attr Status;
  @belongsTo('wifi-ssid-stats', { async: false }) Stats;

  @attr({
    defaultValue() { return 'WiFi.SSID.'; }
  }) _namespace;
}
