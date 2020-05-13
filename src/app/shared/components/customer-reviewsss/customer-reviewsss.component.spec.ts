import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReviewsssComponent } from './customer-reviewsss.component';

describe('CustomerReviewsssComponent', () => {
  let component: CustomerReviewsssComponent;
  let fixture: ComponentFixture<CustomerReviewsssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerReviewsssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReviewsssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
