import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLiveComponent } from './user-live.component';

describe('UserLiveComponent', () => {
  let component: UserLiveComponent;
  let fixture: ComponentFixture<UserLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
