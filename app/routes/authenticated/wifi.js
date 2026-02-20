import Route from '@ember/routing/route';
import { resolve } from 'rsvp';

export default class AuthenticatedWiFiRoute extends Route {
  async model() {
    return this.store.findRecord('wifi', 'WiFi.').then(
      (wifi) => resolve(wifi),
      (err) => {
        resolve({});
      }
    );
  }
}
