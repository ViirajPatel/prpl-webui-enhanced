import Component from '@glimmer/component';

export default class DashboardMemoryStatusComponent extends Component {
  get data() {
    let total = this.args.status.get('Total');
    let free = this.args.status.get('Free');
    let used = total - free;
    return { free: free, used: used };
  }
}
