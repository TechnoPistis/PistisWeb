import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchtermComponent } from './searchterm.component';

describe('SearchtermComponent', () => {
  let component: SearchtermComponent;
  let fixture: ComponentFixture<SearchtermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchtermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchtermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
