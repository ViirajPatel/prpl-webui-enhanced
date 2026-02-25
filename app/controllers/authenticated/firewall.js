import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

/**
 * Firewall Controller
 *
 * WHY: Manages UI state for the firewall page.
 * Tracks:
 * - Selected firewall chain (for rule filtering)
 * - Whether rule form is visible
 * - The rule being edited (if any)
 *
 * This controller coordinates between the components on the page.
 */
export default class AuthenticatedFirewallController extends Controller {
  // Currently selected chain for viewing/editing rules
  @tracked selectedChain = null;

  // Controls visibility of the rule form
  @tracked showRuleForm = false;

  // The rule being edited (null for new rule)
  @tracked editingRule = null;

  /**
   * Get the primary firewall object
   */
  get firewall() {
    return this.model.firstObject;
  }

  /**
   * Show the form to add a new rule
   */
  @action
  addRule() {
    this.editingRule = null;
    this.showRuleForm = true;
  }

  /**
   * Show the form to edit an existing rule
   */
  @action
  editRule(rule) {
    this.editingRule = rule;
    this.showRuleForm = true;
  }

  /**
   * Called when rule is saved successfully
   */
  @action
  onRuleSaved(rule) {
    this.showRuleForm = false;
    this.editingRule = null;
    // Could refresh data here if needed
  }

  /**
   * Called when rule form is cancelled
   */
  @action
  onRuleCancelled() {
    this.showRuleForm = false;
    this.editingRule = null;
  }

  /**
   * Change the selected chain
   */
  @action
  selectChain(chain) {
    this.selectedChain = chain;
  }
}
