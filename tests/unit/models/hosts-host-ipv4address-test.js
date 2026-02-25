import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | hosts host ipv4address', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('hosts-host-ipv4address', {});
    assert.ok(model);
  });
});
