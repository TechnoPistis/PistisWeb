import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackProductDetailComponent } from './track-product-detail.component';

describe('TrackProductDetailComponent', () => {
  let component: TrackProductDetailComponent;
  let fixture: ComponentFixture<TrackProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
