import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterUrlDataListComponent } from './footer-url-data-list.component';

describe('FooterUrlDataListComponent', () => {
  let component: FooterUrlDataListComponent;
  let fixture: ComponentFixture<FooterUrlDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterUrlDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterUrlDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
