import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DynamicRate } from '../../interfaces/dynamic-rate.interface';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})

export class LineChartComponent implements OnChanges {
  @Input() dataForChart: DynamicRate;

  dates = [];
  rates = [];
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions = {
    responsive: true,
    legend: {
      display: true,
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
      pointRadius: 2,
      pointBackgroundColor: '#007BFF'
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';


  ngOnChanges() {
    this.collectData();
    this.lineChartData = [{ data: this.rates, label: 'Rates' }];
    this.lineChartLabels = this.dates;
  }

  collectData() {
    let dates = Object.keys(this.dataForChart.rates);
    let ratesTmp = Object.values(this.dataForChart.rates);
    let rateValues = [];
    for (let i in ratesTmp) {
      let temp = ratesTmp[i];
      let value = Object.values(temp)[0];
      rateValues.push(value);
    }
    this.rates = rateValues;
    this.dates = dates;
  }

}