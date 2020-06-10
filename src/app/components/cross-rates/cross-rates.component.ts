import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Rates } from 'src/app/interfaces/rates.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { CalcService } from 'src/app/services/calc.service';

@Component({
  selector: 'app-cross-rates',
  templateUrl: './cross-rates.component.html',
  styleUrls: ['./cross-rates.component.scss'],
})
export class CrossRatesComponent implements OnInit {
  private rates = new Map<string, number>();

  data;
  ratesRefs = new Map<string, Map<string, number>>();
  currencies = new Map<string, boolean>();

  crossCurrencies: string[];

  constructor(private apiService: ApiService, 
              private ngbModal: NgbModal) {}

  ngOnInit() {
    this.crossCurrencies = this.apiService.getCurrencyNames().slice(0, 6);
    this.updateCurrencies();
    this.getRates();
  }

  updateCurrencies() {
    let currencyNames = this.apiService.getCurrencyNames();
    for (let i = 0; i < currencyNames.length; i++) {
      if (this.crossCurrencies.includes(currencyNames[i])) {
        this.currencies.set(currencyNames[i], true);
      } else {
        this.currencies.set(currencyNames[i], false);
      }
    }
  }

  getFlag(currencyName) {
    return this.apiService.getFlagImgSrc(currencyName);
  }

  openModal() {
    const modalRef = this.ngbModal.open(ModalWindowComponent, {backdrop: 'static'});
    modalRef.componentInstance.currencies = this.currencies;
    modalRef.result.then((result) => {
      if (result) {
        this.crossCurrencies = result;
        this.updateCurrencies();
        this.getRates();
      }
    }, (reason) => {});
  }

  getRates() {
    let tempRatesRefs = new Map<string, Map<string, number>>();
    let countriesWithEur = this.crossCurrencies;
    let countriesWoEur = this.crossCurrencies.filter(el => el !== "EUR");
    for (let base of this.crossCurrencies) {
      let setOfRates = new Map<string, number>();
      let symbols = (base === "EUR") ? countriesWoEur : countriesWithEur;
      this.apiService.getCrossRates(symbols.toString(), base).subscribe((result: Rates) => {
        for (let crossCurrency of this.crossCurrencies) {
          setOfRates.set(crossCurrency,
            (base === "EUR" && crossCurrency === "EUR") ? 1 : result.rates[crossCurrency]);
        }
      });
      tempRatesRefs.set(base, setOfRates);
    }
    this.ratesRefs = tempRatesRefs;
  }

}
