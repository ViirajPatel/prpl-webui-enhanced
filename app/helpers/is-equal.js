import { helper } from '@ember/component/helper';

export default helper(function isEqual([reference, value]) {
  return reference === value ? true : false;
});
