import Component from '@glimmer/component';

export default class DashboardWanComponent extends Component {
  get statisticData() {
    let data = [];
    let last = null;
    this.args.statisticData.forEach((entry) => {
      if (last) {
        // get the time difference between entries
        let seconds = (entry.timestamp - last.timestamp) / 1000;

        data.push({
          timestamp: Date.now(),
          sPackets: (entry.sPackets - last.sPackets) / seconds,
          rPackets: (entry.rPackets - last.rPackets) / seconds,
          sBytes: (entry.sBytes - last.sBytes) / seconds,
          rBytes: (entry.rBytes - last.rBytes) / seconds,
        });
      }
      last = entry;
    });
    return data;
  }
}
