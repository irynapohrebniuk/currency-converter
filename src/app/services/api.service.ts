import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, shareReplay  } from 'rxjs/operators';
import { throwError, Observable, of, EMPTY } from 'rxjs'
import { Periods } from './periods.enum';

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

  private readonly periodNames = Object.values(Periods);

  private cache:any = {};

  /*
  * Let assume there are 32 currency types. 
  * Total number of cominations of possible pairs is 32 * 32 = 904 
  * Each combination will generate the following requests:
  * 1. current rates     ~  64 bytes per request
  * 2. rates for 7 day   ~ 241 bytes per request
  * 3. rates for 1 month ~ 774 bytes per request
  * 
  * So total size of cache in Mb: (64 + 241 + 774) * 3 * 904 = 2926248 bytes = 3Mb  
  */
  private cacheMaxSize:number = 904 * 3;

  private lastCacheCleanDate: Date = new Date();

  
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

  getLatestRates(base, currency): Observable<any> {
    this.checkCacheHealth();
    let requestString = 'https://api.exchangeratesapi.io/latest?base=' + base + '&symbols='+ currency;
    console.log("requestString=", requestString);
    let cacheKey = this.getHashOfString(requestString);
    if (this.cache[cacheKey]) {
      console.info("Get the latest rates from cache [" + base +"/" + currency + "] for pair");
      return this.cache[cacheKey];  
    }
    console.info("Get the latest rates for pair [" + base +"/" + currency + "] from source");
    this.cache[cacheKey] = this.http.get(requestString)
      .pipe(
        shareReplay(1),
        catchError(error => {
          delete this.cache[cacheKey];
          console.error("There is no response from server, add empty value to cache")
          return EMPTY;
        })
      );
    return this.cache[cacheKey];  
  }

  getRatesFromPeriod(base, symbols, start_at, end_at, periodType): Observable<any>{
    this.checkCacheHealth();
    let requestString = 'https://api.exchangeratesapi.io/history?base=' + base 
                          + '&start_at='+ start_at 
                          + '&end_at=' + end_at 
                          + '&symbols=' + symbols;
    console.log("requestString=", requestString);                      
    // TODO: Redesign as default parameter
    if (periodType === undefined) { 
      periodType = Periods.SEVEN_DAYS;
    }
    if(periodType === Periods.SEVEN_DAYS || periodType == Periods.ONE_MONTH) {
      let cacheKey = this.getHashOfString(requestString);
      if (this.cache[cacheKey]) {
        console.info("Get rates for '" + periodType + "'[" + start_at + " ~ " + end_at + "] from cache");
        return this.cache[cacheKey];  
      }
      console.info("Get rates for '" + periodType + "' [" + start_at + " ~ " + end_at + "] from source and add to cache")
      this.cache[cacheKey] = this.http.get(requestString)
      .pipe(
        shareReplay(1),
        catchError(error => {
          delete this.cache[cacheKey];
          console.error("There is no response from server, add empty value to cache. Reason: [ " + error + "]")
          return EMPTY;
        })
      )
      return this.cache[cacheKey];
    }
    console.info("Get rates for '" + periodType + 
        "' [" + start_at + " ~" + end_at + "] from source without interaction with cache");
    return this.http.get('https://api.exchangeratesapi.io/history?base=' + base + '&start_at='+ 
           start_at +'&end_at=' + end_at + '&symbols=' + symbols).pipe(catchError(this.handleError));
  }

  getCrossRates(countries, base): Observable<any> {
    this.checkCacheHealth();
    let requestString = 'https://api.exchangeratesapi.io/latest?base='+ base+ '&symbols=' + countries;
    console.log("requestString=", requestString);
    let cacheKey = this.getHashOfString(requestString);
    if (this.cache[cacheKey]) {
      console.info("Get the cross rates from cache");
      return of(this.cache[cacheKey]);
    }
    console.info("Get the cross rates from 'exchangeratesapi.io'");
    this.cache[cacheKey] = this.http.get(requestString)
      .pipe(
        shareReplay(1),
        catchError(error => {
          delete this.cache[cacheKey];
          console.error("There is no response from server, add empty value to cache. Reason: [ " + error + "]")
          return EMPTY;
        })
      )
  }

  // Calculate unique value for unique string using bitwise operator (left shift)
  // Source: https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
  private getHashOfString(inputString: string) {
    let hash = 0;
    let chr;
    for (let i = 0; i < inputString.length; i++) {
      chr   = inputString.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    console.log("hash = ", hash);
    return hash;
  }

  private checkCacheHealth() {
    this.truncateCache();
    this.cleanupCache();
  }

  private truncateCache(): void {
    let cacheKeys = Object.keys(this.cache)
    const cacheSize = cacheKeys.length;
    if (cacheSize > this.cacheMaxSize) {
      console.log("Truncate is required, cache size [" + cacheSize + "]")
      // remove third part of cache
      for (let index = 0; index < 900; index++) {
        const key = cacheKeys[index];
        delete this.cache[key];
      }
      console.log("Cache size after truncate:", Object.keys(this.cache).length);
    } else {
      console.log("Truncate is not required, cache size [" + cacheSize + "]");
    }
  }

  private cleanupCache(): void {
    const today = new Date();
    const isToday =  this.lastCacheCleanDate.getDate() == today.getDate() &&
      this.lastCacheCleanDate.getMonth() == today.getMonth() &&
      this.lastCacheCleanDate.getFullYear() == today.getFullYear();
    let cacheKeys = Object.keys(this.cache)
    if (!isToday) {
      console.log("A new day has come, cache cleanup is required")
      for (let index = 0; index < cacheKeys.length; index++) {
        const key = cacheKeys[index];
        delete this.cache[key];
      }
      console.log("Cache size after cleanup [" + Object.keys(this.cache).length + "]")
    } else {
      console.log("Waiting for new day, cache cleanup is not required")
    }
  }

  private handleError() {
    return throwError("there is no response from server api");
  }


}