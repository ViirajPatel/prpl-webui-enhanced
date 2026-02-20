import Model, { attr, hasMany } from '@ember-data/model';

export default class SoftwareModulesModel extends Model {
  @attr ExecEnvNumberOfEntries;
  @attr ExecutionUnitNumberOfEntries;
  @attr DeploymentUnitNumberOfEntries;
  @hasMany('softwaremodules-execenv') ExecEnv;
  @hasMany('softwaremodules-deploymentunit') DeploymentUnit;

  @attr({
    defaultValue() { return 'SoftwareModules.'; }
  }) _namespace;
}
