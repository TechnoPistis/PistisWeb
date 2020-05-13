import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUsersActivitesComponent } from './all-users-activites.component';

describe('AllUsersActivitesComponent', () => {
  let component: AllUsersActivitesComponent;
  let fixture: ComponentFixture<AllUsersActivitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllUsersActivitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUsersActivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
