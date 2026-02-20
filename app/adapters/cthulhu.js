import ApplicationAdapter from './application';

export default class CthulhuAdapter extends ApplicationAdapter {
  namespace = 'serviceElements/';  // No "Device." prefix

  pathForType(type) {
    return 'Cthulhu.';
  }
}
