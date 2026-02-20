import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NetworkInterfaceComponent extends Component {
  @tracked hasChanges = false;

  @action
  updateInterface() {
    // Save all IPv4 addresses for this interface
    this.args.interface.IPv4Address.forEach(address => {
      address.save();
    });
    this.hasChanges = false;
  }
}
