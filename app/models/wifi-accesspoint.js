import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class WiFiAccessPointModel extends Model {
  @attr APBridgeDisable;
  @attr ActiveAssociatedDeviceNumberOfEntries;
  @attr Alias;
  @attr ApRole;
  @attr BridgeInterface;
  @attr DefaultDeviceType;
  @attr DiscoveryMethodEnabled;
  @attr Enable;
  @attr IEEE80211kEnabled;
  @attr Index;
  @attr IsolationEnable;
  @attr MACFilterAddressList;
  @attr MBOEnable;
  @attr MCEnable;
  @attr MaxAssociatedDevices;
  @attr MultiAPType;
  @attr RadioReference;
  @attr RetryLimit;
  @attr SSIDAdvertisementEnabled;
  @attr Status;
  @attr UAPSDCapability;
  @attr UAPSDEnable;
  @attr WDSEnable;
  @attr WMMCapability;
  @attr WMMEnable;
  @attr dbgAPEnable;
  @attr dbgAPFile;
  @belongsTo('wifi-accesspoint-security', { async: false }) Security;
  @belongsTo('wifi-ssid', { async: false }) SSIDReference;
  @hasMany('wifi-accesspoint-associateddevice') AssociatedDevice;
}
