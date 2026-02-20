import Component from '@glimmer/component';
import { set } from '@ember/object';
import { action } from '@ember/object';

export default class WifiAccesspointSecurityComponent extends Component {
  get encryptionModes() {
    let modes = [];
    this.args.security
      .get('ModesSupported')
      .split(',')
      .forEach((mode) => {
        modes.push({ key: mode, label: mode });
      });
    return modes;
  }

  get isWep() {
    let mode = this.args.security.get('ModeEnabled');
    return mode === 'WEP-64' || mode === 'WEP-128' ? true : false;
  }

  get isWpa() {
    let mode = this.args.security.get('ModeEnabled');
    return mode === 'WPA-Personal' ||
      mode === 'WPA2-Personal' ||
      mode === 'WPA-WPA2-Personal'
      ? true
      : false;
  }

  get isSae() {
    let mode = this.args.security.get('ModeEnabled');
    return mode === 'WPA3-Personal' || mode === 'WPA3-Personal-Transition'
      ? true
      : false;
  }

  @action
  setEncryptionMode(mode) {
    this.args.security.set('ModeEnabled', mode);
  }
}
