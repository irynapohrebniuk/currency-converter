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


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // TODO: Pass "base" from template
    this.apiService.getAllLatestRates("USD").subscribe((result: DynamicRate) => {
      this.formatRates(result.rates);
      this.latestRates = result;
      
    });
  }

  private formatRates(rates): void {
    Object.keys(rates).map(function(key, index) {
      //TODO: It's too complex
      rates[key] = Number(Number.parseFloat(rates[key]).toFixed(2));
    });
  }

}
