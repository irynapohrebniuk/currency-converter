import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Rates } from 'src/app/interfaces/rates.interface';
import { CalcService } from 'src/app/services/calc.service';

@Component({
  selector: 'app-form-converter',
  templateUrl: './form-converter.component.html',
  styleUrls: ['./form-converter.component.scss'],
})

export class FormConverterComponent implements OnInit {

  constructor(private apiService: ApiService, private calc: CalcService) { 
    
    this.currencyNames = this.apiService.getCurrencyNames();
    this.periods = this.apiService.getPeriodNames();
    this.currencySource = this.apiService.getDefaultSourceCurrency();
    this.currencySourceSrc = this.apiService.getFlagImgSrc(this.currencySource);
    this.currencyTarget = this.apiService.getDefaultTargetCurrency();
    this.currencyTargetSrc = this.apiService.getFlagImgSrc(this.currencyTarget);
    this.period = this.periods[this.currentIndex];
  }

  // Template binding
  data = null;
  period: string;
  periods: string[];
  currentIndex = 0;
  currencyNames: string[];
  currencySource: string;
  currencySourceAmount = 1;
  currencySourceSrc: string;
  currencyTarget: string;
  baseToTarget: number;
  targetToBase: number;
  currencyTargetAmount;
  currencyTargetSrc: string;


  ngOnInit(): void {
    
    this.data = new Map();
    for (let index = 0; index < this.currencyNames.length; index++) {
      const currency = this.currencyNames[index];
      this.data.set(currency, this.apiService.getFlagImgSrc(currency));
    }
    this.getLatestRates(this.currencySource, this.currencyTarget);
  }


  keyupCurrencyAmount(value) {
    this.currencySourceAmount = value;
    this.currencyTargetAmount = (this.currencySourceAmount * this.baseToTarget);
    if (value = '') this.currencySourceAmount = 0;
  }

  handleClick(index) {
    this.currentIndex = index;
    this.period = this.periods[this.currentIndex];
  }

  reverseRates() {
    let temp;
    let tempSrc;
    temp = this.currencySource;
    tempSrc = this.currencySourceSrc;
    this.currencySource = this.currencyTarget;
    this.currencySourceSrc = this.currencyTargetSrc;
    this.currencyTarget = temp;
    this.currencyTargetSrc = tempSrc;
    this.currencySourceAmount = 1;
  }

  selectCurrencySource(event) {
    if (event.target.value === undefined) {
      this.currencySource = event.target.parentNode.value;
      this.currencySourceSrc = this.apiService.getFlagImgSrc(event.target.parentNode.value);
    } else {
      this.currencySource = event.target.value;
      this.currencySourceSrc = this.apiService.getFlagImgSrc(event.target.value);
    }
    this.getLatestRates(this.currencySource, this.currencyTarget);
  }

  selectCurrencyTarget(event) {
    if (event.target.value === undefined) {
      this.currencyTarget = event.target.parentNode.value;
      this.currencyTargetSrc = this.apiService.getFlagImgSrc(event.target.parentNode.value);
    } else {
      this.currencyTarget = event.target.value;
      this.currencyTargetSrc = this.apiService.getFlagImgSrc(event.target.value);
    }
    this.getLatestRates(this.currencySource, this.currencyTarget);
  }


  getLatestRates(base,currency) {
    
    this.apiService.getLatestRates(base,currency).subscribe((result: Rates) => {
      let rates;
      rates = result.rates;
      this.baseToTarget = rates[currency];
      this.currencyTargetAmount = this.currencySourceAmount * this.baseToTarget;
    });
    this.apiService.getLatestRates(currency,base).subscribe((result: Rates) => {
      let rates;
      rates = result.rates;
      this.targetToBase = rates[base];
    });
  }

  toMoneyFormat(value) {
    return this.calc.toMoneyFormat(value);
  }

  toFinancialFormat(value) {
    return this.calc.toFinancialFormat(value);
  }
}