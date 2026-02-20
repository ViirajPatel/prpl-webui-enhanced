import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthenticatedDashboardController extends Controller {
  @service status;

  @tracked CPUdata;
  @tracked WiFiSSIDStatistics;
  @tracked WANStatistics;
  @tracked selectedWifiIndex = 0;

  get selectedWifiSsid() {
    if (this.model?.wifi?.SSID?.length > 0) {
      return this.model.wifi.SSID[this.selectedWifiIndex];
    }
    return null;
  }

  @action
  selectWifi(index) {
    this.selectedWifiIndex = index;
  }

  init() {
    super.init(...arguments);
    this.status.on('deviceInfo.ProcessStatus-Added', () => {
      let data = this.status.getData('deviceInfo.ProcessStatus');
      this.set('CPUdata', data);
    });

    this.status.on('wifi.SSID.Packets-Added', () => {
      let data = this.status.getData('wifi.SSID.Packets');
      this.set('WiFiSSIDStatistics', data);
    });

    this.status.on('wanmanager.WAN.Packets-Added', () => {
      let data = this.status.getData('wanmanager.WAN.Packets');
      this.set('WANStatistics', data);
    });
  }
}
