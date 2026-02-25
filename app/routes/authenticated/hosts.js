import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';


export default class AuthenticatedHostsRoute extends Route {
    @service store;

    async model() {
        return this.store.findRecord('hosts', 'Hosts.', { reload: true });
    }
    afterModel(model) {
        this.refreshModel();
    }
    refreshModel() {
        later(
            '',
            () => {
                this.model().then((model) => {
                    // model is automatically updated in the store,
                    // template re-renders reactively
                });
                this.refreshModel();
            },
            1000  // refresh every 1 second — adjust as needed
        );
    }
}
