import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDhashboardComponent } from './track-dhashboard.component';

describe('TrackDhashboardComponent', () => {
  let component: TrackDhashboardComponent;
  let fixture: ComponentFixture<TrackDhashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackDhashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackDhashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
