import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | wifi/radio', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Wifi::Radio />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Wifi::Radio>
        template block text
      </Wifi::Radio>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
