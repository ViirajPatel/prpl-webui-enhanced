import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthenticatedDhcpv4Controller extends Controller {
  @tracked selectedPoolAlias = null;

  get pools() {
    return this.model.Server.Pool || [];
  }

  get selectedPool() {
    if (!this.selectedPoolAlias && this.pools.length > 0) {
      return this.pools[0];
    }
    return this.pools.find(pool => pool.Alias === this.selectedPoolAlias);
  }

  @action
  selectPool(alias) {
    this.selectedPoolAlias = alias;
  }
}
