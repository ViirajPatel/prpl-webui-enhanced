import { helper } from '@ember/component/helper';

/**
 * Greater Than Helper
 *
 * Compares if the first value is greater than the second value in templates.
 * Used for: {{#if (gt value1 value2)}} ... {{/if}}
 *
 * Example: {{#if (gt 5 3)}} returns true {{/if}}
 */
export default helper(function gt([left, right] /*, named*/) {
  return left > right;
});
