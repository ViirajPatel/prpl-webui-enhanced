import Route from '@ember/routing/route';
import RSVP, { resolve } from 'rsvp';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default class AuthenticatedDashboardRoute extends Route {
  @service store;
  @service status;

  model() {
    return RSVP.hash({
      deviceInfo: this.store.findRecord('deviceinfo', 'DeviceInfo.', {
        reload: true,
      }), // make sure not to deliver cached data _before_ actually loading the data
      lcm: this.store.findRecord('cthulhu', 'Cthulhu.').then(
        (cthulhu) => resolve(cthulhu),
        // fallback since the cthulhu object is not always present
        (err) => {
          resolve({});
        }
      ),
      wifi: this.store.findRecord('wifi', 'WiFi.').then(
        (wifi) => resolve(wifi),
        // fallback since the wifi object is not always present
        (err) => {
          resolve({});
        }
      ),
      wan: this.store.findRecord('wanmanager', 'WANManager.').then(
        (wan) => resolve(wan),
        // fallback since the wan object is not always present
        (err) => {
          resolve({});
        }
      ),
      /*ip: this.store.findRecord('ip', 'IP.', {
        reload: true,
      }),*/
      ip: this.store.findAll('ip-interface', 'IP.Interface.', {
        reload: true,
      }),
    });
  }

  async afterModel(model) {
    // add software version to status data
    this.status.addSource('deviceInfo.SoftwareVersion', 1);
    this.status.addData(
      'deviceInfo.SoftwareVersion',
      model.deviceInfo.SoftwareVersion
    );

    // add CPU usage to status
    if (!this.status.hasDataSource('deviceInfo.ProcessStatus'))
      this.status.addSource('deviceInfo.ProcessStatus', 50);
    this.status.addData('deviceInfo.ProcessStatus', {
      usage: model.deviceInfo.get('ProcessStatus.CPUUsage'),
    });

    // add WiFi packet counters to status
    if (model.wifi) {
      if (!this.status.hasDataSource('wifi.SSID.Packets'))
        this.status.addSource('wifi.SSID.Packets', 500);

      model.wifi.get('SSID').forEach((ssid) => {
        let stats = ssid.get('Stats');
        if (stats) {
          this.status.addData('wifi.SSID.Packets', {
            alias: ssid.get('Alias'),
            sPackets: stats.PacketsSent,
            rPackets: stats.PacketsReceived,
            sBytes: stats.BytesSent,
            rBytes: stats.BytesReceived,
          });
        }
      });
    }

    // add WAN packet and byte counters to status
    if (model.wan) {
      if (!this.status.hasDataSource('wanmanager.WAN.Packets'))
        this.status.addSource('wanmanager.WAN.Packets', 500);

      this.addWanStatistics(model, 'wanmanager.WAN.Packets');
    }

    // trigger regular model update
    this.refreshModel();
  }

  refreshModel() {
    later(
      '',
      () => {
        this.model().then((model) => {
          // collect status data
          // CPU
          this.status.addData('deviceInfo.ProcessStatus', {
            usage: model.deviceInfo.get('ProcessStatus.CPUUsage'),
          });

          // WiFi
          if (model.wifi) {
            model.wifi.get('SSID').forEach((ssid) => {
              let stats = ssid.get('Stats');
              if (stats) {
                this.status.addData('wifi.SSID.Packets', {
                  alias: ssid.get('Alias'),
                  sPackets: stats.PacketsSent,
                  rPackets: stats.PacketsReceived,
                  sBytes: stats.BytesSent,
                  rBytes: stats.BytesReceived,
                });
              }
            });
          }

          // WAN
          if (model.wan) {
            this.addWanStatistics(model, 'wanmanager.WAN.Packets');
          }
        });
        this.refreshModel();
      },
      5000
    );
  }

  /**
   * Adds WAN packets/bytes sent/received data to the internal model
   *
   * @param {*} model
   * @param {*} key
   */
  addWanStatistics(model, key) {
    model.wan.get('WAN').forEach((wan) => {
      if (wan.Alias === model.wan.get('WANMode')) {
        wan.get('Intf').then((ifaces) => {
          ifaces.forEach((iface, index) => {
            if (index == 0) {
              iface.get('IPv4Reference.Stats').then((stats) => {
                this.status.addData(key, {
                  sPackets: stats.PacketsSent,
                  rPackets: stats.PacketsReceived,
                  sBytes: stats.BytesSent,
                  rBytes: stats.BytesReceived,
                });
              });
            }
          });
        });
      }
    });
  }
}
