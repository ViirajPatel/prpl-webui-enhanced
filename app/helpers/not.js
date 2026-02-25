import { helper } from '@ember/component/helper';

/**
 * Not Helper
 *
 * WHY: Negates a boolean value in templates.
 * Used for: disabled={{not value}}
 *
 * Example: {{not true}} returns false
 */
export default helper(function not([value] /*, named*/) {
  return !value;
});
