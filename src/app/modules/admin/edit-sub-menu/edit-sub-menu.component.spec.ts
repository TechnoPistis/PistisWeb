import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubMenuComponent } from './edit-sub-menu.component';

describe('EditSubMenuComponent', () => {
  let component: EditSubMenuComponent;
  let fixture: ComponentFixture<EditSubMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
