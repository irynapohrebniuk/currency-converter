import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Rates } from 'src/app/interfaces/rates.interface';

@Component({
  selector: 'app-cross-rates',
  templateUrl: './cross-rates.component.html',
  styleUrls: ['./cross-rates.component.scss'],
})
export class CrossRatesComponent implements OnInit {
  public data;
  ratesRefs = {};

  currencies = new Map<string, string>();
  currencyBase;
  currencyBaseSrc: string;
  
  bases = ["USD","GBP","PLN","CZK","RON","AUD","BGN", "DKK", "HRK", "ZAR"];
  header = ["#",...this.bases];

  countries = this.bases;
  countries_str = this.bases.toString();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    let currencyNames = this.apiService.getCurrencyNames();
    for (let i = 0; i < currencyNames.length; i++) {
      this.currencies.set(currencyNames[i], this.apiService.getFlagImgSrc(currencyNames[i]));
    }
    this.currencyBase = 'USD';
    this.currencyBaseSrc = this.currencies.get(this.currencyBase);

    for (let base of this.bases) {
        this.apiService.getCrossRates(this.countries_str, base).subscribe((result: Rates) => {
            let data = {"rates": result.rates}
            this.ratesRefs[base] = data;
        }); 
    }
  }

  getFlag(currencyName) {
    return this.apiService.getFlagImgSrc(currencyName);
  }

  selectCurrencyBase(event) {
    if (event.target.value === undefined) {
      this.currencyBase = event.target.parentNode.value;
      this.currencyBaseSrc = this.apiService.getFlagImgSrc(event.target.parentNode.value);
    } else {
      this.currencyBase = event.target.value;
      this.currencyBaseSrc = this.apiService.getFlagImgSrc(event.target.value);
    }
  }

}
