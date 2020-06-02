import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RatesRef } from '../interfaces/rate.interface';
import { catchError  } from 'rxjs/operators';
import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  public data: RatesRef;
  

  
  constructor(private http: HttpClient) {}

  getLatestRates() {
    return this.http.get('https://api.exchangeratesapi.io/latest');
  }

  // https://api.exchangeratesapi.io/history?base=PLN&start_at=2018-01-01&end_at=2018-09-01&symbols=USD
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
