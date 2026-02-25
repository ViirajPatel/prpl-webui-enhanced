import Model, { attr, belongsTo } from '@ember-data/model';

export default class DeviceInfoModel extends Model {
  @attr CID;
  @attr ModelName;
  @attr ModelNumber;
  @attr SerialNumber;
  @attr UpTime;
  @attr SoftwareVersion;
  @belongsTo('deviceinfo-memorystatus') MemoryStatus;
  @belongsTo('deviceinfo-processstatus') ProcessStatus;

  @attr({
    defaultValue() {
      return 'DeviceInfo.';
    },
  })
  _namespace;
}
