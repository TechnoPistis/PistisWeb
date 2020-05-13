import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackFooterComponent } from './track-footer.component';

describe('TrackFooterComponent', () => {
  let component: TrackFooterComponent;
  let fixture: ComponentFixture<TrackFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
