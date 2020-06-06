import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-latest-rates',
  templateUrl: './latest-rates.component.html',
  styleUrls: ['./latest-rates.component.scss']
})
export class LatestRatesComponent implements OnInit {
  apiService: ApiService;
  data = null;


  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  ngOnInit(): void {

  }

  // getLatestRates() {
  //   this.apiService.getLatestRates().subscribe(json => this.data = json)
  // }

}
