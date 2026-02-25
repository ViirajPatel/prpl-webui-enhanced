import Model, { attr, belongsTo } from '@ember-data/model';

/**
 * Firewall Chain Rule Model
 *
 * WHY: This is the core firewall rule model. Each rule defines traffic
 * filtering based on source/destination IP, ports, protocol, and action.
 * Maps to Firewall.Chain.{i}.Rule.{j} in TR-181.
 *
 * This replicates Homeware's firewall rule functionality including:
 * - Traffic direction (incoming/outgoing)
 * - Protocol selection (TCP, UDP, ICMP, etc.)
 * - Source/Destination IP and port configuration
 * - Actions (Accept, Drop, Reject)
 * - DSCP marking for QoS
 */
export default class FirewallChainRuleModel extends Model {
  // Rule identification
  @attr('string') Alias; // Unique rule name (e.g., "ftp", "ssh")
  @attr('string') Description; // Human-readable description
  @attr('boolean') Enable; // Enable/disable rule
  @attr('string') Status; // "Enabled", "Disabled", "Error"
  @attr('number') Order; // Rule priority order

  // Action to take when rule matches
  // WHY: Maps to Homeware's target dropdown (ACCEPT/DROP/REJECT)
  @attr('string') Target; // "Accept", "Drop", "Reject"
  @attr('string') TargetChain; // Target chain if jumping to another chain

  // Protocol configuration
  // WHY: Maps to Homeware's protocol select (TCP=6, UDP=17, etc.)
  @attr('number') Protocol; // Protocol number: 6=TCP, 17=UDP, 1=ICMP, -1=all
  @attr('boolean') ProtocolExclude; // Inverts protocol match

  // IP Version (-1 for both IPv4 and IPv6, 4 for IPv4 only, 6 for IPv6 only)
  @attr('number') IPVersion;

  // Source configuration
  // WHY: Homeware allows filtering by source IP/subnet and port
  @attr('string') SourceIP; // Source IP address
  @attr('string') SourceMask; // Source subnet mask
  @attr('number') SourcePort; // Source port (-1 for any)
  @attr('number') SourcePortRangeMax; // Max port for range
  @attr('boolean') SourceIPExclude; // Inverts IP match
  @attr('boolean') SourcePortExclude; // Inverts port match
  @attr('boolean') SourceAllInterfaces; // Match all source interfaces
  @attr('string') SourceInterface; // Specific source interface
  @attr('string') SourceMAC; // Source MAC address filter
  @attr('boolean') SourceMACExclude; // Inverts MAC match

  // Destination configuration
  // WHY: Homeware allows filtering by destination IP/subnet and port
  @attr('string') DestIP; // Destination IP address
  @attr('string') DestMask; // Destination subnet mask
  @attr('number') DestPort; // Destination port (-1 for any)
  @attr('number') DestPortRangeMax; // Max port for range
  @attr('boolean') DestIPExclude; // Inverts IP match
  @attr('boolean') DestPortExclude; // Inverts port match
  @attr('boolean') DestAllInterfaces; // Match all destination interfaces
  @attr('string') DestInterface; // Specific destination interface

  // Connection tracking
  @attr('string') ConnectionState; // "NEW", "ESTABLISHED", "RELATED", etc.

  // QoS/DSCP marking
  // WHY: Homeware supports DSCP marking (AF11, CS1, EF, etc.) for traffic prioritization
  @attr('number') DSCP; // DSCP value for marking
  @attr('boolean') DSCPExclude; // Inverts DSCP match

  // Logging
  @attr('boolean') Log; // Enable logging for this rule

  // Time-based rules
  @attr('string') CreationDate; // When rule was created
  @attr('string') ExpiryDate; // When rule expires

  // Relationship to parent chain
  @belongsTo('firewall-chain', { async: false }) chain;

  /**
   * Get human-readable protocol name
   * WHY: DM stores protocol as number, but UI needs readable name like Homeware
   */
  get protocolName() {
    const protocols = {
      '-1': 'ALL',
      1: 'ICMP',
      6: 'TCP',
      17: 'UDP',
      41: 'IPv6',
      47: 'GRE',
      50: 'ESP',
      51: 'AH',
      58: 'ICMPv6',
      132: 'SCTP',
    };
    return protocols[String(this.Protocol)] || String(this.Protocol);
  }

  /**
   * Format source port for display
   * WHY: Need to handle -1 (any), single ports, and port ranges
   */
  get sourcePortDisplay() {
    if (this.SourcePort === -1 || this.SourcePort === null) {
      return 'Any';
    }
    if (this.SourcePortRangeMax && this.SourcePortRangeMax > this.SourcePort) {
      return `${this.SourcePort}-${this.SourcePortRangeMax}`;
    }
    return String(this.SourcePort);
  }

  /**
   * Format destination port for display
   */
  get destPortDisplay() {
    if (this.DestPort === -1 || this.DestPort === null) {
      return 'Any';
    }
    if (this.DestPortRangeMax && this.DestPortRangeMax > this.DestPort) {
      return `${this.DestPort}-${this.DestPortRangeMax}`;
    }
    return String(this.DestPort);
  }

  /**
   * Format source IP for display
   */
  get sourceIPDisplay() {
    if (!this.SourceIP) {
      return 'Any';
    }
    if (this.SourceMask) {
      return `${this.SourceIP}/${this.SourceMask}`;
    }
    return this.SourceIP;
  }

  /**
   * Format destination IP for display
   */
  get destIPDisplay() {
    if (!this.DestIP) {
      return 'Any';
    }
    if (this.DestMask) {
      return `${this.DestIP}/${this.DestMask}`;
    }
    return this.DestIP;
  }

  /**
   * Get badge inline style for Target/Action
   * WHY: Simplify template logic for badge styling
   */
  get targetBadgeStyle() {
    const styles = {
      Accept: 'background-color: #198754; color: white;',
      Drop: 'background-color: #dc3545; color: white;',
      Reject: 'background-color: #fd7e14; color: white;',
    };
    return styles[this.Target] || 'background-color: #6c757d; color: white;';
  }

  /**
   * Get badge color class for Status
   */
  get statusBadgeClass() {
    return this.Status === 'Enabled' ? 'success' : 'secondary';
  }
}
