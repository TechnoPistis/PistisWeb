import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistervendorComponent } from './registervendor.component';

describe('RegistervendorComponent', () => {
  let component: RegistervendorComponent;
  let fixture: ComponentFixture<RegistervendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistervendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistervendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
