import Component from '@glimmer/component';

/**
 * Firewall Status Card Component
 *
 * WHY: This replicates Homeware's firewall card (008_firewall.lp)
 * which displays:
 * - Current firewall level (Low/Medium/High/User)
 * - IPv4 rules count
 * - IPv6 rules count
 * - Status indicator
 *
 * The card provides a quick overview of firewall status on the dashboard
 * and links to the full firewall configuration page.
 */
export default class FirewallStatusCardComponent extends Component {
  /**
   * Get the current firewall level display name
   * WHY: PolicyLevel is stored as a reference like "Firewall.Level.[Alias=='Medium']"
   * We need to extract and format it for display like Homeware does
   */
  get currentLevel() {
    if (!this.args.firewall) return 'Unknown';
    return this.args.firewall.currentLevelName || 'Medium';
  }

  /**
   * Get status indicator class based on firewall state
   * WHY: Homeware uses colored LEDs to indicate status
   * - Green: enabled with good configuration
   * - Orange: enabled but needs attention
   * - Red: disabled
   */
  get statusClass() {
    if (!this.args.firewall?.Enable) {
      return 'danger'; // Red - disabled
    }
    return 'success'; // Green - enabled
  }

  /**
   * Get status text for display
   */
  get statusText() {
    if (!this.args.firewall?.Enable) {
      return 'Disabled';
    }
    return 'Enabled';
  }

  /**
   * Count total IPv4 rules
   * WHY: Homeware shows rule counts when in "User" mode
   * We count rules from chains that handle IPv4 traffic
   */
  get ipv4RuleCount() {
    let count = 0;
    if (this.args.chains) {
      this.args.chains.forEach((chain) => {
        // Count rules from chains that aren't IPv6 specific
        if (chain.Rule && !chain.Name?.includes('v6')) {
          count += chain.Rule.length || 0;
        }
      });
    }
    return count;
  }

  /**
   * Count total IPv6 rules
   */
  get ipv6RuleCount() {
    let count = 0;
    if (this.args.chains) {
      this.args.chains.forEach((chain) => {
        // Count rules from IPv6-specific chains
        if (chain.Rule && chain.Name?.includes('v6')) {
          count += chain.Rule.length || 0;
        }
      });
    }
    return count;
  }

  /**
   * Check if we're in User mode (custom rules)
   * WHY: Homeware shows rule counts only in User mode
   */
  get isUserMode() {
    return this.currentLevel?.toLowerCase() === 'user';
  }

  /**
   * Display label for IPv4 rules
   */
  get ipv4RuleLabel() {
    return this.ipv4RuleCount === 1 ? 'Rule' : 'Rules';
  }

  /**
   * Display label for IPv6 rules
   */
  get ipv6RuleLabel() {
    return this.ipv6RuleCount === 1 ? 'Rule' : 'Rules';
  }
}
