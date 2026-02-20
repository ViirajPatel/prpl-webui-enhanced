import Component from '@glimmer/component';

export default class StatusIndicatorComponent extends Component {
  get up() {
    return this.args.status == this.args.statusKey ? true : false;
  }
}
