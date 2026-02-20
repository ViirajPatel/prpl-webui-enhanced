import Component from '@glimmer/component';
import { set } from '@ember/object';

export default class WifiSsidComponent extends Component {
  get enabled() {
    return this.args.ssid.Enable == 1 ? true : false;
  }

  set enabled(value) {
    set(this.args.ssid, 'Enable', value ? 1 : 0);
  }
}
