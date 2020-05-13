import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDealsComponent } from './all-deals.component';

describe('AllDealsComponent', () => {
  let component: AllDealsComponent;
  let fixture: ComponentFixture<AllDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
