import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostViewedComponent } from './most-viewed.component';

describe('MostViewedComponent', () => {
  let component: MostViewedComponent;
  let fixture: ComponentFixture<MostViewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostViewedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostViewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
