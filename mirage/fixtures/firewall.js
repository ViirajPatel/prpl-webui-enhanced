/**
 * Firewall Mirage Fixture
 *
 * WHY: Provides mock data for firewall testing in development.
 * Mimics the TR-181 Device.Firewall data model structure.
 */
export const data = [
  {
    path: 'Firewall.',
    parameters: {
      Enable: true,
      Config: 'Advanced',
      Type: 'Stateful',
      AdvancedLevel: 'X_PRPLWARE-COM_High',
      LastChange: new Date().toISOString(),
      ChainNumberOfEntries: 2,
      LevelNumberOfEntries: 4,
    },
  },
  // Firewall Chain 1 (INPUT) with its rules
  {
    path: 'Firewall.Chain.1.',
    parameters: {
      Alias: 'INPUT',
      Name: 'INPUT',
      Enable: true,
      Creator: 'System',
      RuleNumberOfEntries: 3,
    },
  },
  // INPUT Chain Rules
  {
    path: 'Firewall.Chain.1.Rule.1.',
    parameters: {
      Alias: 'allow-ssh',
      Enable: true,
      Target: 'Accept',
      Protocol: 6, // TCP
      SourceIP: '',
      SourcePort: -1,
      SourcePorts: '',
      DestIP: '',
      DestPort: 22,
      DestPorts: '',
      IPVersion: 4,
      DSCP: -1,
      Description: 'Allow SSH access',
    },
  },
  {
    path: 'Firewall.Chain.1.Rule.2.',
    parameters: {
      Alias: 'allow-http',
      Enable: true,
      Target: 'Accept',
      Protocol: 6, // TCP
      SourceIP: '',
      SourcePort: -1,
      SourcePorts: '',
      DestIP: '',
      DestPort: 80,
      DestPorts: '',
      IPVersion: 4,
      DSCP: -1,
      Description: 'Allow HTTP access',
    },
  },
  {
    path: 'Firewall.Chain.1.Rule.3.',
    parameters: {
      Alias: 'allow-https',
      Enable: true,
      Target: 'Accept',
      Protocol: 6, // TCP
      SourceIP: '',
      SourcePort: -1,
      SourcePorts: '',
      DestIP: '',
      DestPort: 443,
      DestPorts: '',
      IPVersion: 4,
      DSCP: -1,
      Description: 'Allow HTTPS access',
    },
  },
  // Firewall Chain 2 (OUTPUT) with its rules
  {
    path: 'Firewall.Chain.2.',
    parameters: {
      Alias: 'OUTPUT',
      Name: 'OUTPUT',
      Enable: true,
      Creator: 'System',
      RuleNumberOfEntries: 2,
    },
  },
  // OUTPUT Chain Rules
  {
    path: 'Firewall.Chain.2.Rule.1.',
    parameters: {
      Alias: 'allow-dns',
      Enable: true,
      Target: 'Accept',
      Protocol: 17, // UDP
      SourceIP: '',
      SourcePort: -1,
      SourcePorts: '',
      DestIP: '',
      DestPort: 53,
      DestPorts: '',
      IPVersion: 4,
      DSCP: -1,
      Description: 'Allow DNS queries',
    },
  },
  {
    path: 'Firewall.Chain.2.Rule.2.',
    parameters: {
      Alias: 'allow-ntp',
      Enable: true,
      Target: 'Accept',
      Protocol: 17, // UDP
      SourceIP: '',
      SourcePort: -1,
      SourcePorts: '',
      DestIP: '',
      DestPort: 123,
      DestPorts: '',
      IPVersion: 4,
      DSCP: -1,
      Description: 'Allow NTP time sync',
    },
  },
  // Firewall Levels
  {
    path: 'Firewall.Level.1.',
    parameters: {
      Alias: 'Low',
      Name: 'Low',
      Chain: 'Firewall.Chain.1.',
      DefaultPolicy: 'Accept',
      Description: 'Low security - most traffic allowed',
    },
  },
  {
    path: 'Firewall.Level.2.',
    parameters: {
      Alias: 'Medium',
      Name: 'Medium',
      Chain: 'Firewall.Chain.1.',
      DefaultPolicy: 'Drop',
      Description: 'Medium security - balanced protection',
    },
  },
  {
    path: 'Firewall.Level.3.',
    parameters: {
      Alias: 'High',
      Name: 'High',
      Chain: 'Firewall.Chain.1.',
      DefaultPolicy: 'Drop',
      Description: 'High security - strict filtering',
    },
  },
  {
    path: 'Firewall.Level.4.',
    parameters: {
      Alias: 'User',
      Name: 'User',
      Chain: 'Firewall.Chain.1.',
      DefaultPolicy: 'Drop',
      Description: 'User-defined custom rules',
    },
  },
];
