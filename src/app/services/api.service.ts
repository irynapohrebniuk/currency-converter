import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError  } from 'rxjs/operators';
import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
 

  private readonly currencyNames = [
    "PLN", "EUR", "CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK",
    "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK",
    "JPY", "THB", "CHF", "SGD", "BGN", "TRY", "CNY", "NOK",
    "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"
  ];

  private readonly flagImagesFolder = "../../../assets/images/country_flags/";

  private readonly periodNames = [
    '7 days', '1 month', '1 year', '5 years'
  ];
  
  constructor(private http: HttpClient) {}

  getFlagImgSrc(currencyName: string) {
    if (currencyName != undefined) {
      return this.flagImagesFolder + currencyName.toLowerCase() + ".png"
    }
  }

  getPeriodNames() {
    return this.periodNames;
  }

  getCurrencyNames() {
    return this.currencyNames;
  }

  getDefaultSourceCurrency() {
    return this.currencyNames[1];
  }

  getDefaultTargetCurrency() {
    return this.currencyNames[0];
  }

  getLatestRates() {
    return this.http.get('https://api.exchangeratesapi.io/latest');
  }

  // Call example: https://api.exchangeratesapi.io/history?base=PLN&start_at=2018-01-01&end_at=2018-09-01&symbols=USD  
  getRatesFromPeriod(base, currency,from,to) {
    return this.http.get('https://api.exchangeratesapi.io/history?base=' + base + '&start_at='+ 
        from +'&end_at=' + to + '&symbols=' + currency);
  }

  getCrossRates(countries, base) {
    return this.http.get('https://api.exchangeratesapi.io/latest?base='+ base+ '&symbols=' + countries).pipe(catchError(this.handleError));
  }

  handleError() {
    return throwError("there is no response from server api");
  }
}