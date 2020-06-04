import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets} from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})

export class LineChartComponent implements OnChanges {
  @Input() dataForChart: Map<string, any>;

  // Template binding: chart x-axis (dates) and y-axis (rates)
  dates = [];
  rates = [];

  // Template binding: chart configuration
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions = {
    elements: {
      line: {
          tension: 0 // disables bezier curves
      }
    },
    responsive: true,
    legend: {
      display: false,
      legend: {
        fontSize: 14
      }
    }
  }
  lineChartColors = [
    {
      borderWidth: 1,
      borderColor: '#007BFF',
      backgroundColor: '#d3d9df',
      pointRadius: 1,
      pointBackgroundColor: '#007BFF'
    }
  ];

  lineChartPlugins = [];
  lineChartType = 'line';


  ngOnChanges() {
    this.generateChartData();
    this.lineChartData = [{ data: this.rates, label: 'Rates' }];
    this.lineChartLabels = this.dates;
  }

  private generateChartData(): void {
    let dates = [];
    let rates = [];
    for (const key of this.dataForChart.keys()) {
      let rateObject = this.dataForChart.get(key);
      let value = rateObject[Object.keys(rateObject)[0]];
      dates.push(key)
      rates.push(value);
    }
    this.dates = dates;
    this.rates = rates;
  }

}