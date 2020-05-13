import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpinOptionsComponent } from './add-spin-options.component';

describe('AddSpinOptionsComponent', () => {
  let component: AddSpinOptionsComponent;
  let fixture: ComponentFixture<AddSpinOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpinOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpinOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
