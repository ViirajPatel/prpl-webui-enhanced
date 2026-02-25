import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FirewallRulesTableComponent extends Component {
  @tracked selectedChainAlias = null;

  constructor(owner, args) {
    super(owner, args);
    // Initialize chain selection on component creation
    this.initializeChainSelection();
  }

  /**
   * Initialize the selected chain on first load
   */
  initializeChainSelection() {
    const chains = this.args.chains || [];
    if (
      !this.selectedChainAlias &&
      chains.length > 0 &&
      chains[0] &&
      chains[0].Alias
    ) {
      this.selectedChainAlias = chains[0].Alias;
    }
  }

  /**
   * DATA PROCESSING: Get available chains from the args
   * Filters and returns available firewall chains
   */
  get availableChains() {
    const chains = this.args.chains || [];
    return chains.length > 0 ? chains : [];
  }

  /**
   * UI HELPER: Get chain options for dropdown
   * Formats chains for select dropdown
   */
  get chainOptions() {
    return this.availableChains.map((chain) => ({
      value: chain.Alias,
      label: chain.Name || chain.Alias,
      direction: this.getChainDirection(chain),
    }));
  }

  /**
   * FORMATTING HELPER: Determine chain direction from name
   */
  getChainDirection(chain) {
    const name = (chain.Name || chain.Alias || '').toLowerCase();
    if (name.includes('input') || name.includes('incoming')) return 'Incoming';
    if (name.includes('output') || name.includes('outgoing')) return 'Outgoing';
    return '';
  }

  /**
   * DATA PROCESSING: Get the currently selected chain object
   * Gets the currently selected chain based on selectedChainAlias
   */
  get currentChain() {
    if (!this.selectedChainAlias || this.availableChains.length === 0) {
      return null;
    }
    return this.availableChains.find(
      (c) => c && c.Alias === this.selectedChainAlias
    );
  }

  /**
   * DATA PROCESSING: Get rules for the current chain
   * Gets rules from current chain, sorted by Order
   */
  get currentRules() {
    const chain = this.currentChain;

    if (!chain) {
      return [];
    }

    // Access the Rule relationship - it might be undefined, an array, or an Ember Data collection
    let rules = chain.Rule || chain.get('Rule') || [];

    // Convert to plain array if needed and sort
    const rulesArray = Array.isArray(rules)
      ? rules
      : rules.toArray
      ? rules.toArray()
      : [];
    return rulesArray.sort((a, b) => (a.Order || 0) - (b.Order || 0));
  }

  /**
   * DATA PROCESSING: Determine if rules can be added/edited
   * Checks if current chain is user-editable (Creator === 'User' or contains 'Custom')
   */
  get canAddRules() {
    const chain = this.currentChain;
    if (!chain) return false;
    return (
      chain.Creator === 'User' ||
      (chain.Alias && chain.Alias.includes('Custom'))
    );
  }

  /**
   * ACTION: Handle chain selection change
   * Changes which chain is being viewed
   */
  @action
  selectChain(event) {
    this.selectedChainAlias = event.target.value;
  }

  /**
   * ACTION: Toggle rule enable/disable
   * Enables/disables a rule with API save
   */
  @action
  async toggleRule(rule) {
    if (!rule) return;

    const originalState = rule.Enable;
    try {
      rule.Enable = !rule.Enable;
      await rule.save();
    } catch (error) {
      console.error('Failed to toggle rule:', error);
      rule.Enable = originalState; // Revert on error
      alert('Failed to toggle rule. Please try again.');
    }
  }

  /**
   * ACTION: Add a new rule
   * Calls parent action to add new rule
   */
  @action
  addRule() {
    if (this.args.onAddRule) {
      this.args.onAddRule(this.currentChain);
    }
  }

  /**
   * ACTION: Delete a rule
   * Deletes selected rule with confirmation
   */
  @action
  async deleteRule(rule) {
    if (!rule) return;

    const ruleName = rule.Alias || 'this rule';
    if (!confirm(`Are you sure you want to delete ${ruleName}?`)) {
      return;
    }

    try {
      await rule.destroyRecord();
    } catch (error) {
      console.error('Failed to delete rule:', error);
      alert('Failed to delete rule. Please try again.');
    }
  }
}
