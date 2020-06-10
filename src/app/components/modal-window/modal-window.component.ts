import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { element } from 'protractor';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {
  @Input() currencies;
  @Output() emitter: EventEmitter<any> = new EventEmitter();

  selectedCurrencies = [];

  constructor(public activeModal: NgbActiveModal, private apiService: ApiService) { }

  ngOnInit(): void {
    this.fillSelectedCurrencies();
  }
  
  passBack() {
    this.emitter.emit(this.selectedCurrencies);
    this.activeModal.close(this.selectedCurrencies);
  }

  getImage(name) {
    return this.apiService.getFlagImgSrc(name);
  }

  checkCurrency(event) {
    let currency = event.target.id;
    if (event.target.checked) {
      this.selectedCurrencies.push(currency);
    } else {
      this.selectedCurrencies = this.selectedCurrencies.filter(
        item => item !== currency
      );
    }
  }

  private fillSelectedCurrencies(): void {
    for (const key of this.currencies.keys()) {
      
      if (this.currencies.get(key) == true) {
        this.selectedCurrencies.push(key);
      }
    }
  }

}
