import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewReportComponent } from './product-view-report.component';

describe('ProductViewReportComponent', () => {
  let component: ProductViewReportComponent;
  let fixture: ComponentFixture<ProductViewReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductViewReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
