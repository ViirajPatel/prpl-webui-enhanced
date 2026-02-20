import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { storageFor } from 'ember-local-storage';

export default class LoginController extends Controller {
  @tracked errorMessage;
  @service session;
  @storageFor('web-user') user;

  @action
  async authenticate(e) {
    e.preventDefault();
    let { identification, password } = this;
    try {
      await this.session.authenticate(
        'authenticator:tr181RestApi',
        identification,
        password
      );
    } catch (error) {
      this.errorMessage = error.error || error;
    }

    if (this.session.isAuthenticated) {
      // success
    }
  }

  @action
  updateIdentification(e) {
    this.identification = e.target.value;
  }

  @action
  updatePassword(e) {
    this.password = e.target.value;
  }
}
