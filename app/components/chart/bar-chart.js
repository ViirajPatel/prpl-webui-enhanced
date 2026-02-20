import Component from '@glimmer/component';
import { action } from '@ember/object';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
i;

export default class ChartsBarChartComponent extends Component {
  get width() {
    return this.args.width ? this.args.width : '100%';
  }

  get height() {
    return this.args.height ? this.args.height : '100%';
  }

  @action
  initChart(element) {
    this.renderChart(element);
  }

  @action
  updateChart(element) {
    this.renderChart(element);
  }

  @action
  renderChart(element) {
    let dataCount = this.args.numOfValues;
    let data =
      this.args.data.length <= dataCount
        ? this.args.data
        : this.args.data.slice(
            this.args.data.length - dataCount,
            this.args.data.length + 1
          );
    let key = this.args.key;
    let color = this.args.color;

    let width = element.clientWidth;
    let height = element.clientHeight;

    let dataCounts = data.map((data) => data[key]);
    let maxValue = this.args.maxValue
      ? this.args.maxValue
      : Math.max(...dataCounts);

    let yScale = scaleLinear().domain([0, maxValue]).range([0, height]);

    let xSet = [];
    for (let i = 0; i < dataCount; i++) xSet.push(i);

    let xScale = scaleBand().domain(xSet).range([0, width]);

    let svg = select(element);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .merge(svg.selectAll('rect').data(data))
      .attr('fill', color)
      .attr('width', xScale.bandwidth())
      .attr('height', (data) => yScale(data[key]))
      .attr('x', (data, index) => (width / dataCount) * index)
      .attr('y', (data) => height - yScale(data[key]));
  }
}
