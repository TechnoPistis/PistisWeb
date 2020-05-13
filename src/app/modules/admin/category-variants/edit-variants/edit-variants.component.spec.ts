import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVariantsComponent } from './edit-variants.component';

describe('EditVariantsComponent', () => {
  let component: EditVariantsComponent;
  let fixture: ComponentFixture<EditVariantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVariantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
