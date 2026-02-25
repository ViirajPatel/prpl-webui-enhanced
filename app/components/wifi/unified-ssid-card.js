import Component from '@glimmer/component';
import { set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class WifiUnifiedSsidCardComponent extends Component {
  @tracked showPassword = false;
  @tracked _ssidName = '';
  @tracked _passphrase = '';

  constructor() {
    super(...arguments);
    const card = this.args.card;

    // Initialize local tracked state from model (avoids re-render loops on typing)
    this._ssidName = card.ssid?.get('SSID') || card.ssid?.get('Alias') || '';
    this._passphrase = this._readPassphraseFromModel();
  }

  get enabled() {
    return this.args.card.accesspoint.Enable == 1 ? true : false;
  }

  set enabled(value) {
    set(this.args.card.accesspoint, 'Enable', value ? 1 : 0);
  }

  get ssidEnabled() {
    return this.args.card.ssid?.Enable == 1 ? true : false;
  }

  set ssidEnabled(value) {
    if (this.args.card.ssid) {
      set(this.args.card.ssid, 'Enable', value ? 1 : 0);
    }
  }

  get ssidName() {
    return this._ssidName;
  }

  set ssidName(value) {
    this._ssidName = value;
    if (this.args.card.ssid) {
      set(this.args.card.ssid, 'SSID', value);
    }
  }

  get macAddress() {
    return this.args.card.ssid?.get('MACAddress') || '';
  }

  get radioFrequency() {
    return this.args.card.radio?.get('OperatingFrequencyBand') || '';
  }

  get radioName() {
    return this.args.card.radio?.get('Name') || '';
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
    return mode === 'WEP-64' || mode === 'WEP-128';
  }

  get isWpa() {
    const mode = this.args.card.security?.get('ModeEnabled');
    return (
      mode === 'WPA-Personal' ||
      mode === 'WPA2-Personal' ||
      mode === 'WPA-WPA2-Personal' ||
      mode === 'WPA2-WPA3-Personal'
    );
  }

  get isSae() {
    const mode = this.args.card.security?.get('ModeEnabled');
    return (
      mode === 'WPA3-Personal' ||
      mode === 'WPA3-Personal-Transition' ||
      mode === 'WPA3-SAE'
    );
  }

  get passwordType() {
    return this.showPassword ? 'text' : 'password';
  }

  get passphraseConstraintHint() {
    if (this.isSae) {
      return '8-63 characters';
    } else if (this.isWpa) {
      return '8-63 characters or 64 hex digits';
    } else if (this.isWep) {
      return '10 or 26 hex characters';
    }
    return '';
  }

  get passphraseError() {
    const value = this._passphrase;
    if (!value) return null;

    if (this.isWpa) {
      return this._validateWpaPassphrase(value);
    } else if (this.isSae) {
      return this._validateSaePassphrase(value);
    } else if (this.isWep) {
      return this._validateWepKey(value);
    }
    return null;
  }

  get isPassphraseValid() {
    return !this.passphraseError;
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

  _readPassphraseFromModel() {
    const security = this.args.card.security;
    if (!security) return '';

    const mode = security.get('ModeEnabled');
    if (
      mode === 'WPA3-Personal' ||
      mode === 'WPA3-Personal-Transition' ||
      mode === 'WPA3-SAE'
    ) {
      return security.get('SAEPassphrase') || '';
    } else if (
      mode === 'WPA-Personal' ||
      mode === 'WPA2-Personal' ||
      mode === 'WPA-WPA2-Personal' ||
      mode === 'WPA2-WPA3-Personal'
    ) {
      return security.get('KeyPassPhrase') || '';
    } else if (mode === 'WEP-64' || mode === 'WEP-128') {
      return security.get('WEPKey') || '';
    }
    return '';
  }

  get currentPassphrase() {
    return this._passphrase;
  }

  set currentPassphrase(value) {
    this._passphrase = value;
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
    // Re-read passphrase for the new mode
    this._passphrase = this._readPassphraseFromModel();
  }
}
