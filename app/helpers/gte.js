import { helper } from '@ember/component/helper';

/**
 * Greater Than or Equal Helper
 *
 * Compares if the first value is greater than or equal to the second value in templates.
 * Used for: {{#if (gte value1 value2)}} ... {{/if}}
 *
 * Example: {{#if (gte 5 5)}} returns true {{/if}}
 */
export default helper(function gte([left, right] /*, named*/) {
  return left >= right;
});
