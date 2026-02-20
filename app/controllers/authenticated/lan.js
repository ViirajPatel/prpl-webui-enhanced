import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthenticatedLanController extends Controller {
  @tracked selectedInterfaceAlias = null;

  get interfaces() {
    return this.model.Interface.filter((iface) => {
      return iface.Alias !== 'wan' && iface.Alias !== 'loopback';
    });
  }

  get interfaceOptions() {
    return this.interfaces.map(iface => ({
      key: iface.Alias,
      label: iface.Alias,
      interface: iface
    }));
  }

  get selectedInterface() {
    if (!this.selectedInterfaceAlias && this.interfaces.length > 0) {
      return this.interfaces[0];
    }
    return this.interfaces.find(iface => iface.Alias === this.selectedInterfaceAlias);
  }

  @action
  selectInterface(alias) {
    this.selectedInterfaceAlias = alias;
  }
}
