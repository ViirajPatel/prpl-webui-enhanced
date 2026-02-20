import Component from '@glimmer/component';
import { action } from '@ember/object';
import { select } from 'd3-selection';
import { scaleOrdinal } from 'd3-scale';
import { pie, arc } from 'd3-shape';
import { entries } from 'd3-collection';

export default class ChartDonutComponent extends Component {
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
    let pieChart = pie().value(function (d) {
      return d.value;
    });

    let radius = Math.min(this.width, this.height) / 2;
    let color = scaleOrdinal()
      .domain(this.args.data)
      .range(this.args.color.split(' '));

    let svg = select(element)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      )
      .selectAll('whatever')
      .data(pieChart(entries(this.args.data)))
      .enter()
      .append('path')
      .attr(
        'd',
        arc()
          .innerRadius(radius / 2)
          .outerRadius(radius)
      )
      .attr('fill', function (d) {
        return color(d.data.key);
      })
      .style('opacity', 1);
  }
}
