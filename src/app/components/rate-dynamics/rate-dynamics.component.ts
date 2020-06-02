import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DynamicsRate } from '../../interfaces/dynamics-rate.interface'


@Component({
  selector: 'app-rate-dynamics',
  templateUrl: './rate-dynamics.component.html',
  styleUrls: ['./rate-dynamics.component.scss']
})
export class RateDynamicsComponent implements OnInit {
  apiService: ApiService;
  data = null;

  base = 'USD';
  currency = 'PLN';
  from = '2018-01-01';
  to = '2018-09-01';

  page = 1;
  pageSize = 4;
  collectionSize;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  ngOnInit(): void {
    this.getRatesFromPeriod();
  }

  getRatesFromPeriod() {
    this.apiService.getRatesFromPeriod(this.base, this.currency, this.from, this.to)
      .subscribe((result: DynamicsRate) => {
        console.log("result json", result);

        console.log("rates lenght =", Object.keys(result.rates).length);
        let oneEntry = Object.entries(result.rates)[0];
        console.log("value of rates[0] =", oneEntry);
        console.log("this.base =", this.base);
        console.log(oneEntry[1][this.currency]);
        // this.data = this.data.rates;
        // console.log("data dynamics", this.data);
        // this.collectionSize = this.data.size;
        // console.log("data dynamics size", this.data.size);

        // let map = new Map(); 
        // for (let [key, value] of Object.entries(result.rates)) {
        //     for (let [key1, rateValue] of Object.entries(value)) {
        //         map[key] = rateValue;
        //     }            
        // }
        // this.data = map;
        // console.log("data =", this.data);
      })
  }

}
