import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCompareComponent } from './track-compare.component';

describe('TrackCompareComponent', () => {
  let component: TrackCompareComponent;
  let fixture: ComponentFixture<TrackCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
