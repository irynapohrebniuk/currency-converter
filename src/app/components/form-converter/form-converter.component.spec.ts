import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConverterComponent } from './form-converter.component';

describe('FormConverterComponent', () => {
  let component: FormConverterComponent;
  let fixture: ComponentFixture<FormConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormConverterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
