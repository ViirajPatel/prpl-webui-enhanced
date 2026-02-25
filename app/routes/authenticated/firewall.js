import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

/**
 * Firewall Route
 *
 * WHY: This route fetches firewall data from the TR-181 REST API
 * when the user navigates to the firewall page.
 *
 * It loads:
 * - Main firewall settings (enable, policy level, etc.)
 * - Firewall chains (groups of rules)
 * - Firewall levels (Low, Medium, High, User)
 *
 * The data is then passed to the template and components for display.
 */
export default class AuthenticatedFirewallRoute extends Route {
  @service store;

  /**
   * Model hook - fetches data before rendering
   * WHY: Ember calls this automatically when entering the route.
   * We fetch all firewall data here so it's available to the template.
   */
  async model() {
    // Fetch the firewall record
    // WHY: findRecord() with 'Firewall.' path retrieves the Firewall DM object
    // with all its nested chains, rules, and levels
    try {
      const firewall = await this.store.findRecord('firewall', 'Firewall.');

      // Access the relationships - return them directly as Ember Data collections
      const chains = firewall ? firewall.Chain || firewall.get('Chain') : [];
      const levels = firewall ? firewall.Level || firewall.get('Level') : [];

      return {
        firewall,
        chains,
        levels,
      };
    } catch (error) {
      console.error('Failed to load firewall data:', error);
      return {
        firewall: null,
        chains: [],
        levels: [],
      };
    }
  }

  /**
   * Setup controller hook
   * WHY: This allows us to set additional controller properties
   * that might be needed for UI state management
   */
  setupController(controller, model) {
    super.setupController(controller, model);

    // Set default selected chain for the rules table
    // WHY: By default, show the "Custom_Out" chain which contains
    // user-editable outgoing rules
    if (model.chains && model.chains.length > 0) {
      const customOutChain = model.chains.find(
        (c) => c.Alias === 'Custom_Out' || c.Name?.includes('Custom_Out')
      );
      controller.set('selectedChain', customOutChain || model.chains[0]);
    }
  }
}
