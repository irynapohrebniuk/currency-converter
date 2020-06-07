import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { DynamicRate } from 'src/app/interfaces/dynamic-rate.interface';

@Component({
  selector: 'app-latest-rates',
  templateUrl: './latest-rates.component.html',
  styleUrls: ['./latest-rates.component.scss']
})
export class LatestRatesComponent implements OnInit {

  latestRates;
  firstFiveRates;
  clicked = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // TODO: Pass "base" from template
    this.apiService.getAllLatestRates("USD").subscribe((result: DynamicRate) => {
      this.formatRates(result.rates);
      this.latestRates = result;
      console.log(this.latestRates);
      this.slicedData();
    });

  }

  private formatRates(rates): void {
    Object.keys(rates).map(function(key, index) {
      //TODO: It's too complex
      rates[key] = Number(Number.parseFloat(rates[key]).toFixed(2));
    });
  }

  // TODO: finish 
  private slicedData() {
    this.firstFiveRates = new Map<string,number>();
    let keys = Object.keys(this.latestRates.rates);
    let number;
    if (this.clicked) { 
      number = keys.length 
    } else {
      number = 5;
    }
    console.log("number", number);
    this.firstFiveRates = new Map<string,number>();
    for (let i = 0; i < keys.length; i++) {
      if (i > number) {
        break;
      }
      this.firstFiveRates.set(keys[i], this.latestRates.rates[keys[i]]);
      
    }
    console.log("firstFiveRates: ", this.firstFiveRates);
  }

  setFlag(){
    this.clicked = !this.clicked; 
    this.slicedData();
  }

}
