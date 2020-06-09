import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesSelectorComponent } from './currencies-selector.component';

describe('CurrenciesSelectorComponent', () => {
  let component: CurrenciesSelectorComponent;
  let fixture: ComponentFixture<CurrenciesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrenciesSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenciesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
