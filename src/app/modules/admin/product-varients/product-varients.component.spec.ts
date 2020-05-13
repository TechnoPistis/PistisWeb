import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVarientsComponent } from './product-varients.component';

describe('ProductVarientsComponent', () => {
  let component: ProductVarientsComponent;
  let fixture: ComponentFixture<ProductVarientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductVarientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVarientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
