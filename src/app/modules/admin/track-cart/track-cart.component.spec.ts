import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCartComponent } from './track-cart.component';

describe('TrackCartComponent', () => {
  let component: TrackCartComponent;
  let fixture: ComponentFixture<TrackCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
