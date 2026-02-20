import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked, set } from '@ember/object';

export default class Dhcpv4ServerPoolComponent extends Component {
  get enabled() {
    return this.args.pool.Enable == 1 ? true : false;
  }

  set enabled(value) {
    set(this.args.pool, 'Enable', value ? 1 : 0);
  }

  get disabled() {
    return !this.enabled;
  }

  @action
  updatePool() {
    this.args.pool.save();
  }
}
