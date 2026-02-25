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
    // Create unified cards combining SSID, AccessPoint, and Security data
    const cards = [];

    if (!this.model || !this.model.AccessPoint || !this.model.SSID) {
      return cards;
    }

    this.model.AccessPoint.forEach((ap) => {
      // SSIDReference is a belongsTo — use .get() for reliable Ember Data access
      const ssid = ap.get('SSIDReference');
      const security = ap.get('Security');

      if (ssid) {
        cards.push({
          accesspoint: ap,
          ssid: ssid,
          security: security,
        });
      }
    });
    return cards;
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
