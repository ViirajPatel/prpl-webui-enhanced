import ApplicationAdapter from './application';

export default class WiFiAdapter extends ApplicationAdapter {
  pathForType(type) {
    return 'WiFi.';
  }
}
