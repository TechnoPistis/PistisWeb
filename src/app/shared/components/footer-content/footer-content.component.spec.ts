import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterContentComponent } from './footer-content.component';

describe('FooterContentComponent', () => {
  let component: FooterContentComponent;
  let fixture: ComponentFixture<FooterContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
