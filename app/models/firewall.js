import Model, { attr, hasMany } from '@ember-data/model';

/**
 * Firewall Model
 *
 * WHY: This model maps to the TR-181 Firewall DM object.
 * It contains the main firewall settings like enable status, policy level,
 * and relationships to chains (rule groups) and security levels.
 *
 * DM Parameters mapped:
 * - Firewall.Enable -> enable
 * - Firewall.Config -> config ("Policy" or "Advanced")
 * - Firewall.Type -> type ("Stateful")
 * - Firewall.PolicyLevel -> policyLevel (reference to Firewall.Level)
 * - Firewall.ChainNumberOfEntries -> derived from Chain relationship
 * - Firewall.LevelNumberOfEntries -> derived from Level relationship
 */
export default class FirewallModel extends Model {
  // Main firewall enable/disable toggle
  @attr('boolean') Enable;

  // "Policy" or "Advanced" - determines how firewall is configured
  @attr('string') Config;

  // "Stateful" firewall type
  @attr('string') Type;

  // Reference to the current policy level (e.g., "Firewall.Level.[Alias=='Medium']")
  @attr('string') PolicyLevel;

  // Last change timestamp
  @attr('string') LastChange;

  // Number of entries for various sub-objects
  @attr('number') ChainNumberOfEntries;
  @attr('number') LevelNumberOfEntries;
  @attr('number') PolicyNumberOfEntries;
  @attr('number') ServiceNumberOfEntries;
  @attr('number') DMZNumberOfEntries;
  @attr('number') PinholeNumberOfEntries;
  @attr('number') InterfaceSettingNumberOfEntries;

  // prplOS specific extensions
  @attr('boolean', { defaultValue: true }) X_PRPLWARE_COM_Enable;
  @attr('boolean') X_PRPLWARE_COM_ICMPLogs;
  @attr('number') X_PRPLWARE_COM_MaxPinholeNumberOfEntries;

  // Relationships to child objects
  @hasMany('firewall-chain', { async: false }) Chain;
  @hasMany('firewall-level', { async: false }) Level;

  // TR-181 path for this record (needed for updates)
  @attr('string') path;

  // Namespace for TR-181 REST API
  @attr({
    defaultValue() {
      return 'Firewall.';
    },
  })
  _namespace;

  /**
   * Computed property to get the current security level name
   * WHY: The PolicyLevel is stored as a reference string like
   * "Firewall.Level.[Alias=='Medium']" - we need to extract the level name
   */
  get currentLevelName() {
    const levelRef = this.PolicyLevel || '';
    const match = levelRef.match(/Alias=='(\w+)'/);
    return match ? match[1] : 'Unknown';
  }

  /**
   * Get the total number of user-defined rules across all chains
   * WHY: Homeware displays rule counts on the dashboard card
   */
  get totalRuleCount() {
    let count = 0;
    if (this.Chain) {
      this.Chain.forEach((chain) => {
        count += chain.RuleNumberOfEntries || 0;
      });
    }
    return count;
  }
}
