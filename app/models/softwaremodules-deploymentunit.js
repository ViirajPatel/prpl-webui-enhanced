import Model, { attr } from '@ember-data/model';

export default class SoftwareModulesDeploymentUnitModel extends Model {
  @attr Alias;
  @attr DUID;
  @attr Description;
  @attr ExecutionEnvRef;
  @attr ExecutionUnitList;
  @attr Name;
  @attr Resolved;
  @attr Status;
  @attr URL;
  @attr UUID;
  @attr Vendor;
  @attr VendorConfigList;
  @attr VendorLogList;
  @attr Version;
}
