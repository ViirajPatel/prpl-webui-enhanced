import Component from '@glimmer/component';
import { set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class WifiUnifiedSsidCardComponent extends Component {
  @tracked showPassword = false;

  get enabled() {
    return this.args.card.accesspoint.Enable == 1 ? true : false;
  }

  set enabled(value) {
    set(this.args.card.accesspoint, 'Enable', value ? 1 : 0);
  }

  get ssidEnabled() {
    return this.args.card.ssid.Enable == 1 ? true : false;
  }

  set ssidEnabled(value) {
    set(this.args.card.ssid, 'Enable', value ? 1 : 0);
  }

  get ssidName() {
    return this.args.card.ssid?.SSID || '';
  }

  set ssidName(value) {
    if (this.args.card.ssid) {
      set(this.args.card.ssid, 'SSID', value);
    }
  }

  get macAddress() {
    return this.args.card.ssid?.MACAddress || '';
  }

  get broadcastSSID() {
    return this.args.card.accesspoint.SSIDAdvertisementEnabled == 1
      ? true
      : false;
  }

  set broadcastSSID(value) {
    set(this.args.card.accesspoint, 'SSIDAdvertisementEnabled', value ? 1 : 0);
  }

  get encryptionModes() {
    let modes = [];
    const security = this.args.card.security;
    if (security && security.get('ModesSupported')) {
      security
        .get('ModesSupported')
        .split(',')
        .forEach((mode) => {
          modes.push({ key: mode, label: mode });
        });
    }
    return modes;
  }

  get isWep() {
    const mode = this.args.card.security?.get('ModeEnabled');
    return mode === 'WEP-64' || mode === 'WEP-128' ? true : false;
  }

  get isWpa() {
    const mode = this.args.card.security?.get('ModeEnabled');
    return mode === 'WPA-Personal' ||
      mode === 'WPA2-Personal' ||
      mode === 'WPA-WPA2-Personal'
      ? true
      : false;
  }

  get isSae() {
    const mode = this.args.card.security?.get('ModeEnabled');
    return mode === 'WPA3-Personal' || mode === 'WPA3-Personal-Transition'
      ? true
      : false;
  }

  get passwordType() {
    return this.showPassword ? 'text' : 'password';
  }

  get currentPassphrase() {
    const security = this.args.card.security;
    if (!security) return '';

    if (this.isSae) {
      return security.get('SAEPassphrase');
    } else if (this.isWpa) {
      return security.get('KeyPassPhrase');
    } else if (this.isWep) {
      return security.get('WEPKey');
    }
    return '';
  }

  set currentPassphrase(value) {
    const security = this.args.card.security;
    if (!security) return;

    if (this.isSae) {
      security.set('SAEPassphrase', value);
    } else if (this.isWpa) {
      security.set('KeyPassPhrase', value);
    } else if (this.isWep) {
      security.set('WEPKey', value);
    }
  }

  @action
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  @action
  setEncryptionMode(mode) {
    this.args.card.security.set('ModeEnabled', mode);
  }
}
