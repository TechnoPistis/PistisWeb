import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnListComponent } from './return-list.component';

describe('ReturnListComponent', () => {
  let component: ReturnListComponent;
  let fixture: ComponentFixture<ReturnListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
