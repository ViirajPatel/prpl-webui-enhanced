export const data = [
  {
    parameters: { OperationMode: 'Manual', WANMode: 'demo_vlanmode' },
    path: 'X_PRPLWARE-COM_WANManager.',
  },
  {
    parameters: {
      PhysicalType: 'Ethernet',
      Alias: 'demo_wanmode',
      Status: 'Disabled',
    },
    path: 'X_PRPLWARE-COM_WANManager.WAN.1.',
  },
  {
    parameters: {
      DefaultInterface: 1,
      IPv4Reference: 'Device.IP.Interface.2.',
      IPv4Mode: 'dhcp4',
      IPv6Reference: 'Device.IP.Interface.2.',
      IPv6Mode: 'dhcp6',
      VlanPriority: 0,
      UserName: '',
      Password: '',
      Name: '',
      Alias: 'wan',
      Type: 'untagged',
      VlanID: 100,
    },
    path: 'X_PRPLWARE-COM_WANManager.WAN.1.Intf.1.',
  },
  {
    parameters: {
      PhysicalType: 'Ethernet',
      Alias: 'demo_vlanmode',
      Status: 'Error',
    },
    path: 'X_PRPLWARE-COM_WANManager.WAN.2.',
  },
  {
    parameters: {
      Alias: 'wan_tagged',
      IPv4Reference: 'Device.IP.Interface.2.',
      IPv4Mode: 'dhcp4',
      IPv6Reference: 'Device.IP.Interface.2.',
      IPv6Mode: 'dhcp6',
      VlanPriority: 0,
      UserName: '',
      Password: '',
      Name: '',
      Type: 'vlan',
      VlanID: 201,
    },
    path: 'X_PRPLWARE-COM_WANManager.WAN.2.Intf.1.',
  },
];
