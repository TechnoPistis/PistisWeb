import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustComponent } from './cust.component';

describe('CustComponent', () => {
  let component: CustComponent;
  let fixture: ComponentFixture<CustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
