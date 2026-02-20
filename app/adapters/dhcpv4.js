import ApplicationAdapter from './application';

export default class Dhcpv4Adapter extends ApplicationAdapter {
  pathForType(type) {
    return 'DHCPv4.';
  }
}
