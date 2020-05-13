import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackWishComponent } from './track-wish.component';

describe('TrackWishComponent', () => {
  let component: TrackWishComponent;
  let fixture: ComponentFixture<TrackWishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackWishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackWishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
