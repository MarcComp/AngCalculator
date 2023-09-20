import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcButtonComponent } from './calc-button.component';

describe('CalcButtonComponent', () => {
  let component: CalcButtonComponent;
  let fixture: ComponentFixture<CalcButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalcButtonComponent]
    });
    fixture = TestBed.createComponent(CalcButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
