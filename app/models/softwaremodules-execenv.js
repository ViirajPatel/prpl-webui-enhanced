import Model, { attr } from '@ember-data/model';

export default class SoftwareModulesExecEnvModel extends Model {
  @attr AvailableMemory;
  @attr AllocatedDiskSpace;
  @attr Status;
  @attr RestartReason;
  @attr Enable;
  @attr Name;
  @attr ActiveExecutionUnits;
  @attr InitialRunLevel;
  @attr Type;
  @attr InitialExecutionUnitRunLevel;
  @attr CurrentRunLevel;
  @attr AvailableDiskSpace;
  @attr ProcessorRefList;
  @attr AllocatedMemory;
  @attr Vendor;
  @attr ParentExecEnv;
  @attr AllocatedCPUPercent;
  @attr Version;
  @attr Alias;
}
