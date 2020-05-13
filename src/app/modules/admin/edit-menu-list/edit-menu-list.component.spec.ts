import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMenuListComponent } from './edit-menu-list.component';

describe('EditMenuListComponent', () => {
  let component: EditMenuListComponent;
  let fixture: ComponentFixture<EditMenuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMenuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
