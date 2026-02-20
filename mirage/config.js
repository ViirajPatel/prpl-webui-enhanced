import { createServer } from 'miragejs';
import { data as deviceInfo } from './fixtures/device-info';
import { data as ip } from './fixtures/ip';
import { data as dhcpv4 } from './fixtures/dhcpv4';
import { data as wanManager } from './fixtures/wan-manager';
import { data as ctulhu } from './fixtures/ctulhu';
import { data as softwareModules } from './fixtures/software-modules';
import { data as wifi } from './fixtures/wifi';

var ipCounters = {};
var wifiCounters = {};

export default function (config) {
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */

  let finalConfig = {
    ...config,
    routes() {
      this.patch('/serviceElements/IP.Interface.3.IPv4Address.1.', () => {
        return { success: 'ok' };
      });

      this.patch('/serviceElements/WiFi.AccessPoint.1.Security.', () => {
        return { success: 'ok' };
      });

      this.post('/session', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        
        if( attrs.username === 'admin' && attrs.password === 'admin') {
          return {
            absoluteTimeout: 3600,
            idleTimeout: 600,
            sessionId: Math.random() * 100000
          };
        } else {
          return false;
        }
      })

      this.get('/serviceElements/Device.DeviceInfo.', () => {
        // randomize CPU usage
        deviceInfo.filter((entry, index) => {
          if (entry.path === 'DeviceInfo.ProcessStatus.') {
            deviceInfo[index].parameters.CPUUsage = Math.floor(
              Math.random() * 100
            );
            return true;
          }
        });

        return deviceInfo;
      });

      this.get('/serviceElements/Device.IP.Interface.', () => {
        // generate random traffic data
        ip.filter((entry, index) => {
          if (entry.path.match(/^IP\.Interface\.[0-9]+\.Stats/)) {
            if (!ipCounters[entry.path]) {
              ipCounters[entry.path] = { rxPackets: 0, txPackets: 0, rxBytes: 0, txBytes: 0};
            }

            ipCounters[entry.path].txPackets += Math.floor(Math.random() * 1000);
            ipCounters[entry.path].rxBPackets += Math.floor(Math.random() * 1000);
            ipCounters[entry.path].txBytes += Math.floor(Math.random() * 1000000);
            ipCounters[entry.path].rxBytes += Math.floor(Math.random() * 1000000);

            ip[index].parameters.PacketsSent = ipCounters[entry.path].txPackets;
            ip[index].parameters.PacketsReceived = ipCounters[entry.path].rxPackets;
            ip[index].parameters.BytesSent = ipCounters[entry.path].txBytes;
            ip[index].parameters.BytesReceived = ipCounters[entry.path].rxBytes;
            return true;
          }
        });
        return ip;
      });

      this.get('/serviceElements/Device.DHCPv4.', () => {
        return dhcpv4;
      });

      this.get('/serviceElements/Device.X_PRPLWARE-COM_WANManager.', () => {
        return wanManager;
      });

      this.get('/serviceElements/Device.Cthulhu.', () => {
        return ctulhu;
      });

      this.get('/serviceElements/Device.SoftwareModules.', () => {
        return softwareModules;
      });

      this.get('/serviceElements/Device.WiFi.', () => {
        // generate random package data
        wifi.filter((entry, index) => {
          if (entry.path.match(/^WiFi\.SSID\.[0-9]+\.Stats/)) {
            if (!wifiCounters[entry.path]) {
              wifiCounters[entry.path] = { rxPackets: 0, txPackets: 0, rxBytes: 0, txBytes: 0 };
            }

            wifiCounters[entry.path].txPackets += Math.floor(Math.random() * 100);
            wifiCounters[entry.path].rxPackets += Math.floor(Math.random() * 100);
            wifiCounters[entry.path].txBytes += Math.floor(Math.random() * 100000);
            wifiCounters[entry.path].rxBytes += Math.floor(Math.random() * 100000);

            wifi[index].parameters.PacketsSent = wifiCounters[entry.path].txPackets;
            wifi[index].parameters.PacketsReceived = wifiCounters[entry.path].rxPackets;
            wifi[index].parameters.BytesSent = wifiCounters[entry.path].txBytes;
            wifi[index].parameters.BytesReceived = wifiCounters[entry.path].rxBytes;
            return true;
          }
        });

        return wifi;
      });
    },
  };

  return createServer(finalConfig);
}
