import { helper } from '@ember/component/helper';

/**
 * Less Than Helper
 *
 * Compares if the first value is less than the second value in templates.
 * Used for: {{#if (lt value1 value2)}} ... {{/if}}
 *
 * Example: {{#if (lt 3 5)}} returns true {{/if}}
 */
export default helper(function lt([left, right] /*, named*/) {
  return left < right;
});
