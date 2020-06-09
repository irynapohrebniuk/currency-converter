import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-currencies-selector',
  templateUrl: './currencies-selector.component.html',
  styleUrls: ['./currencies-selector.component.scss']
})
export class CurrenciesSelectorComponent implements OnInit {
  @Input() currencies;
  @Input() currencyBaseSrc: string;
  @Input() currencyBase: string;

  constructor() { }

  ngOnInit(): void {
  }

}
