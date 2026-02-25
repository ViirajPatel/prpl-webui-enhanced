import { helper } from '@ember/component/helper';

/**
 * Or Helper
 *
 * WHY: Performs logical OR on multiple values in templates.
 * Used for: disabled={{or value1 value2}}
 *
 * Example: {{or false true}} returns true
 */
export default helper(function or(params /*, named*/) {
  return params.some((param) => param);
});
