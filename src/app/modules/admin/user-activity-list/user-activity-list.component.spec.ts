import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivityListComponent } from './user-activity-list.component';

describe('UserActivityListComponent', () => {
  let component: UserActivityListComponent;
  let fixture: ComponentFixture<UserActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
