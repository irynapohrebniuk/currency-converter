import { Component, OnInit } from '@angular/core';
import { CalcService } from '../../services/calc.service'
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-form-converter',
  templateUrl: './form-converter.component.html',
  styleUrls: ['./form-converter.component.scss'],
  providers: [CalcService]
})
export class FormConverterComponent implements OnInit {

  currencyNames = [
    "PLN", "CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK",
    "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK",
    "JPY", "THB", "CHF", "SGD", "BGN", "TRY", "CNY", "NOK",
    "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR",
    "EUR"
  ];
  imgFlagsFolder = "../../../assets/images/flags/";
  periods = ['7 days', '1 month', '1 year', '5 years'];

  data = null;
  period = null;
  currentIndex = 0;

  defaultCurrencySource = this.currencyNames[0];
  currencySource = this.defaultCurrencySource;
  currencySourceSrc = this.imgFlagsFolder + this.defaultCurrencySource.toLowerCase() + ".png";

  constructor(private apiServise: ApiService) { }

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

  selectCurrency(value) {
    this.currencySource = value;
    this.currencySourceSrc = this.imgFlagsFolder + value.toLowerCase() + ".png";
  }
}