import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Rates } from '../../interfaces/rates.interface';
import { FormConverterComponent } from '../form-converter/form-converter.component'
import { CalcService } from 'src/app/services/calc.service';
import { ApiService } from '../../services/api.service';
import { Periods } from 'src/app/services/periods.enum';

@Component({
  selector: 'app-rate-dynamics',
  templateUrl: './rate-dynamics.component.html',
  styleUrls: ['./rate-dynamics.component.scss']
})
export class RateDynamicsComponent implements OnChanges {
  private from;
  private to;
  private data;

  @Input() period: Periods;
  @Input() base: string;
  @Input() currency: string;

  // Pagination properties
  page = 1;
  pageSize = 4;
  maxSize = 5;
  pageItems = [4, 6, 8, 10];
  collectionSize;


  dataForChart;
  slicedData;

  constructor(private apiService: ApiService,
    public calc: CalcService) { }

  updateRates() {
    this.apiService.getRatesFromPeriod(this.base, this.currency, this.from, this.to, this.period)
      .subscribe((result: Rates) => {
        this.dataForChart = this.getSortedRates(result.rates, false);
        let ratesMap = this.getSortedRates(result.rates, true);
        this.data = this.simplifyRatesMap(ratesMap);
        this.updateSlicedData();
        this.collectionSize = this.data.length;
      });
  }

  setPageSize(value) {
    this.pageSize = parseInt(value);
    this.updateSlicedData();
  }

  updateSlicedData() {
    this.slicedData = this.data
      .map((item, i) => ({ id: i + 1, ...item }))
      .slice((this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      if (propName === 'period') {
        this.from = this.calc.calculateFrom(this.period);
        this.to = this.calc.calculateTo();
      }
    }
    this.updateRates();
  }

  private simplifyRatesMap(ratesMap: Map<string, any>) {
    let resultMap = new Map();
    for (const key of ratesMap.keys()) {
      let rateObject = ratesMap.get(key);
      let value = rateObject[Object.keys(rateObject)[0]]
      resultMap.set(key, value);
    }
    return [...resultMap.entries()];
  }

  private getSortedRates(rawRates: any, reverse: boolean) {
    let rawRatesAsMap = new Map(Object.entries(rawRates));
    let sortedEntries = reverse 
        ? [...rawRatesAsMap.entries()].sort().reverse() 
        : [...rawRatesAsMap.entries()].sort()
    return new Map(sortedEntries);
  }

}