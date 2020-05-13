import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchtermlistComponent } from './searchtermlist.component';

describe('SearchtermlistComponent', () => {
  let component: SearchtermlistComponent;
  let fixture: ComponentFixture<SearchtermlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchtermlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchtermlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
