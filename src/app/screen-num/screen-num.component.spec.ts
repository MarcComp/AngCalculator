import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenNumComponent } from './screen-num.component';

describe('ScreenNumComponent', () => {
  let component: ScreenNumComponent;
  let fixture: ComponentFixture<ScreenNumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenNumComponent]
    });
    fixture = TestBed.createComponent(ScreenNumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
