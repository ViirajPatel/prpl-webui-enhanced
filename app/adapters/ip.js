import ApplicationAdapter from './application';

export default class IpAdapter extends ApplicationAdapter {
  pathForType(type) {
    return 'IP.';
  }
}
