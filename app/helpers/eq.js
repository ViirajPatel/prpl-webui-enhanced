import { helper } from '@ember/component/helper';

/**
 * Equality Helper
 *
 * WHY: Compares two values for equality in templates.
 * Used for: selected={{eq value1 value2}}
 *
 * Example: {{eq "hello" "hello"}} returns true
 */
export default helper(function eq([left, right] /*, named*/) {
  return left === right;
});
