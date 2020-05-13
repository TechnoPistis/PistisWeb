import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendoreditComponent } from './vendoredit.component';

describe('VendoreditComponent', () => {
  let component: VendoreditComponent;
  let fixture: ComponentFixture<VendoreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendoreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
