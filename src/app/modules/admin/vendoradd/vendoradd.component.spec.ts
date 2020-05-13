import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendoraddComponent } from './vendoradd.component';

describe('VendoraddComponent', () => {
  let component: VendoraddComponent;
  let fixture: ComponentFixture<VendoraddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendoraddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendoraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
