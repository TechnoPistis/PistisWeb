import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsearchtermComponent } from './editsearchterm.component';

describe('EditsearchtermComponent', () => {
  let component: EditsearchtermComponent;
  let fixture: ComponentFixture<EditsearchtermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsearchtermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsearchtermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
