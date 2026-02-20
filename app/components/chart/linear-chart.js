import Component from '@glimmer/component';
import { action } from '@ember/object';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { line, area } from 'd3-shape';
import { axisBottom } from 'd3-axis';

export default class ChartLinearComponent extends Component {
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
    // remove the chart drawn before re-rendering
    select(element).selectAll('*').remove();
    this.renderChart(element);
  }

  @action
  renderChart(element) {
    if (!this.args.data) return;

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

    // x-coordinate stepping
    let stepping = width / (dataCount - 1);

    let dataCounts = data.map((data) => data[key]);
    let maxValue = this.args.maxValue
      ? this.args.maxValue
      : Math.max(...dataCounts);

    let yScale = scaleLinear().domain([maxValue, 0]).range([0, height]);

    let xSet = [];
    for (let i = 0; i < dataCount; i++) xSet.push(i);

    let xScale = scaleBand().domain(xSet).range([0, width]);

    let svg = select(element);

    svg
      .append('path')
      .datum(data)
      .attr('fill', color)
      .attr('opacity', '.2')
      //.attr("stroke", "#000")
      //.attr("stroke-width", 1)
      .attr('stroke-linejoin', 'round')
      .attr(
        'd',
        area()
          .x(function (d, index) {
            return Math.ceil(stepping * index);
            return xScale(index);
          })
          .y1(function (d, index) {
            return yScale(d[key]);
          })
          .y0(yScale(0))
      );

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1)
      .attr('stroke-linejoin', 'round')
      .attr(
        'd',
        line()
          .x(function (d, index) {
            return Math.ceil(stepping * index);
            return xScale(index);
          })
          .y(function (d, index) {
            return yScale(d[key]);
          })
      );

    // axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height - 1})`)
      .call(
        axisBottom(scaleLinear([0, 1], [0, width - 1]))
          .ticks(1)
          .tickValues([])
          .tickSize(0)
      );
  }
}
