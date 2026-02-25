import Inflector from 'ember-inflector';

export function initialize(/* application */) {
  const inflector = Inflector.inflector;

  inflector.uncountable('stats');
  inflector.uncountable('softwaremodules');
  inflector.uncountable('hosts');
  inflector.uncountable('wanstats');
}

export default {
  name: 'custom-inflector-rules',
  initialize,
};
