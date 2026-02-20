import Component from '@glimmer/component';
import { set } from '@ember/object';
import { action } from '@ember/object';

export default class WifiAccesspointComponent extends Component {
  get enabled() {
    return this.args.accesspoint.Enable == 1 ? true : false;
  }

  set enabled(value) {
    set(this.args.accesspoint, 'Enable', value ? 1 : 0);
  }
}
