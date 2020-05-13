import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterUrlDataComponent } from './footer-url-data.component';

describe('FooterUrlDataComponent', () => {
  let component: FooterUrlDataComponent;
  let fixture: ComponentFixture<FooterUrlDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterUrlDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterUrlDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
