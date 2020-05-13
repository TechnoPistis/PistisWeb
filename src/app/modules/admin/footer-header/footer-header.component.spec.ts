import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterHeaderComponent } from './footer-header.component';

describe('FooterHeaderComponent', () => {
  let component: FooterHeaderComponent;
  let fixture: ComponentFixture<FooterHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
