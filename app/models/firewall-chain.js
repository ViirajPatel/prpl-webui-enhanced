import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

/**
 * Firewall Chain Model
 *
 * WHY: Chains are groups of firewall rules. prplOS organizes rules into chains
 * like "FORWARD_L_Custom_In" (incoming custom rules) and "FORWARD_L_Custom_Out"
 * (outgoing custom rules). This maps to Firewall.Chain.{i} in TR-181.
 *
 * DM Parameters mapped:
 * - Firewall.Chain.{i}.Alias -> Alias
 * - Firewall.Chain.{i}.Name -> Name
 * - Firewall.Chain.{i}.Enable -> Enable
 * - Firewall.Chain.{i}.Creator -> Creator
 * - Firewall.Chain.{i}.RuleNumberOfEntries -> RuleNumberOfEntries
 */
export default class FirewallChainModel extends Model {
  // Unique alias for the chain (e.g., "Custom_In", "Custom_Out")
  @attr('string') Alias;

  // Display name of the chain (e.g., "FORWARD_L_Custom_In")
  @attr('string') Name;

  // Enable/disable the entire chain
  @attr('boolean') Enable;

  // Who created this chain ("Defaults" or "User")
  @attr('string') Creator;

  // Number of rules in this chain
  @attr('number') RuleNumberOfEntries;

  // Relationship to parent firewall
  @belongsTo('firewall', { async: false }) firewall;

  // Relationship to rules in this chain
  @hasMany('firewall-chain-rule', { async: false }) Rule;

  /**
   * WHY: Determine if this is an incoming or outgoing chain
   * based on the chain name. Homeware shows traffic direction.
   */
  get direction() {
    if (this.Name && this.Name.includes('_In')) {
      return 'incoming';
    } else if (this.Name && this.Name.includes('_Out')) {
      return 'outgoing';
    }
    return 'unknown';
  }

  /**
   * WHY: Check if this is a user-editable chain
   * Only chains created by "User" or "Custom" chains should be editable
   */
  get isEditable() {
    return (
      this.Creator === 'User' ||
      (this.Alias &&
        (this.Alias.includes('Custom') || this.Alias.includes('User')))
    );
  }
}
