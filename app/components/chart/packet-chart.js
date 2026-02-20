import Component from '@glimmer/component';
import { action } from '@ember/object';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { line, area } from 'd3-shape';
import { axisBottom } from 'd3-axis';

export default class ChartPacketChartComponent extends Component {
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
    let sKey = this.args.sKey;
    let rKey = this.args.rKey;
    let sColor = this.args.sColor;
    let rColor = this.args.rColor;

    let width = element.clientWidth;
    let height = element.clientHeight;

    let dividers = this.args.dividers ? this.args.dividers.split(',') : [];
    let labels = this.args.labels ? this.args.labels.split(',') : [];
    let precision = this.args.precision ? this.args.precision : 0;

    // x-coordinate stepping
    let stepping = width / (dataCount - 1);

    // combine rx and tx to find the max value
    let combined = [];
    data.forEach((entry) => {
      combined.push({ value: entry[sKey] });
      combined.push({ value: entry[rKey] });
    });

    let dataCounts = combined.map((data) => data['value']);
    let maxValue = Math.max(...dataCounts) ? Math.max(...dataCounts) : 1; // if max is 0 a higher value us needed to draw the chart at the base line

    let sMax = data.reduce(
      (previous, currentValue) =>
        currentValue[sKey] > previous ? currentValue[sKey] : previous,
      0
    );
    let rMax = data.reduce(
      (previous, currentValue) =>
        currentValue[rKey] > previous ? currentValue[rKey] : previous,
      0
    );

    let yUpperScale = scaleLinear()
      .domain([maxValue, 0])
      .range([0, height / 2]);
    let yLowerScale = scaleLinear()
      .domain([maxValue, 0])
      .range([height / 2, 1]);

    let svg = select(element);

    // upper part / send
    svg
      .append('path')
      .datum(data)
      .attr('fill', sColor)
      .attr('opacity', '.2')
      .attr('stroke-linejoin', 'round')
      .attr(
        'd',
        area()
          .x(function (d, index) {
            return Math.ceil(stepping * index);
          })
          .y1(function (d, index) {
            return yUpperScale(d[sKey]);
          })
          .y0(yUpperScale(0))
      );

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', sColor)
      .attr('stroke-width', 1)
      .attr('stroke-linejoin', 'round')
      .attr(
        'd',
        line()
          .x(function (d, index) {
            return stepping * index;
          })
          .y(function (d, index) {
            return yUpperScale(d[sKey]);
          })
      );

    // receive max label
    let sMaxLabel =
      dividers && labels
        ? this.getNumber(sMax, dividers, labels, precision)
        : sMax;

    svg
      .append('text')
      .attr('font-size', 10)
      .attr('x', 0)
      .attr('y', 15)
      .text(sMaxLabel);

    // lower part / receive
    svg
      .append('path')
      .datum(data)
      .attr('fill', rColor)
      .attr('opacity', '.2')
      .attr('stroke-linejoin', 'round')
      .attr(
        'd',
        area()
          .x(function (d, index) {
            return stepping * index;
          })
          .y1(function (d, index) {
            return height / 2 + yLowerScale(d[rKey]);
          })
          .y0(height / 2 + yLowerScale(0))
      );

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', rColor)
      .attr('stroke-width', 1)
      .attr('stroke-linejoin', 'round')
      .attr(
        'd',
        line()
          .x(function (d, index) {
            return stepping * index;
          })
          .y(function (d, index) {
            return height / 2 + yLowerScale(d[rKey]);
          })
      );

    // receive max label
    let rMaxLabel =
      dividers && labels
        ? this.getNumber(rMax, dividers, labels, precision)
        : rMax;

    svg
      .append('text')
      .attr('font-size', 10)
      .attr('x', 0)
      .attr('y', height - 5)
      .text(rMaxLabel);

    // axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height / 2})`)
      .call(
        axisBottom(scaleLinear([0, 1], [0, width - 1]))
          .ticks(1)
          .tickValues([])
          .tickSize(0)
      );
  }

  @action
  getNumber(number, dividers, labels, precision) {
    let index = 0;

    while (index < dividers.length && number > dividers[index + 1]) {
      index++;
      number = number / dividers[index];
    }

    return (
      number.toFixed(precision) + (labels[index] ? ' ' + labels[index] : '')
    );
  }
}
