import { data as ap1 } from './wifi-accesspoint-1';
import { data as ap2 } from './wifi-accesspoint-2';
import { data as radio1 } from './wifi-radio-1';
import { data as radio2 } from './wifi-radio-2';
import { data as ssid1 } from './wifi-ssid-1';
import { data as ssid2 } from './wifi-ssid-2';

const data = [
  { parameters: {}, path: 'WiFi.' },
  {
    parameters: { Enable: 1, DelayTime: 1000, BootDelayTime: 4000 },
    path: 'WiFi.AutoCommitMgr.',
  },
  {
    parameters: {
      DefaultPin: '56352290',
      OUI: 'B283C4',
      ModelNumber: '',
      UUID: '69393f3a-6a3b-f73d-fb6c-3e3f69393f3a',
      OsVersion: '4.14.284',
      DevName: '',
      ModelUrl: '',
      ModelDescription: 'OpenWrt 19.07-SNAPSHOT r0-90a5696',
      SerialNumber: 'SNb283c406de78',
      wpsUUIDShared: 0,
      ModelName: 'GL.iNet GL-B1300',
      Manufacturer: 'glinet',
      ManufacturerUrl: 'glinet',
      FriendlyName: 'prplHGW',
      wpsSupVer: 2,
    },
    path: 'WiFi.wps_DefParam.',
  },
];

ap1.forEach((entry) => {
  data.push(entry);
});

ap2.forEach((entry) => {
  data.push(entry);
});

radio1.forEach((entry) => {
  data.push(entry);
});

radio2.forEach((entry) => {
  data.push(entry);
});

ssid1.forEach((entry) => {
  data.push(entry);
});

ssid2.forEach((entry) => {
  data.push(entry);
});

export { data };
