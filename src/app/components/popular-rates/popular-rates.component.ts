import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { DynamicRate } from 'src/app/interfaces/dynamic-rate.interface';

@Component({
  selector: 'app-popular-rates',
  templateUrl: './popular-rates.component.html',
  styleUrls: ['./popular-rates.component.scss']
})
export class PopularRatesComponent implements OnInit {

  currencies = new Map<string, string>();
  popularRates;
  popularCurrencies = 'USD,JPY,CAD,CHF,GBP'
  currencySrc: string;
  currencyBase;
  currencyBaseSrc: string;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    let currencyNames = this.apiService.getCurrencyNames();
    for (let i = 0; i < currencyNames.length; i++) {
      this.currencies.set(currencyNames[i], this.apiService.getFlagImgSrc(currencyNames[i]));
    }
    this.currencyBase = 'EUR';
    this.currencyBaseSrc = this.currencies.get(this.currencyBase);
    this.getLatestRates();
  }

  getFlag(currencyName) {
    return this.apiService.getFlagImgSrc(currencyName);
  }

  formatRates(rates) {
    Object.keys(rates).map(key => {
      console.log("key", key);
      rates[key] = Number(Number.parseFloat(rates[key]).toFixed(2));
    });
    return rates;
  }

  getLatestRates() {
    this.apiService.getLatestRates(this.currencyBase, this.popularCurrencies).subscribe((result: DynamicRate) => {
      let rates = result.rates;
      this.popularRates = this.formatRates(rates);
      console.log("this.formatRates(rates) =", this.formatRates(rates));
      console.log("this.popularRates =", this.popularRates);
    });
  }
}
