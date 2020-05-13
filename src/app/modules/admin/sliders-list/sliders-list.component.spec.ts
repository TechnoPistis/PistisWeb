import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidersListComponent } from './sliders-list.component';

describe('SlidersListComponent', () => {
  let component: SlidersListComponent;
  let fixture: ComponentFixture<SlidersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
