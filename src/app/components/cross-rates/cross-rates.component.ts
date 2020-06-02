import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { RatesRef } from '../../interfaces/rate.interface'

@Component({
  selector: 'app-cross-rates',
  templateUrl: './cross-rates.component.html',
  styleUrls: ['./cross-rates.component.scss'],
  providers: [ApiService]
})
export class CrossRatesComponent implements OnInit {
  apiService: ApiService;
  public data;
  ratesRefs = {};
  
  bases = ["USD","GBP","PLN","CZK","RON"];
  header = ["#",...this.bases];


  countries = this.bases;
  countries_str = this.bases.toString();

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }


  ngOnInit() {


    for (let base of this.bases) {
        this.apiService.getCrossRates(this.countries_str, base).subscribe((result: RatesRef) => {
            let data = {"rates": result.rates}
            this.ratesRefs[base] = data;
        }); 
        
        //  console.log(Object.keys(this.ratesRefs[0].rates));
    }
    
  }

}
