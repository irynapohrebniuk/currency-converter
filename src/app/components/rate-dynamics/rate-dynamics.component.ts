import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DynamicRate } from '../../interfaces/dynamic-rate.interface';
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
  dataForChart = null;
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

  arrayTest = [1,2,3];
  mapa = {bla: 'blaa', bla2: 'blaaa2'};

  constructor(private apiService: ApiService, private calcService: CalcService) {
    this.from = this.calcService.calculateFrom(this.period);
    this.to = this.calcService.calculateTo();
    this.updateRates();
  }

  updateRates() {
    this.apiService.getRatesFromPeriod(this.base, this.currency, this.from, this.to)
      .subscribe((result: DynamicRate) => {
        this.dataForChart = result;
        this.data = this.convertDataToArray(result);
        this.collectionSize = this.data.length;
      })
  }

  convertDataToArray(result) {
    let ratesArray = [];
    let rates = result.rates;
        for (let item in rates) {
          let rateObj = rates[item];
          let date = item;
          let rate = Number(Object.values(rateObj).join(''));
          let obj = { "date": date, "rate": rate };
          ratesArray.push(obj);
        }
        
    return ratesArray;
  }

  setPageSize(value) {
    this.pageSize = parseInt(value);
    this.updateSlicedData();
  }

  get items() {
    this.updateSlicedData();
    return this.slicedData;
  }

  updateSlicedData() {
    this.slicedData = this.data
      .map((item, i) => ({ id: i + 1, ...item }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      if (propName === 'period') {
        this.from = this.calcService.calculateFrom(this.period);
        this.to = this.calcService.calculateTo();
        this.updateRates();
      }
    }
  }
}