import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CalcService } from 'src/app/services/calc.service';

@Component({
  selector: 'app-cross-table',
  templateUrl: './cross-table.component.html',
  styleUrls: ['./cross-table.component.scss']
})
export class CrossTableComponent implements OnInit, OnChanges {
  @Input() ratesRefs: Map<string, Map<string, number>>;

  header;

  constructor(private calc: CalcService) { }

  getHeader() {
    this.header = [...this.ratesRefs.keys()];
  }

  ngOnInit(): void {
    this.getHeader();
  }

  initialOrder() {
    return 0;
  }

  ngOnChanges() {
    this.getHeader();
  }

  toMoneyFormat(num) {
    return this.calc.toMoneyFormat(num);
  }

}
