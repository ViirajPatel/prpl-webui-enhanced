import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | firewall', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /firewall', async function (assert) {
    await visit('/firewall');

    assert.equal(currentURL(), '/firewall');
  });
});
