import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMobileComponent } from './dashboard-mobile.component';

describe('DashboardMobileComponent', () => {
  let component: DashboardMobileComponent;
  let fixture: ComponentFixture<DashboardMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
