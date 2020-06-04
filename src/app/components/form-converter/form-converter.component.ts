import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-converter',
  templateUrl: './form-converter.component.html',
  styleUrls: ['./form-converter.component.scss'],
  providers: []
})
export class FormConverterComponent implements OnInit {

  currencyNames = [
    "PLN", "CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK",
    "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK",
    "JPY", "THB", "CHF", "SGD", "BGN", "TRY", "CNY", "NOK",
    "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR",
    "EUR"
  ];



  imgFlagsFolder = "../../../assets/images/country_flags/";
  periods = ['7 days', '1 month', '1 year', '5 years'];

  data = null;
  period = null;
  currentIndex = 0;

  defaultCurrencySource = this.currencyNames[0];
  defaultCurrencyTarget = this.currencyNames[32];

  currencySourceSrc =  this.imgFlagsFolder + this.defaultCurrencySource.toLowerCase() + ".png";
  currencyTargetSrc = this.imgFlagsFolder + this.defaultCurrencyTarget.toLowerCase() + ".png";
  
  currencySource = this.defaultCurrencySource;
  currencyTarget = this.defaultCurrencyTarget;
  
  currencySrc = (val) => this.imgFlagsFolder + val.toLowerCase() + ".png";

  constructor() { }

  ngOnInit(): void {
    this.period = this.periods[this.currentIndex];
    this.data = {};
    for (let currency of this.currencyNames) {
      this.data[currency] = this.imgFlagsFolder + currency.toLowerCase() + ".png";
    }
  }

  handleClick(index) {
    this.currentIndex = index;
    this.period = this.periods[this.currentIndex];
  }

  selectCurrencySource(value) {
    this.currencySource = value;
    this.currencySourceSrc = this.imgFlagsFolder + value.toLowerCase() + ".png";
  }

  selectCurrencyTarget(value) {
    this.currencyTarget = value;
    this.currencyTargetSrc = this.imgFlagsFolder + value.toLowerCase() + ".png";
  }
}