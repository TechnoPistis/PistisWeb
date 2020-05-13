import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMainMenuComponent } from './edit-main-menu.component';

describe('EditMainMenuComponent', () => {
  let component: EditMainMenuComponent;
  let fixture: ComponentFixture<EditMainMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMainMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
