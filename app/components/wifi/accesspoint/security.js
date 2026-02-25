import Component from '@glimmer/component';
import { set } from '@ember/object';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class WifiAccesspointSecurityComponent extends Component {
  @tracked passphraseErrors = {};

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

  get wepKeyError() {
    const value = this.args.security.get('WEPKey') || '';
    if (!value) return null;
    return this._validateWepKey(value);
  }

  get keyPassPhraseError() {
    const value = this.args.security.get('KeyPassPhrase') || '';
    if (!value) return null;
    return this._validateWpaPassphrase(value);
  }

  get saePassphraseError() {
    const value = this.args.security.get('SAEPassphrase') || '';
    if (!value) return null;
    return this._validateSaePassphrase(value);
  }

  _validateWpaPassphrase(value) {
    // Check if it's a 64-character hexadecimal key (256-bit secret)
    if (value.length === 64 && /^[0-9A-Fa-f]{64}$/.test(value)) {
      return null; // Valid hex key
    }
    // Otherwise, check for 8-63 ASCII characters
    if (value.length < 8) {
      return 'Passphrase must be at least 8 characters';
    }
    if (value.length > 63) {
      return 'Passphrase must be at most 63 characters';
    }
    return null;
  }

  _validateSaePassphrase(value) {
    if (value.length < 8) {
      return 'SAE Passphrase must be at least 8 characters';
    }
    if (value.length > 63) {
      return 'SAE Passphrase must be at most 63 characters';
    }
    return null;
  }

  _validateWepKey(value) {
    const cleanValue = value.replace(/[^0-9A-Fa-f]/g, '');
    const byteLength = cleanValue.length / 2;

    if (!/^[0-9A-Fa-f]*$/.test(value)) {
      return 'WEP Key must be hexadecimal (0-9, A-F)';
    }
    if (byteLength !== 5 && byteLength !== 13) {
      return 'WEP Key must be 5 bytes (WEP-64) or 13 bytes (WEP-128)';
    }
    return null;
  }

  @action
  setEncryptionMode(mode) {
    this.args.security.set('ModeEnabled', mode);
  }
}
