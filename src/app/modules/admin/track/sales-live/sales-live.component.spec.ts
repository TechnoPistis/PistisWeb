import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLiveComponent } from './sales-live.component';

describe('SalesLiveComponent', () => {
  let component: SalesLiveComponent;
  let fixture: ComponentFixture<SalesLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
