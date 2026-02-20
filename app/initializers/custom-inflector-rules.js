import Inflector from 'ember-inflector';

export function initialize(/* application */) {
  const inflector = Inflector.inflector;

  inflector.uncountable('stats');
  inflector.uncountable('softwaremodules');
}

export default {
  name: 'custom-inflector-rules',
  initialize,
};
