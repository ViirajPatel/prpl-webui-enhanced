import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SelectComponent extends Component {
  get selOptions() {
    let options = [];

    this.args.options.forEach((value) => {
      options.push({
        key: value[this.args.optValue],
        label: value[this.args.optLabel],
      });
    });

    return options;
  }

  get disabled() {
    return this.args.disabled ? 'disabled' : '';
  }

  @action
  update(event) {
    this.args.onChange(event.currentTarget.value);
  }
}
