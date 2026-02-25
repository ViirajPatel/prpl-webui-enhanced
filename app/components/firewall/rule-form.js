import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

/**
 * Firewall Rule Form Component
 *
 * WHY: This replicates Homeware's firewall rule add/edit form.
 * It allows configuration of all rule parameters:
 * - Enable/disable
 * - Action (Accept/Drop/Reject)
 * - Protocol (TCP/UDP/ICMP/etc.)
 * - Source IP and port
 * - Destination IP and port
 * - DSCP marking
 *
 * The form fields match Homeware's fwrule_columns structure.
 */
export default class FirewallRuleFormComponent extends Component {
  @service store;

  // Form field tracking
  @tracked enabled = true;
  @tracked target = 'DROP';
  @tracked protocol = 6; // TCP
  @tracked sourceIP = '';
  @tracked sourcePort = '';
  @tracked destIP = '';
  @tracked destPort = '';
  @tracked dscp = -1;
  @tracked alias = '';
  @tracked description = '';

  @tracked isSaving = false;
  @tracked errorMessage = null;

  constructor() {
    super(...arguments);
    // If editing an existing rule, populate the form
    if (this.args.rule) {
      this.enabled = this.args.rule.Enable ?? true;
      this.target = this.args.rule.Target || 'DROP';
      this.protocol = this.args.rule.Protocol ?? 6;
      this.sourceIP = this.args.rule.SourceIP || '';
      this.sourcePort =
        this.args.rule.SourcePort === -1
          ? ''
          : String(this.args.rule.SourcePort || '');
      this.destIP = this.args.rule.DestIP || '';
      this.destPort =
        this.args.rule.DestPort === -1
          ? ''
          : String(this.args.rule.DestPort || '');
      this.dscp = this.args.rule.DSCP ?? -1;
      this.alias = this.args.rule.Alias || '';
      this.description = this.args.rule.Description || '';
    }
  }

  /**
   * Available targets/actions
   * WHY: From Homeware's fwrules_targets array
   */
  get targetOptions() {
    return [
      { value: 'Accept', label: 'Accept' },
      { value: 'Drop', label: 'Drop' },
      { value: 'Reject', label: 'Reject' },
    ];
  }

  /**
   * Available protocols
   * WHY: From Homeware's fwrules_protocols array
   */
  get protocolOptions() {
    return [
      { value: 6, label: 'TCP' },
      { value: 17, label: 'UDP' },
      { value: -1, label: 'ALL' },
      { value: 1, label: 'ICMP' },
      { value: 50, label: 'ESP' },
      { value: 51, label: 'AH' },
      { value: 132, label: 'SCTP' },
    ];
  }

  /**
   * DSCP marking options
   * WHY: From Homeware's fwrules_dscp array for QoS
   */
  get dscpOptions() {
    return [
      { value: -1, label: 'None' },
      { value: 10, label: 'AF11' },
      { value: 12, label: 'AF12' },
      { value: 14, label: 'AF13' },
      { value: 18, label: 'AF21' },
      { value: 20, label: 'AF22' },
      { value: 22, label: 'AF23' },
      { value: 26, label: 'AF31' },
      { value: 28, label: 'AF32' },
      { value: 30, label: 'AF33' },
      { value: 34, label: 'AF41' },
      { value: 36, label: 'AF42' },
      { value: 38, label: 'AF43' },
      { value: 8, label: 'CS1' },
      { value: 16, label: 'CS2' },
      { value: 24, label: 'CS3' },
      { value: 32, label: 'CS4' },
      { value: 40, label: 'CS5' },
      { value: 48, label: 'CS6' },
      { value: 56, label: 'CS7' },
      { value: 46, label: 'EF' },
    ];
  }

  /**
   * Check if editing vs creating
   */
  get isEditing() {
    return !!this.args.rule;
  }

  /**
   * Validate the form
   * WHY: Homeware validates rules before saving
   */
  validate() {
    // Source and destination can't be the same
    if (this.sourceIP && this.destIP && this.sourceIP === this.destIP) {
      this.errorMessage = 'Source IP cannot be same as Destination IP';
      return false;
    }

    // Alias is required
    if (!this.alias.trim()) {
      this.errorMessage = 'Rule name (Alias) is required';
      return false;
    }

    return true;
  }

  /**
   * Save the rule
   */
  @action
  async saveRule() {
    this.errorMessage = null;

    if (!this.validate()) {
      return;
    }

    this.isSaving = true;

    try {
      let rule;

      if (this.isEditing) {
        // Update existing rule
        rule = this.args.rule;
      } else {
        // Create new rule
        rule = this.store.createRecord('firewall-chain-rule', {
          chain: this.args.chain,
        });
      }

      // Set rule properties
      rule.Enable = this.enabled;
      rule.Target = this.target;
      rule.Protocol = Number(this.protocol);
      rule.SourceIP = this.sourceIP || '';
      rule.SourcePort = this.sourcePort ? Number(this.sourcePort) : -1;
      rule.DestIP = this.destIP || '';
      rule.DestPort = this.destPort ? Number(this.destPort) : -1;
      rule.DSCP = Number(this.dscp);
      rule.Alias = this.alias;
      rule.Description = this.description;

      await rule.save();

      // Notify parent of successful save
      if (this.args.onSave) {
        this.args.onSave(rule);
      }
    } catch (error) {
      this.errorMessage = 'Failed to save rule: ' + error.message;
      console.error('Rule save error:', error);
    } finally {
      this.isSaving = false;
    }
  }

  /**
   * Cancel editing
   */
  @action
  cancel() {
    if (this.args.onCancel) {
      this.args.onCancel();
    }
  }

  // Input change handlers
  @action updateEnabled(event) {
    this.enabled = event.target.checked;
  }
  @action updateTarget(event) {
    this.target = event.target.value;
  }
  @action updateProtocol(event) {
    this.protocol = Number(event.target.value);
  }
  @action updateSourceIP(event) {
    this.sourceIP = event.target.value;
  }
  @action updateSourcePort(event) {
    this.sourcePort = event.target.value;
  }
  @action updateDestIP(event) {
    this.destIP = event.target.value;
  }
  @action updateDestPort(event) {
    this.destPort = event.target.value;
  }
  @action updateDscp(event) {
    this.dscp = Number(event.target.value);
  }
  @action updateAlias(event) {
    this.alias = event.target.value;
  }
  @action updateDescription(event) {
    this.description = event.target.value;
  }
}
