import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | wanmanager wan intf', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:wanmanager-wan-intf');
    assert.ok(adapter);
  });
});
