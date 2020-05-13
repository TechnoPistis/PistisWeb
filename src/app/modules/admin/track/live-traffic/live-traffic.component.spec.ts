import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTrafficComponent } from './live-traffic.component';

describe('LiveTrafficComponent', () => {
  let component: LiveTrafficComponent;
  let fixture: ComponentFixture<LiveTrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveTrafficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
