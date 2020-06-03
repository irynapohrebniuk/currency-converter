import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { RateDynamicsComponent } from '../rate-dynamics/rate-dynamics.component';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})

export class LineChartComponent implements OnChanges {
  @Input() data: RateDynamicsComponent;

  dates = [];
  rates = [];
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  // lineChartData: ChartDataSets[] = [{ data: this.rates, label: 'Rates' }];

  // lineChartLabels: Label[] = this.dates;

  lineChartOptions = {
    responsive: true,
    
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  ngOnChanges() {
    
    // if (this.data) {
    //   let dates = Object.keys(this.data);
    //   let rates = Object.values(this.data);
    //   let roundedRates = rates.map((rate => rate.toFixed(2)));
    //   this.lineChartData = [{ data: roundedRates, label: 'Rates' }];
    //   this.lineChartLabels = dates;
    //   // console.log("dates", dates);
    //   // console.log("rates", rates);
    //   }
    }
  
}
