import Route from '@ember/routing/route';
import { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default class AuthenticatedWanRoute extends Route {
  @service store;

  async model() {
    return this.store.findRecord('wanmanager', 'WANManager.').then(
      (wan) => resolve(wan),
      (err) => {
        resolve({});
      }
    );
  }
}
