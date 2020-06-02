import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeRateDynamicsComponent } from './rate-dynamics.component';

describe('ExchangeRateDynamicsComponent', () => {
  let component: ExchangeRateDynamicsComponent;
  let fixture: ComponentFixture<ExchangeRateDynamicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeRateDynamicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeRateDynamicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
