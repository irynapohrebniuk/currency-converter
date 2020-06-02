import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DynamicsRate } from '../../interfaces/dynamics-rate.interface';
import { FormConverterComponent } from '../form-converter/form-converter.component'
import { CalcService } from 'src/app/services/calc.service';


@Component({
  selector: 'app-rate-dynamics',
  templateUrl: './rate-dynamics.component.html',
  styleUrls: ['./rate-dynamics.component.scss']
})
export class RateDynamicsComponent implements OnChanges {
  @Input() period: FormConverterComponent;

  data = null;
  value: string = '4';

  base = 'USD';
  currency = 'PLN';


  from;
  to;
  page = 1;
  pageSize = 4;
  collectionSize;

  constructor(private apiService: ApiService, private calcService: CalcService) {
    this.from = this.calcService.calculateFrom(this.period);
    this.to = this.calcService.calculateTo();
    this.getRatesFromPeriod();
    console.log("constructor() DATA: ", this.data);
  }

  ngOnChanges(): void {
    this.from = this.calcService.calculateFrom(this.period);
    this.to = this.calcService.calculateTo();
    this.getRatesFromPeriod();
    console.log("ngOnChanges()", this.base, this.currency, this.from, this.to, this.period);
    console.log("ngOnChanges() DATA: ", this.data);
  }

  getRatesFromPeriod() {
    console.log("from", this.from);
    this.apiService.getRatesFromPeriod(this.base, this.currency, this.from, this.to)
      .subscribe((result: DynamicsRate) => {
        let map = {};
        for (let [key, value] of Object.entries(result.rates)) {
          map[key] = Object.entries(value)[0][1];
        }
        this.data = map;
      })
  }

}
