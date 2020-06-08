import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularRatesComponent } from './popular-rates.component';

describe('LatestRatesComponent', () => {
  let component: PopularRatesComponent;
  let fixture: ComponentFixture<PopularRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
