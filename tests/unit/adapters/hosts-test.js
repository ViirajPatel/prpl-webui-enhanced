import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | hosts', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:hosts');
    assert.ok(adapter);
  });
});
