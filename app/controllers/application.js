import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @service session;
  @service status;

  @tracked softwareVersion;

  init() {
    super.init(...arguments);
    this.status.one('deviceInfo.SoftwareVersion-Added', () => {
      let data = this.status.getData('deviceInfo.SoftwareVersion');
      this.set('softwareVersion', data[0]);
    });
  }

  @action
  invalidateSession() {
    this.session.invalidate();
  }
}
