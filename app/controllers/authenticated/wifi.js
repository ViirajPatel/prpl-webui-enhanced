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

  get hasChanges() {
    let isDirty = false;

    this.model.Radio.forEach((radio) => {
      if (radio.hasDirtyAttributes) {
        isDirty = true;
      }
    });

    this.model.AccessPoint.forEach((accesspoint) => {
      if (accesspoint.hasDirtyAttributes) {
        isDirty = true;
      }

      // chech the security relationship
      if (accesspoint.get('Security.hasDirtyAttributes')) {
        isDirty = true;
      }
    });

    this.model.SSID.forEach((ssid) => {
      if (ssid.hasDirtyAttributes) {
        isDirty = true;
      }
    });

    return isDirty;
  }

  @action
  setActiveTab(tab) {
    this.activeTab = tab;
  }

  @action
  updateWifi() {
    this.model.Radio.forEach((radio) => {
      if (radio.hasDirtyAttributes) {
        radio.save();
      }
    });

    this.model.AccessPoint.forEach((accesspoint) => {
      if (accesspoint.hasDirtyAttributes) {
        accesspoint.save();
      }

      if (accesspoint.get('Security.hasDirtyAttributes')) {
        accesspoint.get('Security').then((security) => {
          security.save();
        });
      }
    });

    this.model.SSID.forEach((ssid) => {
      if (ssid.hasDirtyAttributes) {
        ssid.save();
      }
    });
  }
}
