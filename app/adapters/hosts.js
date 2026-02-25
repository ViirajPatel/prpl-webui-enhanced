import ApplicationAdapter from './application';

export default class HostsAdapter extends ApplicationAdapter {
  pathForType(type) {
    return 'Hosts.';
  }
}
