export const data = [
  { parameters: {}, path: 'Cthulhu.' },
  {
    parameters: {
      ImageLocation: '/usr/share/rlyeh/images',
      UseOverlayFS: 1,
      StorageLocation: '/usr/share/cthulhu',
      DhcpCommand: '',
      DefaultBackend: '/usr/lib/cthulhu-lxc/cthulhu-lxc.so',
      BlobLocation: '/usr/share/rlyeh/blobs',
    },
    path: 'Cthulhu.Config.',
  },
  { parameters: {}, path: 'Cthulhu.Container.' },
  {
    parameters: { BackendVersion: 'lxc:4.0.10', Version: '0.13.8' },
    path: 'Cthulhu.Information.',
  },
  { parameters: {}, path: 'Cthulhu.Sandbox.' },
  {
    parameters: {
      AllocatedDiskSpace: 1024,
      Status: 'Disabled',
      CreatedByContainer: 0,
      RestartReason: '',
      AllocatedMemory: -1,
      Enable: 0,
      AllocatedCPUPercent: 100,
      Pid: -1,
      Created: 'Wed Sep  7 06:51:47 2022',
      Alias: 'cpe-generic',
      Parent: '',
      SandboxId: 'generic',
    },
    path: 'Cthulhu.Sandbox.Instances.1.',
  },
  {
    parameters: {
      Device: 'a',
      Permission: 'Deny',
      Comment: 'Deny all devices',
    },
    path: 'Cthulhu.Sandbox.Instances.1.Devices.1.',
  },
  {
    parameters: {
      Device: 'c 1:8 rwm',
      Permission: 'Allow',
      Comment: '/dev/random',
    },
    path: 'Cthulhu.Sandbox.Instances.1.Devices.10.',
  },
  {
    parameters: {
      Device: 'c 1:9 rwm',
      Permission: 'Allow',
      Comment: '/dev/urandom',
    },
    path: 'Cthulhu.Sandbox.Instances.1.Devices.11.',
  },
  {
    parameters: {
      Device: 'c 136:* rwm',
      Permission: 'Allow',
      Comment: '/dev/pts/*',
    },
    path: 'Cthulhu.Sandbox.Instances.1.Devices.12.',
  },
  {
    parameters: {
      Device: 'c 10:229 rwm',
      Permission: 'Allow',
      Comment: '/dev/fuse',
    },
    path: 'Cthulhu.Sandbox.Instances.1.Devices.13.',
  },
  {
    parameters: {
      Device: 'c *:* m',
      Permission: 'Allow',
      Comment: 'Allow any mknod',
    },
    path: 'Cthulhu.Sandbox.Instances.1.Devices.2.',
  },
  {
    parameters: {
      Device: 'b *:* m',
      Permission: 'Allow',
      Comment: 'Allow any mknod',
    },
    path: 'Cthulhu.Sandbox.Instances.1.Devices.3.',
  },
  {
    parameters: {
      Device: 'c 1:3 rwm',
      Permission: 'Allow',
      Comment: '/dev/null',
    },
    path: 'Cthulhu.Sandbox.Instances.1.Devices.4.',
  },
  {
    parameters: {
      Device: 'c 1:5 rwm',
      Permission: 'Allow',
      Comment: '/dev/zero',
    },
    path: 'Cthulhu.Sandbox.Instances.1.Devices.5.',
  },
  {
    parameters: {
      Device: 'c 1:7 rwm',
      Permission: 'Allow',
      Comment: '/dev/full',
    },
    path: 'Cthulhu.Sandbox.Instances.1.Devices.6.',
  },
  {
    parameters: {
      Device: 'c 5:0 rwm',
      Permission: 'Allow',
      Comment: '/dev/tty',
    },
    path: 'Cthulhu.Sandbox.Instances.1.Devices.7.',
  },
  {
    parameters: {
      Device: 'c 5:1 rwm',
      Permission: 'Allow',
      Comment: '/dev/console',
    },
    path: 'Cthulhu.Sandbox.Instances.1.Devices.8.',
  },
  {
    parameters: {
      Device: 'c 5:2 rwm',
      Permission: 'Allow',
      Comment: '/dev/ptmx',
    },
    path: 'Cthulhu.Sandbox.Instances.1.Devices.9.',
  },
  {
    parameters: { Enable: 0 },
    path: 'Cthulhu.Sandbox.Instances.1.MountNS.',
  },
  {
    parameters: { Enable: 0, Type: 'Empty' },
    path: 'Cthulhu.Sandbox.Instances.1.NetworkNS.',
  },
  { parameters: {}, path: 'Cthulhu.Sandbox.Instances.1.Stats.' },
  {
    parameters: { Used: -1, Total: -1, Free: -1 },
    path: 'Cthulhu.Sandbox.Instances.1.Stats.DiskSpace.',
  },
  {
    parameters: { Used: -1, Total: -1, Free: -1 },
    path: 'Cthulhu.Sandbox.Instances.1.Stats.Memory.',
  },
  {
    parameters: { Enable: 0 },
    path: 'Cthulhu.Sandbox.Instances.1.UserNS.',
  },
  {
    parameters: { Enable: 0, Hostname: '' },
    path: 'Cthulhu.Sandbox.Instances.1.UtsNS.',
  },
];
