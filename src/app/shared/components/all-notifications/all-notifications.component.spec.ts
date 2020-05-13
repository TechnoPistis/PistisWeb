import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNotificationsComponent } from './all-notifications.component';

describe('AllNotificationsComponent', () => {
  let component: AllNotificationsComponent;
  let fixture: ComponentFixture<AllNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
