import { helper } from '@ember/component/helper';

/**
 * Less Than or Equal Helper
 *
 * Compares if the first value is less than or equal to the second value in templates.
 * Used for: {{#if (lte value1 value2)}} ... {{/if}}
 *
 * Example: {{#if (lte 3 5)}} returns true {{/if}}
 */
export default helper(function lte([left, right] /*, named*/) {
  return left <= right;
});
