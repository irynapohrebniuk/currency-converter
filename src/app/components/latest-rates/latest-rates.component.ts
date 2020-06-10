import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { Rates } from 'src/app/interfaces/rates.interface';
import { CalcService } from 'src/app/services/calc.service';

@Component({
  selector: 'app-latest-rates',
  templateUrl: './latest-rates.component.html',
  styleUrls: ['./latest-rates.component.scss']
})
export class LatestRatesComponent implements OnInit {

  currencies = new Map<string, string>();
  latestRates;
  firstFiveRates;
  restRates;
  rates;
  clicked = false;
  buttonName = 'All rates';
  
  currencyBase;
  currencyBaseSrc: string;

  constructor(private apiService: ApiService, private calc: CalcService) {}

  ngOnInit(): void {
    let currencyNames = this.apiService.getCurrencyNames();
    for (let i = 0; i < currencyNames.length; i++) {
      this.currencies.set(currencyNames[i], this.apiService.getFlagImgSrc(currencyNames[i]));
    }
    this.currencyBase = 'USD';
    this.currencyBaseSrc = this.currencies.get(this.currencyBase);
    this.getLatestRates();
  }

  private slicedData() {
    this.firstFiveRates = new Map<string, number>();
    this.restRates = new Map<string, number>();
    let keys = Object.keys(this.latestRates.rates);
    let number = (this.clicked) ? keys.length : 5;

    for (let i = 0; i < keys.length; i++) {
      if (i < number) {
        this.firstFiveRates.set(keys[i], this.latestRates.rates[keys[i]]);
      }
      this.restRates.set(keys[i], this.latestRates.rates[keys[i]]);
    }
    this.rates = this.firstFiveRates;
  }

  onClick() {
    this.clicked = !this.clicked;
    this.rates = (this.clicked) ? this.restRates : this.firstFiveRates;
    this.buttonName = (this.clicked) ? 'Less' : 'All rates';
  }

  getFlag(currencyName) {
    return this.apiService.getFlagImgSrc(currencyName);
  }

  getLatestRates() {
    this.apiService.getAllLatestRates(this.currencyBase).subscribe((result: Rates) => {
      this.latestRates = result;
      this.slicedData();
    });
  }

  selectCurrencyBase(event) {
    if (event.target.value === undefined) {
      this.currencyBase = event.target.parentNode.value;
      this.currencyBaseSrc = this.apiService.getFlagImgSrc(event.target.parentNode.value);
    } else {
      this.currencyBase = event.target.value;
      this.currencyBaseSrc = this.apiService.getFlagImgSrc(event.target.value);
    }
    this.getLatestRates();
    this.clicked = false;
    this.buttonName = 'All rates';
  }

  toMoneyFormat(num) {
    return this.calc.toMoneyFormat(num);
  }


}
