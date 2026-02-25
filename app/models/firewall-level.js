import Model, { attr } from '@ember-data/model';

/**
 * Firewall Level Model
 *
 * WHY: Firewall levels (Low, Medium, High, User) define preset security
 * configurations. This maps to Firewall.Level.{i} in TR-181.
 *
 * Homeware shows these as radio buttons:
 * - Low (lax) - Minimal security
 * - Medium (normal) - Balanced security (default)
 * - High - Maximum security
 * - User - Custom rules mode
 */
export default class FirewallLevelModel extends Model {
  // Unique alias (e.g., "Low", "Medium", "High", "User")
  @attr('string') Alias;

  // Display name for the level
  @attr('string') Name;

  // Chain reference for this level
  @attr('string') Chain;

  // Default action for this level ("Accept", "Drop", "Reject")
  @attr('string') DefaultPolicy;

  // Description of what this level does
  @attr('string') Description;

  /**
   * Get CSS class for status indicator based on level
   * WHY: Homeware uses colored indicators for security levels
   */
  get statusClass() {
    switch (this.Alias?.toLowerCase()) {
      case 'low':
        return 'warning'; // Yellow - less secure
      case 'medium':
        return 'info'; // Blue - balanced
      case 'high':
        return 'success'; // Green - most secure
      case 'user':
        return 'secondary'; // Gray - custom
      default:
        return 'secondary';
    }
  }

  /**
   * Get friendly display name
   * WHY: Map internal aliases to user-friendly names like Homeware
   */
  get displayName() {
    const names = {
      low: 'Low',
      lax: 'Low',
      medium: 'Medium',
      normal: 'Medium',
      high: 'High',
      user: 'User Defined',
    };
    return names[this.Alias?.toLowerCase()] || this.Alias;
  }
}
