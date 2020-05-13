import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCustomerGroupsComponent } from './manage-customer-groups.component';

describe('ManageCustomerGroupsComponent', () => {
  let component: ManageCustomerGroupsComponent;
  let fixture: ComponentFixture<ManageCustomerGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCustomerGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCustomerGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
