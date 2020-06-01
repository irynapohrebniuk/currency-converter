import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossRatesComponent } from './cross-rates.component';

describe('CrossRatesComponent', () => {
  let component: CrossRatesComponent;
  let fixture: ComponentFixture<CrossRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
