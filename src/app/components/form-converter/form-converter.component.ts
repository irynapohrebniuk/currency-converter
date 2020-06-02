import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-converter',
  templateUrl: './form-converter.component.html',
  styleUrls: ['./form-converter.component.scss']
})
export class FormConverterComponent implements OnInit {
  
  periods = ['7 days', '1 month', '1 year', '5 years'];
  currentIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  handleClick(index) {
    this.currentIndex = index;
    console.log(this.periods[this.currentIndex]);
  }

}
