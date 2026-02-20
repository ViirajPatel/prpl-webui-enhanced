import Component from '@glimmer/component';

export default class NumberComponent extends Component {
  get number() {
    let dividers = this.args.dividers.split(',');
    let labels = this.args.labels.split(',');
    let number = this.args.number ? this.args.number : 0;
    let precision = this.args.precision ? this.args.precision : 0;
    let index = 0;

    while (index < dividers.length && number > dividers[index + 1]) {
      index++;
      number = number / dividers[index];
    }

    return number.toFixed(precision) + ' ' + labels[index];
  }
}
