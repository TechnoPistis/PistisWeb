import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealCatelogueComponent } from './deal-catelogue.component';

describe('DealCatelogueComponent', () => {
  let component: DealCatelogueComponent;
  let fixture: ComponentFixture<DealCatelogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealCatelogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealCatelogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
