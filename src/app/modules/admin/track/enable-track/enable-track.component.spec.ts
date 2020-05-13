import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableTrackComponent } from './enable-track.component';

describe('EnableTrackComponent', () => {
  let component: EnableTrackComponent;
  let fixture: ComponentFixture<EnableTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnableTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
