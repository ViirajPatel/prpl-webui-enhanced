import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hosts/device-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Hosts::DeviceList />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Hosts::DeviceList>
        template block text
      </Hosts::DeviceList>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
