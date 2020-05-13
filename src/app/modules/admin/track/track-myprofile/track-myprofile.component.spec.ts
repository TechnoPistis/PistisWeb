import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackMyprofileComponent } from './track-myprofile.component';

describe('TrackMyprofileComponent', () => {
  let component: TrackMyprofileComponent;
  let fixture: ComponentFixture<TrackMyprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackMyprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackMyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
