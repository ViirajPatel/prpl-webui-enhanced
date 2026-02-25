import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

/**
 * Firewall Settings Component
 *
 * WHY: This replicates Homeware's firewall modal settings section
 * which allows configuration of:
 * - Firewall level (Low/Medium/High/User)
 * - Outgoing default policy (Accept/Drop/Reject)
 * - Incoming default policy (Drop/Reject)
 * - Internet ping enable/disable (IPv4 and IPv6)
 * - SIP ALG toggle
 *
 * These settings map to various Firewall DM parameters.
 */
export default class FirewallSettingsComponent extends Component {
  @service store;

  // Track if settings have been modified
  @tracked isDirty = false;
  @tracked isSaving = false;
  @tracked errorMessage = null;

  /**
   * Available firewall levels
   * WHY: These match Homeware's fw_levels array from firewall-modal.lp
   */
  get levels() {
    return [
      { value: 'Low', label: 'Low', description: 'Minimal security' },
      {
        value: 'Medium',
        label: 'Medium',
        description: 'Balanced security (default)',
      },
      { value: 'High', label: 'High', description: 'Maximum security' },
      { value: 'User', label: 'User Defined', description: 'Custom rules' },
    ];
  }

  /**
   * Available outgoing policies
   * WHY: From Homeware's outgoingpolicy array
   */
  get outgoingPolicies() {
    return [
      { value: 'ACCEPT', label: 'Accept' },
      { value: 'DROP', label: 'Drop' },
      { value: 'REJECT', label: 'Reject' },
    ];
  }

  /**
   * Available incoming policies
   * WHY: From Homeware's incomingpolicy array
   */
  get incomingPolicies() {
    return [
      { value: 'DROP', label: 'Drop' },
      { value: 'REJECT', label: 'Reject' },
    ];
  }

  /**
   * Handle firewall level change
   * WHY: When user selects a different level, update the model
   */
  @action
  onLevelChange(event) {
    const newLevel = event.target.value;
    // Update the PolicyLevel reference
    this.args.firewall.PolicyLevel = `Firewall.Level.[Alias=='${newLevel}']`;
    this.isDirty = true;
  }

  /**
   * Handle firewall enable/disable toggle
   */
  @action
  onEnableChange(event) {
    this.args.firewall.Enable = event.target.checked;
    this.isDirty = true;
  }

  /**
   * Save all settings changes
   * WHY: Persists changes to the TR-181 REST API
   */
  @action
  async saveSettings() {
    if (!this.isDirty) return;

    this.isSaving = true;
    this.errorMessage = null;

    try {
      await this.args.firewall.save();
      console.log('Firewall settings saved successfully');
      this.isDirty = false;
    } catch (error) {
      const errorMsg =
        error?.message || error?.toString() || 'Unknown error occurred';
      this.errorMessage = 'Failed to save firewall settings: ' + errorMsg;
      console.error('Firewall save error:', error);
    } finally {
      this.isSaving = false;
    }
  }

  /**
   * Reset settings to last saved state
   */
  @action
  resetSettings() {
    this.args.firewall.rollbackAttributes();
    this.isDirty = false;
    this.errorMessage = null;
  }

  /**
   * Dismiss error message
   */
  @action
  dismissError() {
    this.errorMessage = null;
  }

  /**
   * Whether save/reset buttons should be disabled
   */
  get isButtonDisabled() {
    return !this.isDirty || this.isSaving;
  }
}
