import { Component, OnInit } from '@angular/core';
import { CalcService } from '../../services/calc.service'
import { ApiService } from 'src/app/services/api.service';
import { Currencies } from 'src/app/interfaces/currencies.interface';

@Component({
  selector: 'app-form-converter',
  templateUrl: './form-converter.component.html',
  styleUrls: ['./form-converter.component.scss'],
  providers: [ CalcService ]
})
export class FormConverterComponent implements OnInit {

  currencies = null;
  imagesSRC = null;
  periods = ['7 days', '1 month', '1 year', '5 years'];
  currentIndex = 0;

  period;
  
  constructor(private apiServise: ApiService) {}

  ngOnInit(): void {
    this.period = this.periods[this.currentIndex];
    
    this.apiServise.getLatestRates().subscribe((json: Currencies) => {
      let rates = json.rates;
      let map = {};
      for (let currency of Object.keys(rates)) {
        map[currency] = "../../../assets/images/flags/" + currency + ".png";
      }
      this.currencies = map;
    })
  }

  handleClick(index) {
    this.currentIndex = index;   
    this.period = this.periods[this.currentIndex];
  }

}
