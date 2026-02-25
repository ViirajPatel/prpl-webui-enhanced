import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedWifiController extends Controller {
  @tracked activeTab = 'radios';

  get radiosTabActive() {
    return this.activeTab === 'radios' ? true : false;
  }

  get accesspointsTabActive() {
    return this.activeTab === 'accesspoints' ? true : false;
  }

  get ssidsTabActive() {
    return this.activeTab === 'ssids' ? true : false;
  }

  get unifiedSSIDCards() {
    // Create unified cards combining SSID, AccessPoint, Security, and Radio data
    const cards = [];

    if (!this.model || !this.model.AccessPoint || !this.model.SSID) {
      return cards;
    }

    this.model.AccessPoint.forEach((ap) => {
      // SSIDReference is a belongsTo — use .get() for reliable Ember Data access
      const ssid = ap.get('SSIDReference');
      const security = ap.get('Security');

      // Find the matching radio for this AP
      const radioRef = ap.get('RadioReference');
      let radio = null;
      if (radioRef && this.model.Radio) {
        radio = this.model.Radio.find((r) => this._radioMatchesRef(r, radioRef));
      }

      // DEBUG: log matching info (remove after verification)
      console.log('[WiFi DEBUG] AP:', ap.id, 'RadioReference:', radioRef,
        'Matched radio:', radio ? radio.id : 'NONE',
        'Radio Name:', radio?.get('Name'),
        'Radio Freq:', radio?.get('OperatingFrequencyBand'));

      if (ssid) {
        cards.push({
          accesspoint: ap,
          ssid: ssid,
          security: security,
          radio: radio,
        });
      }
    });
    return cards;
  }

  /**
   * Returns an array of { radio, associatedSSIDs } for the Radios tab
   */
  get radiosWithSSIDs() {
    if (!this.model || !this.model.Radio) {
      return [];
    }

    return this.model.Radio.map((radio) => {
      const associatedSSIDs = [];

      // DEBUG: log available radio info
      console.log('[WiFi DEBUG] Radio:', radio.id, 'Name:', radio.get('Name'),
        'Alias:', radio.get('Alias'), 'Freq:', radio.get('OperatingFrequencyBand'));

      if (this.model.AccessPoint) {
        this.model.AccessPoint.forEach((ap) => {
          const radioRef = ap.get('RadioReference');
          const ssid = ap.get('SSIDReference');
          if (!radioRef || !ssid) return;

          if (this._radioMatchesRef(radio, radioRef)) {
            associatedSSIDs.push({
              ssidName: ssid.get('SSID') || ssid.get('Alias') || 'Unknown',
              enabled: ap.get('Enable') == 1,
              status: ap.get('Status'),
            });
          }
        });
      }

      return { radio, associatedSSIDs };
    });
  }

  /**
   * Check if a radio model matches a RadioReference string.
   * RadioReference can be e.g. "WiFi.Radio.radio0" while radio.id is "WiFi.Radio.1."
   * The last segment of RadioReference (e.g. "radio0") matches the radio's Alias or Name.
   */
  _radioMatchesRef(radio, radioRef) {
    const radioId = radio.id.replace(/\.$/, ''); // strip trailing dot
    const radioName = radio.get('Name') || '';
    const radioAlias = radio.get('Alias') || '';

    // DEBUG: log matching attempt
    console.log('[WiFi DEBUG] _radioMatchesRef: radioId=', radioId,
      'radioName=', radioName, 'radioAlias=', radioAlias, 'radioRef=', radioRef);

    // Direct ID match (unlikely but handle it)
    if (radioId === radioRef || radio.id === radioRef || radio.id === radioRef + '.') {
      return true;
    }

    // Extract the last segment of the RadioReference path
    // e.g. "WiFi.Radio.radio0" -> "radio0"
    const refParts = radioRef.split('.');
    const refSuffix = refParts[refParts.length - 1] || '';

    // Match suffix against radio Alias or Name
    if (refSuffix && (refSuffix === radioAlias || refSuffix === radioName)) {
      return true;
    }

    // Also try full Name/Alias match against full ref
    if (radioName === radioRef || radioAlias === radioRef) {
      return true;
    }

    return false;
  }

  get hasChanges() {
    let isDirty = false;

    if (!this.model) {
      return isDirty;
    }

    if (this.model.Radio) {
      this.model.Radio.forEach((radio) => {
        if (radio.hasDirtyAttributes) {
          isDirty = true;
        }
      });
    }

    if (this.model.AccessPoint) {
      this.model.AccessPoint.forEach((accesspoint) => {
        if (accesspoint.hasDirtyAttributes) {
          isDirty = true;
        }

        // check the security relationship
        if (accesspoint.get('Security.hasDirtyAttributes')) {
          isDirty = true;
        }
      });
    }

    if (this.model.SSID) {
      this.model.SSID.forEach((ssid) => {
        if (ssid.hasDirtyAttributes) {
          isDirty = true;
        }
      });
    }

    return isDirty;
  }

  @action
  setActiveTab(tab) {
    this.activeTab = tab;
  }

  @action
  updateWifi() {
    if (!this.model) {
      return;
    }

    if (this.model.Radio) {
      this.model.Radio.forEach((radio) => {
        if (radio.hasDirtyAttributes) {
          radio.save();
        }
      });
    }

    if (this.model.AccessPoint) {
      this.model.AccessPoint.forEach((accesspoint) => {
        if (accesspoint.hasDirtyAttributes) {
          accesspoint.save();
        }

        if (accesspoint.get('Security.hasDirtyAttributes')) {
          const security = accesspoint.get('Security');
          if (security) {
            security.save();
          }
        }
      });
    }

    if (this.model.SSID) {
      this.model.SSID.forEach((ssid) => {
        if (ssid.hasDirtyAttributes) {
          ssid.save();
        }
      });
    }
  }
}
