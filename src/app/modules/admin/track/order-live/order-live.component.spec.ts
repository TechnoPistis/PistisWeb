import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLiveComponent } from './order-live.component';

describe('OrderLiveComponent', () => {
  let component: OrderLiveComponent;
  let fixture: ComponentFixture<OrderLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
