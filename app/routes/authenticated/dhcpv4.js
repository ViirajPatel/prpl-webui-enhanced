import Route from '@ember/routing/route';

export default class AuthenticatedDhcpv4Route extends Route {
  async model() {
    return this.store.findRecord('dhcpv4', 'DHCPv4.');
  }
}
