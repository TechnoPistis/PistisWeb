import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCatComponent } from './track-cat.component';

describe('TrackCatComponent', () => {
  let component: TrackCatComponent;
  let fixture: ComponentFixture<TrackCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
