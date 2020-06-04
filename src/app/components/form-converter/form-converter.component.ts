import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-form-converter',
  templateUrl: './form-converter.component.html',
  styleUrls: ['./form-converter.component.scss'],
})

export class FormConverterComponent implements OnInit {
  
  constructor(private apiService: ApiService) { }

  // Template binding
  data = null;
  period: string;
  periods: string[];
  currentIndex = 0;
  currencyNames: string[];
  currencySource: string;
  currencyTarget: string;
  currencySourceSrc: string;
  currencyTargetSrc: string;
  
  
  ngOnInit(): void {
    this.currencyNames = this.apiService.getCurrencyNames();
    this.periods = this.apiService.getPeriodNames();
    this.currencySource = this.apiService.getDefaultSourceCurrency();
    this.currencySourceSrc = this.apiService.getFlagImgSrc(this.currencySource);
    this.currencyTarget = this.apiService.getDefaultTargetCurrency();
    this.currencyTargetSrc = this.apiService.getFlagImgSrc(this.currencyTarget);
    
    this.period = this.periods[this.currentIndex];
    this.data = new Map();
    for (let index = 0; index < this.currencyNames.length; index++) {
        const currency = this.currencyNames[index];
        this.data.set(currency, this.apiService.getFlagImgSrc(currency));
    }
  }

  handleClick(index) {
    this.currentIndex = index;
    this.period = this.periods[this.currentIndex];
  }

  selectCurrencySource(value) {
    this.currencySource = value;
    this.currencySourceSrc = this.apiService.getFlagImgSrc(value);
  }

  selectCurrencyTarget(value) {
    this.currencyTarget = value;
    this.currencyTargetSrc = this.apiService.getFlagImgSrc(value);
  }
}