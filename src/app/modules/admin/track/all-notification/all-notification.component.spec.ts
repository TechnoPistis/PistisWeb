import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNotificationComponent } from './all-notification.component';

describe('AllNotificationComponent', () => {
  let component: AllNotificationComponent;
  let fixture: ComponentFixture<AllNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
