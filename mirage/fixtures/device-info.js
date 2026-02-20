import { data as processStatus } from './device-info-process-status';

const data = [
  {
    parameters: {
      DeviceCategory: '',
      UpTime: 1033981,
      AdditionalHardwareVersion: '',
      FirstUseDate: '0001-01-01T00:00:00Z',
      DeviceImageNumberOfEntries: 0,
      ModelNumber: 'GL-B1300',
      BootFirmwareImage: '',
      ActiveFirmwareImage: '',
      FirmwareImageNumberOfEntries: 0,
      SoftwareVersion: '4.14.284',
      ProcessorNumberOfEntries: 0,
      CID: '000111',
      VendorLogFileNumberOfEntries: 0,
      AdditionalSoftwareVersion: '',
      Description: 'OpenWrt 19.07-SNAPSHOT r0-435196d',
      SerialNumber: 'SNb283c406de78',
      ProductClass: 'GL.iNet GL-B1300',
      HardwareVersion: 'ipq40xx/generic',
      ModelName: 'GL.iNet GL-B1300',
      Manufacturer: 'defaultVal_manufacturer',
      ManufacturerOUI: '000111',
      ProvisioningCode: '',
      PEN: '000111',
      FriendlyName: 'prplHGW',
      VendorConfigFileNumberOfEntries: 0,
      LocationNumberOfEntries: 0,
    },
    path: 'DeviceInfo.',
  },
  {
    parameters: {
      Available: 1,
      Name: '',
      Alias: 'active',
      Version: '',
      Status: 'Active',
      BootFailureLog: '',
    },
    path: 'DeviceInfo.FirmwareImage.1.',
  },
  {
    parameters: {
      Available: 0,
      Name: '',
      Alias: 'inactive',
      Version: '',
      Status: '',
      BootFailureLog: '',
    },
    path: 'DeviceInfo.FirmwareImage.2.',
  },
  {
    parameters: { Total: 256704512, Free: 23015424 },
    path: 'DeviceInfo.MemoryStatus.',
  },
];

processStatus.forEach((entry) => {
  data.push(entry);
});

export { data };
