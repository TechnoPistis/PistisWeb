import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterHeaderListComponent } from './footer-header-list.component';

describe('FooterHeaderListComponent', () => {
  let component: FooterHeaderListComponent;
  let fixture: ComponentFixture<FooterHeaderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterHeaderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterHeaderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
