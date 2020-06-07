import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DynamicRate } from '../../interfaces/dynamic-rate.interface';
import { FormConverterComponent } from '../form-converter/form-converter.component'
import { CalcService } from 'src/app/services/calc.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-rate-dynamics',
  templateUrl: './rate-dynamics.component.html',
  styleUrls: ['./rate-dynamics.component.scss']
})
export class RateDynamicsComponent implements OnChanges {
  @Input() period: FormConverterComponent;
  @Input() base: string;
  @Input() currency: string;
  
  private from;
  private to;

  // Template binding
  page = 1;
  pageSize = 4;
  maxSize = 5;
  pageItems = [4, 6, 8, 10];

  data;
  dataForChart;
  slicedData;
  collectionSize;
  

  constructor(private apiService: ApiService, private calcService: CalcService) {
    console.info("rd.constructor");
  }

  updateRates() {
    console.info("rd.updateRates");
    this.apiService
      .getRatesFromPeriod(this.base, this.currency, this.from, this.to, this.period)
      .subscribe((result: DynamicRate) => {
        this.dataForChart = this.getSortedRates(result.rates);
        let ratesMap = this.dataForChart;
        this.data = this.simplifyRatesMap(ratesMap);
        this.updateSlicedData();
        this.collectionSize = this.data.length;
      });
  }

  setPageSize(value) {
    console.info("rd.setPageSize=", value);
    this.pageSize = parseInt(value);
    this.updateSlicedData();
  }

  // get items() {
  //   console.debug("get items");
  //   this.updateSlicedData();
  //   console.debug("this.slicedData", this.slicedData);
  //   return this.slicedData;
  // }

  ngOnChanges(changes: SimpleChanges): void {
    console.info("ngOnChanges.changes", changes);
    for (let propName in changes) {
      if (propName === 'period') {
        this.from = this.calcService.calculateFrom(this.period);
        this.to = this.calcService.calculateTo();
      }
      // if (propName === 'base' || propName === 'currency') {
      //   this.updateRates();
      //   this.updateSlicedData();
      //   console.debug("propName === base");
      // } 
    }
    this.updateRates();
  }

  private updateSlicedData() {
    console.info("rd.updateSlicedData");
    this.slicedData = this.data
      .map((item, i) => ({ id: i + 1, ...item }))
      .slice((this.page - 1) * this.pageSize, 
              (this.page - 1) * this.pageSize + this.pageSize);
  }

  private simplifyRatesMap(ratesMap: Map<string,any>) {
    let resultMap = new Map();
    for (const key of ratesMap.keys()) {
      let rateObject = ratesMap.get(key);
      let value = rateObject[Object.keys(rateObject)[0]]
      resultMap.set(key, value);
    }
    return [...resultMap.entries()];
  }

  private getSortedRates(rawRates: any) {
    let rawRatesAsMap = new Map(Object.entries(rawRates));
    return new Map([...rawRatesAsMap.entries()].sort());    
  }

}