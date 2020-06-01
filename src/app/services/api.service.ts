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

  getCrossRates(countries, base) {
    return this.http.get('https://api.exchangeratesapi.io/latest?base='+ base+ '&symbols=' + countries).pipe(catchError(this.handleError));
  }

  handleError() {
    return throwError("there is no response from server api");
  }

}
