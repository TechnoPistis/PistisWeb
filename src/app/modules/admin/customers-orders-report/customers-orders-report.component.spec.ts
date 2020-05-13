import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersOrdersReportComponent } from './customers-orders-report.component';

describe('CustomersOrdersReportComponent', () => {
  let component: CustomersOrdersReportComponent;
  let fixture: ComponentFixture<CustomersOrdersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersOrdersReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersOrdersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
