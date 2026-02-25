import ApplicationAdapter from './application';

/**
 * Firewall Adapter
 *
 * WHY: This adapter configures how the Firewall model communicates with
 * the TR-181 REST API. It sets the correct namespace path for firewall
 * operations.
 *
 * The API endpoint for firewall is:
 * /serviceElements/Device./Firewall.
 *
 * This follows the pattern used by other adapters in prpl-webui
 * (wifi.js, deviceinfo.js, etc.)
 */
export default class FirewallAdapter extends ApplicationAdapter {
  /**
   * Set the API path for firewall resources
   * WHY: TR-181 paths use "Firewall." as the namespace
   */
  pathForType(type) {
    // Map Ember model types to TR-181 paths
    const pathMap = {
      firewall: 'Firewall.',
      'firewall-chain': 'Firewall.Chain.',
      'firewall-chain-rule': 'Firewall.Chain.Rule.',
      'firewall-level': 'Firewall.Level.',
    };

    return pathMap[type] || 'Firewall.';
  }
}
