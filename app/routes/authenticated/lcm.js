import Route from '@ember/routing/route';
import { resolve } from 'rsvp';
import { later } from '@ember/runloop';

export default class AuthenticatedLcmRoute extends Route {
  async model() {
    return this.store.findRecord('softwaremodules', 'SoftwareModules.').then(
      (softwaremodules) => resolve(softwaremodules),
      (err) => {
        resolve({});
      }
    );
  }

  afterModel() {
    this.refreshModel();
  }

  refreshModel() {
    later(
      '',
      () => {
        this.model().then((model) => {
          // additional options
        });
        this.refreshModel();
      },
      10000
    );
  }
}
