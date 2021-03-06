import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { Rates } from 'src/app/interfaces/rates.interface';
import { CalcService } from 'src/app/services/calc.service';

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

  constructor(private apiService: ApiService,
              private calc: CalcService) {}

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
      rates[key] = this.calc.toFinancialFormat(rates[key]);
    });
    return rates;
  }

  getLatestRates() {
    this.apiService.getLatestRates(this.currencyBase, this.popularCurrencies)
    .subscribe((result: Rates) => {
      let rates = result.rates;
      this.popularRates = this.formatRates(rates);
    });
  }
}
