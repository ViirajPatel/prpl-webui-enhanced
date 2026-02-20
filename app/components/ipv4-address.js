import Component from '@glimmer/component';
import { action } from '@ember/object';
import { set } from '@ember/object';

export default class Ipv4AddressComponent extends Component {
  get options() {
    return [
      { key: 'DHCP', label: 'DHCP' },
      { key: 'IKEv2', label: 'IKEv2' },
      { key: 'AutoIP', label: 'AutoIP' },
      { key: 'IPCP', label: 'IPCP' },
      { key: 'Static', label: 'Static' },
    ];
  }

  get enabled() {
    return this.args.address.Enable == 1 ? true : false;
  }

  set enabled(value) {
    set(this.args.address, 'Enable', value ? 1 : 0);
  }

  get disabled() {
    return !this.enabled;
  }

  get hasChanges() {
    return this.args.address.hasDirtyAttributes;
  }

  @action
  updateIp() {
    this.args.address.save();
  }

  @action
  setAddressingType(addressingType) {
    this.args.address.AddressingType = addressingType;
  }
}
