import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDataComponent } from './footer-data.component';

describe('FooterDataComponent', () => {
  let component: FooterDataComponent;
  let fixture: ComponentFixture<FooterDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
