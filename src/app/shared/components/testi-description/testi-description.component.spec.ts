import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestiDescriptionComponent } from './testi-description.component';

describe('TestiDescriptionComponent', () => {
  let component: TestiDescriptionComponent;
  let fixture: ComponentFixture<TestiDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestiDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestiDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
