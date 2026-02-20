import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class WanmanagerWanInterfaceComponent extends Component {
  get IPv4ModeOptions() {
    var options = [
      { key: 'none', label: 'none' },
      { key: 'dhcp4', label: 'DHCP' },
      { key: 'ppp4', label: 'PPP' },
      { key: 'static', label: 'Static' },
      { key: 'dslite', label: 'DSLite' },
    ];
    return options;
  }

  get IPv6ModeOptions() {
    var options = [
      { key: 'none', label: 'none' },
      { key: 'dhcp6', label: 'DHCP' },
      { key: 'ppp6', label: 'PPP' },
      { key: 'static', label: 'Static' },
    ];
    return options;
  }

  @action
  setIPv4Mode(IPv4Mode) {
    this.args.iface.IPv4Mode = IPv4Mode;
  }

  @action
  setIPv6Mode(IPv6Mode) {
    this.args.iface.IPv6Mode = IPv6Mode;
  }
}
