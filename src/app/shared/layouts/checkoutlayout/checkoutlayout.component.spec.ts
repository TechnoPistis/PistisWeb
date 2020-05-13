import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutlayoutComponent } from './checkoutlayout.component';

describe('CheckoutlayoutComponent', () => {
  let component: CheckoutlayoutComponent;
  let fixture: ComponentFixture<CheckoutlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
