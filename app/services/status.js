import Service from '@ember/service';
import EmberObject from '@ember/object';
import Evented from '@ember/object/evented';
import { A } from '@ember/array';

export default Service.extend(Evented, {
  data: null,

  init() {
    this._super(...arguments);
    this.set('data', EmberObject.create({}));
  },

  addSource(identifier, limit) {
    let source = EmberObject.create({
      limit: limit,
      data: A(),
    });

    this.data[identifier] = source;
  },

  addData(identifier, data) {
    if (this.hasDataSource(identifier)) {
      let items = this.data[identifier].data.length;

      // check limit and remove old entries
      if (items >= this.data[identifier].limit) {
        let sliced = this.data[identifier].data.slice(
          -this.data[identifier].limit + 1
        );
        this.data[identifier].data = sliced;
      }

      // add timestamp in case entry is an object
      if (typeof data === 'object') data['timestamp'] = Date.now();

      this.data[identifier].data.push(data);

      // set trigger that data got added
      this.trigger(identifier + '-Added');
    }
  },

  hasDataSource(identifier) {
    if (this.data.hasOwnProperty(identifier)) {
      return true;
    } else {
      return false;
    }
  },

  getData(identifier) {
    if (this.data.hasOwnProperty(identifier)) {
      return this.data[identifier].data;
    } else {
      return A();
    }
  },
});
