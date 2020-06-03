import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  from;
  to;
  base = 'USD';
  currency = 'RON';

  // Pagination configuration 
  page = 1;
  pageSize = 4;
  maxSize = 5;
  collectionSize = null;
  pageItems = [4, 6, 8, 10];
  slicedData;

  constructor(private apiService: ApiService, private calcService: CalcService) {
    this.from = this.calcService.calculateFrom(this.period);
    this.to = this.calcService.calculateTo();
    this.data = this.getRatesFromPeriod();
    
  }

  getRatesFromPeriod() {
    console.log("getRatesFromPeriod()");
    let ratesArray = [];
    this.apiService.getRatesFromPeriod(this.base, this.currency, this.from, this.to)
      .subscribe((result: DynamicsRate) => {
        let rates = result.rates;
        for (let item in rates) {
          let rateObj = rates[item];
          let date = item;
          let rate = Number(Object.values(rateObj).join(''));
          let obj = { "date": date, "rate": rate };
          ratesArray.push(obj);
        }
        this.collectionSize = ratesArray.length;
      })
      
      return ratesArray;
  }

  setPageSize(value) {
    this.pageSize = parseInt(value);
    this.updateSlicedData();
  }

  get items() {
    console.log("page, pageSize, maxSize, collectionSize =", this.page, this.pageSize, this.maxSize, this.collectionSize);
    this.updateSlicedData();
    return this.slicedData;    
  }

  updateSlicedData() {
    console.log("(this.page - 1) * this.pageSize", (this.page - 1) * this.pageSize);
    console.log("(this.page - 1) * this.pageSize + this.pageSize", (this.page - 1) * this.pageSize + this.pageSize);

    this.slicedData = this.data
      .map((item, i) => ({ id: i + 1, ...item }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      if (propName === 'period') {
        this.from = this.calcService.calculateFrom(this.period);
        this.to = this.calcService.calculateTo();
        this.data = this.getRatesFromPeriod();
      }

     }

  }
}
